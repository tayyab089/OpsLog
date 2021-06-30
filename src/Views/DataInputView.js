/* eslint-disable no-labels */
import React, {useRef, useState, useEffect, Fragment} from 'react';
import {SafeAreaView, StyleSheet, View, Text, Alert} from 'react-native';
import {Button, ActivityIndicator, Colors} from 'react-native-paper';
import DataInputComponent from '../Components/DataInputComponent';
// import areaList from '../Data/FilteredData.json';
import mainMenu from '../Data/HomepageData';
// import {SaveToDatabase} from '../Database/databaseFunctions';
import SQLite from 'react-native-sqlite-storage';
import TrendModal from '../Utils/TrendModal';

const db = SQLite.openDatabase({
  name: 'app_database.db',
  createFromLocation: 1,
});

const DataInputView = ({route, navigation}) => {
  const mounted = useRef(true);
  const [dataInputData, setDataInputData] = useState({
    description: '',
    kks: '',
    serialNumber: '',
    min: 0,
    max: 1000,
  });
  const [text, setText] = useState('');
  const [remarks, setRemarks] = useState('');
  const kksMatch = useRef(true);
  const kksMatchCounter = useRef(0);
  const [areaList, setAreaList] = useState();
  const isDataReady = useRef(true);
  const filteredData = useRef([]);
  const startingdescription = useRef('');
  const counter = useRef(1);
  const dataArrayLegth = useRef(0);
  const area = useRef('');
  const descriptionIndex = useRef(0);

  // Modal Variables Start=========================================================Start
  const [visible, setVisible] = useState(false);
  const [dataItemsM, setDataItemsM] = useState('');
  const ready = useRef(true);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  // Modal Variables End============================================================End

  useEffect(() => {
    navigation.addListener('focus', () => {
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM reference_table', [], (_tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          setAreaList(temp);
        });
      });
      // Modal Data Retrieval Start================================================Start
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM data_input_table', [], (_tx, results) => {
          var temp = [];
          console.log(results.rows.length);
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          setDataItemsM(temp);
        });
      });
      // Modal Data Retrieval End====================================================End
    });
  });

  useEffect(() => {
    // Cleanup Fuction
    return function cleanup() {
      mounted.current = false;
    };
  }, []);

  breakme: if (isDataReady.current) {
    try {
      area.current = areaList.find(x => x.kks === route.params.kks).area;
    } catch (err) {
      kksMatchCounter.current++;
      kksMatch.current = false;
      break breakme;
    }
    kksMatch.current = true;
    isDataReady.current = false;
    filteredData.current = areaList.filter(item => item.area === area.current);
    startingdescription.current = filteredData.current.find(
      x => x.kks === route.params.kks,
    ).description;
    dataArrayLegth.current = filteredData.current.length;
    descriptionIndex.current = filteredData.current.findIndex(
      x => x.kks === route.params.kks,
    );
    console.log(mounted.current);
    if (mounted.current) {
      setDataInputData({
        description: startingdescription.current,
        kks: route.params.kks,
        min: 0,
        max: 200,
      });
    }
  } else {
    console.log('not empty');
  }

  const hasErrors = () => {
    return text < dataInputData.min || text > dataInputData.max;
  };

  const dataStorage = () => {
    let currentdate = new Date();
    // Saving to Database
    if (text === '') {
      Alert.alert('Please Enter Value');
      return;
    } else if (
      (text < dataInputData.min || text > dataInputData.max) &&
      remarks === ''
    ) {
      Alert.alert(
        'Value is out of range, Please enter reason in Remarks to proceed',
      );
      return;
    }
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO data_input_table (kks, date, value, remarks) VALUES (?,?,?,?)',
        [dataInputData.kks, currentdate.toString(), text, remarks],
        (_tx, results) => {
          console.log('I Ran');
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert('Data Inserted Successfully....');
          } else {
            Alert.alert('Failed....');
          }
        },
      );
    });
    // Saving Finished
    ready.current = true; // Modal Data update===================================Start/End
    if (mounted.current) {
      setText('');
      setRemarks('');
    }
    counter.current++;
    descriptionIndex.current++;

    if (
      counter.current === dataArrayLegth.current + 1 ||
      dataArrayLegth.current === 1
    ) {
      let index = 0;
      switch (area.current) {
        case 'BTG':
          index = 0;
          break;
        default:
          index = 2;
      }
      navigation.navigate('SectionListView', {
        section: mainMenu[index].nav,
        title: mainMenu[index].title,
      });
      return;
    } else if (descriptionIndex.current === dataArrayLegth.current) {
      descriptionIndex.current = 0;
    }

    const description =
      filteredData.current[descriptionIndex.current].description;
    const kks = filteredData.current[descriptionIndex.current].kks;
    if (mounted.current) {
      setDataInputData({
        description: description,
        kks: kks,
        min: 0,
        max: 200,
      });
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {kksMatch.current && (
          <Fragment>
            <DataInputComponent
              description={dataInputData.description}
              kks={dataInputData.kks}
              min={dataInputData.min}
              max={dataInputData.max}
              text={text}
              setText={setText}
              remarks={remarks}
              setRemarks={setRemarks}
              hasErrors={hasErrors}
            />
            <TrendModal
              hideModal={hideModal}
              visible={visible}
              kks={dataInputData.kks}
              dataItemsM={dataItemsM}
              ready={ready}
              mounted={mounted}
            />
            <Button
              style={styles.trendButton}
              onPress={() => showModal(dataInputData.kks)}
              mode="contained">
              History
            </Button>
            <Button
              style={styles.nextButton}
              onPress={dataStorage}
              mode="contained">
              Next
            </Button>
          </Fragment>
        )}
        {!kksMatch.current && kksMatchCounter.current === 1 && (
          <View style={styles.text}>
            <ActivityIndicator animating={true} color={Colors.green800} />
          </View>
        )}
        {!kksMatch.current && kksMatchCounter.current === 2 && (
          <View style={styles.text}>
            <Text>KKS does not exist Scan QR Code again</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  nextButton: {
    position: 'absolute',
    right: 10,
    bottom: 15,
  },
  trendButton: {
    position: 'absolute',
    left: 10,
    bottom: 15,
  },
  text: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default DataInputView;
