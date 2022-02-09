import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, TouchableOpacity} from 'react-native';
import AreaListComponent from '../Components/AreaListComponent';
// import areaList from '../Data/FilteredData.json';
import {openDatabase, closeDatabase} from 'react-native-sqlite-storage';

const AreaListView = ({route, navigation}) => {
  let colors = ['#ffffff', '#efffef'];
  const [areaData, setAreaData] = useState([]);
  useEffect(() =>
    navigation.addListener('focus', () => {
      // Connction to access the pre-populated user_db.db
      const db = openDatabase({name: 'app_database.db', createFromLocation: 1}); //Could have opened the connection outsie the component if no close is requied
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM reference_table', [], (_tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          setAreaData(temp.filter(item => item.area === route.params.area));
          closeDatabase({name: 'app_database.db', createFromLocation: 1}); // Not sure if this line is needed, need to see when finalizing
        });
      });
    }),
  );

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      style={{backgroundColor: colors[index % colors.length]}}
      onPress={() => navigation.navigate('DataInputView', {kks: item.kks})}>
      <AreaListComponent description={item.description} kks={item.kks} />
    </TouchableOpacity>
  );
  return (
    <SafeAreaView>
      <FlatList
        data={areaData}
        renderItem={renderItem}
        keyExtractor={(_item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

export default AreaListView;
