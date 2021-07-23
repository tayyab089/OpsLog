import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Surface, Text, Title} from 'react-native-paper';

const ReportsView = () => {
  return (
    <View>
      <Surface style={styles.innercontainer}>
        <Title>Please Select Report To View:</Title>
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  innercontainer: {
    height: '95%',
    margin: 20,
    padding: 20,
  },
});

export default ReportsView;
