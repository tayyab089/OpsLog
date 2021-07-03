import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Divider, Text} from 'react-native-paper';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import IconA from 'react-native-vector-icons/AntDesign';

const DataInput = ({description, kks}) => {
  // const [text, setText] = useState('');
  return (
    <View>
      <View style={styles.outercontainer}>
        <IconM name="numeric" size={24} color="#414a4c" />
        <View style={styles.container}>
          <Text style={styles.inputText}>{description}</Text>
          <IconA name="right" size={16} color="#414a4c" />
        </View>
        <Divider />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outercontainer: {
    margin: 2,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    marginRight: 10,
    flex: 1,
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

export default DataInput;
