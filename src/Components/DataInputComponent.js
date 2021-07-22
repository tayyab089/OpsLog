import React, {useState, useEffect} from 'react';
import {Dimensions, Text, StyleSheet, View} from 'react-native';
import {TextInput, HelperText, Checkbox} from 'react-native-paper';

const DataInputComponent = ({
  description,
  kks,
  text,
  setText,
  hasErrors,
  min,
  max,
  remarks,
  setRemarks,
  checked,
  setChecked,
}) => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });
  useEffect(() => {
    Dimensions.addEventListener('change', ({window: {width, height}}) => {
      setWindowDimensions({
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      });
    });
  }, []);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.inputText}>{description}</Text>
        <TextInput
          autoFocus={true}
          disabled={checked}
          mode="outlined"
          keyboardType="numeric"
          style={styles.input}
          label={kks}
          // eslint-disable-next-line no-shadow
          onChangeText={text => setText(text)}
          value={text}
        />
        <HelperText type="error" visible={hasErrors()}>
          Value is too High, Please check to see for any problem
        </HelperText>
        <Text style={{...styles.unitText, left: windowDimensions.width - 50}}>
          C
        </Text>
      </View>
      <View style={styles.minMaxContainer}>
        <Text style={styles.minMaxText}>Min: {min}</Text>
        <Text style={styles.minMaxText}>Max: {max}</Text>
      </View>
      <TextInput
        style={styles.remarks}
        mode="outlined"
        label="Remarks"
        multiline={true}
        numberOfLines={4}
        // eslint-disable-next-line no-shadow
        onChangeText={remarks => setRemarks(remarks)}
        value={remarks}
      />
      <View style={styles.checkbox}>
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked(!checked);
          }}
        />
        <Text> Equipment is not in service, either standby or in outage</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {margin: 10},
  minMaxContainer: {
    marginTop: -20,
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  minMaxText: {
    color: '#18A558',
  },
  inputText: {
    textAlign: 'left',
    fontSize: 16,
    padding: 3,
  },
  input: {},
  remarks: {marginTop: 10},
  unitText: {
    top: -60,
    fontSize: 20,
    color: '#18A558',
  },
  checkbox: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default DataInputComponent;
