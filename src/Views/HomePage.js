/* eslint-disable prettier/prettier */
import React from 'react';
import {FlatList, TouchableOpacity, SafeAreaView, StatusBar} from 'react-native';
import Cardview from '../Components/Cardview';
import mainMenu from '../Data/HomepageData';


const HomePage = ({navigation}) => {

    const renderItem = ({ item }) => (
        <TouchableOpacity
        onPress={() => navigation.navigate('SectionListView', { section: item.nav, title: item.title })}>
            <Cardview
            title={item.title}
            src= {item.uri} />
        </TouchableOpacity>
      );
    return (
        <SafeAreaView>
            <StatusBar barStyle="light-content" backgroundColor="#18A558" />
            <FlatList
                data={mainMenu}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>

    );
};

export default HomePage;
