/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {SafeAreaView, Alert, View, ScrollView} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import {DataTable, Button, Portal, Modal, Text} from 'react-native-paper';
import promptUser from '../Utils/AsyncAlert';

// Connction to access the pre-populated user_db.db
const db = openDatabase({name: 'app_database.db', createFromLocation: 1});

const numberOfItemsPerPageList = [5, 8, 10]; // Items per page for the pagination

// Remarks Modal, to be seperated into a separate component
const RemarksModal = ({item, visible, hideModal, deleteItem}) => {
  // eslint-disable-next-line prettier/prettier
  const containerStyle = {backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 10};
  const textStyle = {marginBottom: 50, marginTop: 20};

  if (item.remarks === '' || item.remarks === null) {
    item.remarks = 'All Okay :)';
  }

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}>
        <Text style={textStyle}>Remarks: {item.remarks}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <Button
            style={{marginRight: 10}}
            mode="contained"
            onPress={() => deleteItem(item.date)}>
            Delete
          </Button>
          <Button
            mode="contained"
            onPress={() => {
              hideModal();
            }}>
            Okay
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

// Actual View Start from Here
const DataTableView = ({navigation}) => {
  const mounted = useRef(true);
  //Component State Variables
  const [flatListItems, setFlatListItems] = useState([]);

  //Variables for Pagination Start
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[1],
  );
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, flatListItems.length);
  let list = [];
  //State Variables for Pagination End

  // Modal Variables Start
  const [visible, setVisible] = useState(false);
  const modalData = useRef({remarks: 'Placeholder'});

  const showModal = currentItem => {
    modalData.current = currentItem;
    setVisible(true);
  };
  const hideModal = () => setVisible(false);
  // Modal Variables End

  useEffect(() => {
    navigation.addListener('focus', () => {
      retrieveData();
    });
  });

  useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);

  // Cleanup Fuction
  useEffect(() => {
    return function cleanup() {
      mounted.current = false;
    };
  }, []);

  //Database Functions Start------------------------------------------------------------//
  const retrieveData = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM data_input_table', [], (_tx, results) => {
        var temp = [];
        console.log(results.rows.length);
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        if (mounted.current) {
          setFlatListItems(temp);
        }
      });
    });
  };

  const clearTable = () => {
    promptUser('CAUTION', 'Are You Sure, you want to delete all data?').then(
      res => {
        if (res === 'Yes') {
          db.transaction(tx => {
            tx.executeSql(
              'DELETE FROM data_input_table',
              [],
              (_tx, results) => {
                if (results.rows.length === 0) {
                  Alert.alert('Data Deleted Successfully....');
                  retrieveData();
                }
              },
            );
          });
        } else {
          return;
        }
      },
    );
  };

  const deleteItem = date => {
    promptUser('CAUTION', 'Are You Sure?').then(res => {
      if (res === 'Yes') {
        db.transaction(tx => {
          tx.executeSql(
            'DELETE FROM data_input_table where date=?',
            [date],
            (_tx, results) => {
              if (results.rows.length === 0) {
                Alert.alert('Data Deleted Successfully....');
                hideModal();
                retrieveData();
              }
            },
          );
        });
      } else {
        return;
      }
    });
  };

  const refreshTable = () => {
    retrieveData();
  };
  //Database Functions End------------------------------------------------------------//

  for (var i = from; i < to; i++) {
    list.push(flatListItems[i]);
  }

  return (
    <SafeAreaView>
      <DataTable style={{elevation: 2, width: '95%', alignSelf: 'center'}}>
        <DataTable.Header>
          <DataTable.Title style={{flex: 3}}>KKS</DataTable.Title>
          <DataTable.Title style={{flex: 5}}>DATE</DataTable.Title>
          <DataTable.Title style={{flex: 2}} numeric>
            VALUE
          </DataTable.Title>
        </DataTable.Header>
        <ScrollView>
          {list.map(item => {
            return (
              <DataTable.Row
                key={item.date} // you need a unique key per item
                onPress={() => showModal(item)}>
                <DataTable.Cell style={{flex: 3}}>{item.kks}</DataTable.Cell>
                <DataTable.Cell style={{flex: 5}}>{item.date}</DataTable.Cell>
                <DataTable.Cell style={{flex: 2}} numeric>
                  {item.value}
                </DataTable.Cell>
              </DataTable.Row>
            );
          })}
          <RemarksModal
            hideModal={hideModal}
            visible={visible}
            item={modalData.current}
            deleteItem={deleteItem}
          />
          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(
              flatListItems.length / numberOfItemsPerPage,
            )}
            // eslint-disable-next-line no-shadow
            onPageChange={page => setPage(page)}
            label={`${from + 1}-${to} of ${flatListItems.length}`}
            showFastPaginationControls
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={numberOfItemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            selectPageDropdownLabel={'Rows per page'}
          />
          <Button onPress={() => clearTable()}>Clear Data</Button>
          <Button onPress={() => refreshTable()}>Refresh</Button>
        </ScrollView>
      </DataTable>
    </SafeAreaView>
  );
};

export default DataTableView;
