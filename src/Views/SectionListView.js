/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, TouchableOpacity} from 'react-native';
import SectionListComponent from '../Components/SectionListComponent';
import {sectionList} from '../Data/SectionListData';

const SectionListView = ({route,navigation}) => {
    let colors = ['#ffffff', '#efffef'];
    const [secData, setSecData] = useState([]);
    useEffect(
        () => navigation.addListener('focus', () => {
          setSecData(sectionList[route.params.section]);
          }),
        [navigation, route.params.section]
      );
    const renderItem = ({ item, index }) => (
        <TouchableOpacity
        style={{backgroundColor: colors[index % colors.length]}}
        onPress={() => navigation.navigate('AreaListView', {area : item.value})}>
            <SectionListComponent title={item.value}/>
        </TouchableOpacity>
      );
    return (
        <SafeAreaView>
            <FlatList
                data={secData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>

    );
};

export default SectionListView;
