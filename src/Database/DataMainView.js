import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import {Surface} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';

const DataMainView = ({navigation}) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Surface style={styles.surface}>
          <TouchableOpacity
            style={styles.block}
            onPress={() => navigation.navigate('DataTable')}>
            <Icon name="table" size={18} color="#414a4c" />
            <Text style={styles.text}> Data Table</Text>
          </TouchableOpacity>
        </Surface>
        <Surface style={styles.surface}>
          <TouchableOpacity
            style={styles.block}
            onPress={() => navigation.navigate('DataTrend')}>
            <Icon name="barchart" size={18} color="#414a4c" />
            <Text style={styles.text}> Trends</Text>
          </TouchableOpacity>
        </Surface>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  surface: {
    marginBottom: 8,
    padding: 10,
    borderRadius: 8,
  },
  text: {
    fontSize: 18,
    marginLeft: 20,
  },
  block: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default DataMainView;
