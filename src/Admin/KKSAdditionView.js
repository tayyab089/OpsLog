/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import {Surface, Text, TextInput, Title, Button} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import {sectionList} from '../Data/SectionListData';

const KKSAdditionView = () => {
  const [KKS, setKKS] = useState('');
  const [description, setDescription] = useState('');
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');

  //Dropdown Selector for Area
  const [openArea, setOpenArea] = useState(false);
  const [dropdownValueArea, setDropdownValueArea] = useState(null);
  const [dropdownItemsArea, setDropdownItemsArea] = useState([
    ...sectionList.BoilerSectionList,
    sectionList.BOPSectionList,
  ]);
  //Dropdown Selector for Category
  const [openCategory, setOpenCategory] = useState(false);
  const [dropdownValueCategory, setDropdownValueCategory] = useState(null);
  const [dropdownItemsCategory, setDropdownItemsCategory] = useState([
    {label: 'Tubine', value: 'Turbine'},
    {label: 'Boiler', value: 'Boiler'},
    {label: 'BOP', value: 'BOP'},
  ]);
  //Dropdown Selector for Type
  const [openType, setOpenType] = useState(false);
  const [dropdownValueType, setDropdownValueType] = useState(null);
  const [dropdownItemsType, setDropdownItemsType] = useState([
    {label: 'CP', value: 'CP'},
    {label: 'CT', value: 'CT'},
    {label: 'CF', value: 'CF'},
    {label: 'CQ', value: 'CQ'},
  ]);

  return (
    <View style={styles.container}>
      <Surface style={styles.surface}>
        <Title style={styles.heading}>Please Provide Following Data:</Title>
        <View style={styles.miniContainerInput}>
          <Text style={styles.labelText}>KKS: </Text>
          <TextInput
            mode="outlined"
            onChangeText={text => setKKS(text)}
            value={KKS}
            style={styles.textInput}
          />
        </View>
        <View style={styles.miniContainerDropdown}>
          <Text style={styles.labelText}>Area:</Text>
          <View style={styles.textInput}>
            <DropDownPicker
              open={openArea}
              value={dropdownValueArea}
              items={dropdownItemsArea}
              setOpen={setOpenArea}
              setValue={setDropdownValueArea}
              setItems={setDropdownItemsArea}
              style={{...styles.picker, zIndex: 2000}}
              //   containerStyle={styles.pickerContainer}
              dropDownStyle={styles.pickerDropdown}
              // eslint-disable-next-line prettier/prettier
              dropDownContainerStyle={{...styles.pickerDropdownContainer, zIndex: 2000}}
            />
          </View>
        </View>
        <View style={styles.miniContainerDropdown}>
          <Text style={styles.labelText}>Category:</Text>
          <View style={styles.textInput}>
            <DropDownPicker
              open={openCategory}
              value={dropdownValueCategory}
              items={dropdownItemsCategory}
              setOpen={setOpenCategory}
              setValue={setDropdownValueCategory}
              setItems={setDropdownItemsCategory}
              style={{...styles.picker, zIndex: 500}}
              //   containerStyle={styles.pickerContainer}
              dropDownStyle={styles.pickerDropdown}
              // eslint-disable-next-line prettier/prettier
              dropDownContainerStyle={{...styles.pickerDropdownContainer, zIndex: 500}}
            />
          </View>
        </View>
        <View style={styles.miniContainerInput}>
          <Text style={styles.labelText}>Description: </Text>
          <TextInput
            mode="outlined"
            onChangeText={text => setDescription(text)}
            value={description}
            style={styles.textInput}
          />
        </View>
        <View style={styles.miniContainerDropdown}>
          <Text style={styles.labelText}>Type:</Text>
          <View style={styles.textInput}>
            <DropDownPicker
              open={openType}
              value={dropdownValueType}
              items={dropdownItemsType}
              setOpen={setOpenType}
              setValue={setDropdownValueType}
              setItems={setDropdownItemsType}
              style={{...styles.picker, zIndex: 100}}
              //   containerStyle={styles.pickerContainer}
              dropDownStyle={styles.pickerDropdown}
              // eslint-disable-next-line prettier/prettier
              dropDownContainerStyle={{...styles.pickerDropdownContainer, zIndex: 2000}}
            />
          </View>
        </View>
        <View style={styles.miniContainerInput}>
          <Text style={styles.labelText}>Min: </Text>
          <TextInput
            mode="outlined"
            keyboardType="numeric"
            onChangeText={text => setMin(text)}
            value={min}
            style={{...styles.textInput, marginRight: 10}}
          />
          <Text style={styles.labelText}>Max: </Text>
          <TextInput
            mode="outlined"
            keyboardType="numeric"
            onChangeText={text => setMax(text)}
            value={max}
            style={styles.textInput}
          />
        </View>
        <Button
          mode="contained"
          style={styles.submitButton}
          onPress={() => Alert.alert('KKS Added Successfully')}>
          Submit
        </Button>
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  surface: {
    padding: 20,
  },
  heading: {
    marginBottom: 20,
  },
  miniContainerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  miniContainerDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  textInput: {
    flex: 2,
    height: 50,
  },
  labelText: {
    flex: 1,
    fontSize: 16,
  },
  picker: {
    height: 50,
    borderRadius: 5,
    backgroundColor: '#F8F8F8',
    borderColor: '#808080',
    zIndex: 1000,
  },
  pickerContainer: {
    backgroundColor: 'blue',
  },
  pickerDropdown: {
    backgroundColor: 'yellow',
  },
  pickerDropdownContainer: {
    backgroundColor: '#F8F8F8',
    borderColor: '#808080',
  },
  submitButton: {
    marginTop: 20,
  },
});
export default KKSAdditionView;
