import {openDatabase} from 'react-native-sqlite-storage';
import {Alert} from 'react-native';
import promptUser from '../Utils/AsyncAlert';

const db = openDatabase({name: 'app_database.db', createFromLocation: 1});

const retrieveData = () => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM data_input_table', [], (_tx, results) => {
      var temp = [];
      console.log(results.rows.length);
      for (let i = 0; i < results.rows.length; ++i) {
        temp.push(results.rows.item(i));
      }
      setFlatListItems(temp);
    });
  });
};

const clearTable = (sql, data) => {
  promptUser('CAUTION', 'Are You Sure, you want to delete all data?').then(
    res => {
      if (res === 'Yes') {
        db.transaction(tx => {
          tx.executeSql(sql, data, (_tx, results) => {
            if (results.rows.length === 0) {
              Alert.alert('Data Deleted Successfully....');
              retrieveData();
            }
          });
        });
      } else {
        return;
      }
    },
  );
};

const deleteItem = (sql, data) => {
  promptUser('CAUTION', 'Are You Sure?').then(res => {
    if (res === 'Yes') {
      db.transaction(tx => {
        tx.executeSql(sql, data, (_tx, results) => {
          if (results.rows.length === 0) {
            Alert.alert('Data Deleted Successfully....');
            hideModal();
            retrieveData();
          }
        });
      });
    } else {
      return;
    }
  });
};

const refreshTable = () => {
  retrieveData();
};

export {retrieveData, clearTable, deleteItem, refreshTable};
