/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {SafeAreaView, Alert, ScrollView} from 'react-native';
import {DataTable, Button} from 'react-native-paper';
import RemarksModal from '../Utils/RemarksModal';
import promptUser from '../Utils/AsyncAlert';
import LoadingModal from '../Utils/LoadingModal';

const numberOfItemsPerPageList = [5, 8, 10]; // Items per page for the pagination

const UserListView = ({navigation}) => {
  const mounted = useRef(true);
  //Component State Variables
  const [userList, setUserList] = useState([]);

  //Variables for Pagination Start
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[1],
  );
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, userList.length);
  let list = [];
  //State Variables for Pagination End

  // Loading Modal Variable Start
  const [loadingVisible, setLoadingVisible] = useState(false);
  const showLoadingModal = () => setLoadingVisible(true);
  const hideLoadingModal = () => setLoadingVisible(false);
  // Loading Modal Variable End

  // Remarks Modal Variables Start
  const [visible, setVisible] = useState(false);
  const modalData = useRef({remarks: 'Placeholder'});
  const showModal = currentItem => {
    modalData.current = currentItem;
    setVisible(true);
  };
  const hideModal = () => setVisible(false);
  //Delete User
  const deleteUser = item => {
    promptUser(
      'CAUTION',
      `Are You Sure, you want to delete ${item.username}?`,
    ).then(res => {
      if (res === 'Yes') {
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(item),
        };
        fetch('https://hidden-stream-06963.herokuapp.com/users', options)
          .then(resp => resp.json())
          .then(response => {
            Alert.alert(response);
          })
          .catch(err => console.log(err));
        hideModal();
        getUserData();
      } else {
        return;
      }
    });
  };
  // Remarks Modal Variables End

  //Function to Fetch User Data
  const getUserData = () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify(data),
    };
    showLoadingModal();
    fetch('https://hidden-stream-06963.herokuapp.com/users', options)
      .then(resp => resp.json())
      .then(response => {
        setUserList(response);
        hideLoadingModal();
      })
      .catch(err => {
        console.log(err);
        hideLoadingModal();
      });
  };

  //Fetch User Data
  useEffect(() => {
    navigation.addListener('focus', () => {
      getUserData();
    });
  }, []);

  // Cleanup Fuction
  useEffect(() => {
    return function cleanup() {
      mounted.current = false;
    };
  }, []);

  for (var i = from; i < to; i++) {
    list.push(userList[i]);
  }

  return (
    <SafeAreaView>
      <DataTable style={{elevation: 2, width: '95%', alignSelf: 'center'}}>
        <DataTable.Header>
          <DataTable.Title style={{flex: 3}}>USER NAME</DataTable.Title>
          <DataTable.Title style={{flex: 1}}>ADMIN</DataTable.Title>
        </DataTable.Header>
        <ScrollView>
          {list.map(item => {
            return (
              <DataTable.Row
                key={item._id} // you need a unique key per item
                onPress={() => showModal(item)}>
                <DataTable.Cell style={{flex: 3}}>
                  {item.username}
                </DataTable.Cell>
                <DataTable.Cell style={{flex: 1}}>
                  {item.isAdmin.toString()}
                </DataTable.Cell>
              </DataTable.Row>
            );
          })}
          <RemarksModal
            hideModal={hideModal}
            visible={visible}
            item={modalData.current}
            deleteItem={deleteUser}
          />
          <LoadingModal visible={loadingVisible} hideModal={hideLoadingModal} />
          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(userList.length / numberOfItemsPerPage)}
            // eslint-disable-next-line no-shadow
            onPageChange={page => setPage(page)}
            label={`${from + 1}-${to} of ${userList.length}`}
            showFastPaginationControls
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={numberOfItemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            selectPageDropdownLabel={'Rows per page'}
          />
          {/* <Button onPress={() => clearTable()}>Clear Data</Button> */}
          <Button onPress={() => getUserData()}>Refresh</Button>
        </ScrollView>
      </DataTable>
    </SafeAreaView>
  );
};

export default UserListView;
