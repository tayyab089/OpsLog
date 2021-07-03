/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, View} from 'react-native';
import { Divider, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';

const SectionListComponent = ({title}) => {
    return (
    <View>
        <View style= {styles.container}>
            <Text style = {styles.inputText}>{title}</Text>
            <Icon name="right" size={16} color="#414a4c" />
        </View>
        <Divider />
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 2,
        marginRight: 10,
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // elevation: 4,
        // backgroundColor: '#f0f0f0',
        alignItems: 'center',
    },
    inputText: {
        // textAlign: 'left',
        fontSize: 16,
        padding: 10,
        // allowFontScaling: false,
        flex: 1,
        flexWrap: 'wrap',
    },
});

export default SectionListComponent;
