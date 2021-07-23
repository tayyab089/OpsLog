/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {SafeAreaView, Alert, View, ScrollView} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import {DataTable, Button, Portal, Modal, Text} from 'react-native-paper';
import promptUser from '../Utils/AsyncAlert';
import FilterModal from '../Utils/FilterModal';
import LoadingModal from '../Utils/LoadingModal';

// Connction to access the pre-populated user_db.db
const db = openDatabase({name: 'app_database.db', createFromLocation: 1});

const numberOfItemsPerPageList = [5, 8, 10]; // Items per page for the pagination

// Remarks Modal, to be seperated into a separate component
const RemarksModal = ({item, visible, hideModal, deleteItem}) => {
  // eslint-disable-next-line prettier/prettier
  const containerStyle = {backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 10};
  const textStyle = {marginBottom: 0, marginTop: 0};

  if (item.remarks === '' || item.remarks === null) {
    item.remarks = 'All Okay :)';
  }

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}>
        <Text style={textStyle}><Text style={{fontWeight: 'bold'}}>KKS:            </Text>{item.kks}</Text>
        <Text style={textStyle}><Text style={{fontWeight: 'bold'}}>DATE:          </Text>{item.date.slice(0,-5)}</Text>
        <Text style={textStyle}><Text style={{fontWeight: 'bold'}}>VALUE:       </Text> {item.value}</Text>
        <Text style={textStyle}><Text style={{fontWeight: 'bold'}}>REMARKS: </Text> {item.remarks}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginTop: 50}}>
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

// Actual View Start from Here========================================================================
const DataTableView = ({navigation}) => {
  const mounted = useRef(true);
  //Component State Variables
  const referenceItems = useRef([]);
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

  // Loading Modal Variable Start
  const [loadingVisible, setLoadingVisible] = useState(false);
  const showLoadingModal = () => setLoadingVisible(true);
  const hideLoadingModal = () => setLoadingVisible(false);
  // Loading Modal Variable End

  // Filter Moal Variables Start
  const [startDate, setStartDate] = useState(
    new Date(
      new Date().getFullYear(),
      new Date().getMonth() - 1,
      new Date().getDate(),
    ),
  );
  const [endDate, setEndDate] = useState(new Date());
  const [dropdownValue, setDropdownValue] = useState(null);

  const [filterVisible, setFilterVisible] = useState(false);
  const showFilterModal = () => setFilterVisible(true);
  const hideFilterModal = () => {
    setFilterVisible(false);
    filterData();
  };
  const [dropdownItems, setDropdownItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
  ]);
  // Filter Moal Variables End

  // Remarks Modal Variables Start
  const [visible, setVisible] = useState(true);
  const modalData = useRef({remarks: 'Placeholder', date: 'Placeholder', value: 'Placeholder', kks: 'Placeholder'});
  const showModal = currentItem => {
    modalData.current = currentItem;
    setVisible(true);
  };
  const hideModal = () => setVisible(false);
  // Remarks Modal Variables End

  useEffect(() => {
    navigation.addListener('focus', () => {
      retrieveData();
    });
  }, []);

  useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);

  // Cleanup Fuction
  useEffect(() => {
    return function cleanup() {
      mounted.current = false;
    };
  }, []);

  // Remove duplicates from dropdown list items
  const removeDuplicates = duplicates => {
    const flag = {};
    const unique = [];
    duplicates.forEach(elem => {
      if (!flag[elem.value]) {
        flag[elem.value] = true;
        unique.push(elem);
      }
    });
    return unique;
  };

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
          referenceItems.current = temp;
          setDropdownItems(
            removeDuplicates(
              temp.map(item => {
                return {label: item.kks, value: item.kks};
              }),
            ),
          );
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
    console.log(dropdownItems);
  };
  //Database Functions End------------------------------------------------------------//

  // POST DATA TO SERVER FUNCTION START
  const postData = () => {
    showLoadingModal();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(flatListItems),
    };
    fetch('https://dataloggingapp.herokuapp.com/post_data', options)
      .then(resp => resp.json())
      .then(response => {
        Alert.alert(response);
        console.log(response);
        hideLoadingModal();
      })
      .catch(err => {
        console.log(err);
        hideLoadingModal();
      });
  };
  // POST DATA TO SERVER FUNCTION END

  // Date Filteration Functions Start
  const filterData = () => {
    try {
      console.log('I ran');
      if (dropdownValue.length !== 0) {
        console.log(dropdownValue.length);
        setFlatListItems(
          referenceItems.current.filter(
            item =>
              new Date(item.date) >= startDate &&
              new Date(item.date) <= endDate &&
              dropdownValue.includes(item.kks),
          ),
        );
      } else {
        console.log('not filtered by kks');
        setFlatListItems(
          referenceItems.current.filter(
            item =>
              new Date(item.date) >= startDate &&
              new Date(item.date) <= endDate,
          ),
        );
      }
    } catch {
      console.log('I catch ran');
      setFlatListItems(
        referenceItems.current.filter(
          item =>
            new Date(item.date) >= startDate && new Date(item.date) <= endDate,
        ),
      );
    }
  };

  for (var i = from; i < to; i++) {
    list.push(flatListItems[i]);
  }

  return (
    <SafeAreaView>
      <DataTable style={{elevation: 2, width: '95%', alignSelf: 'center'}}>
        <DataTable.Header>
          <DataTable.Title style={{flex: 4}}>KKS</DataTable.Title>
          <DataTable.Title style={{flex: 4}}>DATE</DataTable.Title>
          <DataTable.Title style={{flex: 2}}>IN-ACTIVE</DataTable.Title>
          <DataTable.Title style={{flex: 1.5}} numeric>
            VALUE
          </DataTable.Title>
        </DataTable.Header>
        <ScrollView>
          {list.map(item => {
            return (
              <DataTable.Row
                key={item.date} // you need a unique key per item
                onPress={() => showModal(item)}>
                <DataTable.Cell style={{flex: 4}}>{item.kks}</DataTable.Cell>
                <DataTable.Cell style={{flex: 4}}>{item.date}</DataTable.Cell>
                <DataTable.Cell style={{flex: 2}}>
                  {item.inactive}
                </DataTable.Cell>
                <DataTable.Cell style={{flex: 1.5}} numeric>
                  {item.value}
                </DataTable.Cell>
              </DataTable.Row>
            );
          })}
          <FilterModal
            hideFilterModal={hideFilterModal}
            filterVisible={filterVisible}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            dropdownValue={dropdownValue}
            setDropdownValue={setDropdownValue}
            dropdownItems={dropdownItems}
            setDropdownItems={setDropdownItems}
          />
          <RemarksModal
            hideModal={hideModal}
            visible={visible}
            item={modalData.current}
            deleteItem={deleteItem}
          />
          <LoadingModal visible={loadingVisible} hideModal={hideLoadingModal} />
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
          <Button onPress={() => showFilterModal()}>Filter Data</Button>
          <Button onPress={() => clearTable()}>Clear Data</Button>
          <Button onPress={() => postData()}>Send Data</Button>
          <Button onPress={() => refreshTable()}>Refresh</Button>
        </ScrollView>
      </DataTable>
    </SafeAreaView>
  );
};

export default DataTableView;
