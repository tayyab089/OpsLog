import React, {useState} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {Portal, Modal, Title, Button, Surface} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import DropDownPicker from 'react-native-dropdown-picker';

const width = Dimensions.get('window').width;
// const height = Dimensions.get('window').height;

const FilterModal = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  filterVisible,
  hideFilterModal,
  dropdownValue,
  setDropdownValue,
  dropdownItems,
  setDropdownItems,
}) => {
  // eslint-disable-next-line prettier/prettier
  const containerStyle = {backgroundColor: 'white', padding: 20, paddingTop: 20,  margin: 20, borderRadius: 10};

  const [open, setOpen] = useState(false);

  return (
    <Portal>
      <Modal
        visible={filterVisible}
        onDismiss={hideFilterModal}
        contentContainerStyle={containerStyle}>
        <Surface style={styles.textContainer}>
          <Title style={styles.textStyle}>KKS</Title>
        </Surface>
        <DropDownPicker
          open={open}
          value={dropdownValue}
          items={dropdownItems}
          setOpen={setOpen}
          setValue={setDropdownValue}
          setItems={setDropdownItems}
          searchable={true}
          disableBorderRadius={true}
          textStyle={styles.dropdownTextStyles}
          labelStyle={styles.dropdownLabelStyles}
          multiple={true}
          min={0}
        />
        <Surface style={styles.textContainer}>
          <Title style={styles.textStyle}>Start Date/Time</Title>
        </Surface>
        <Surface style={styles.dateTimePickerContainer}>
          <DatePicker
            date={startDate}
            onDateChange={date => setStartDate(date)}
            fadeToColor="#fff"
            style={styles.dateTimePicker}
          />
        </Surface>
        <Surface style={styles.textContainer}>
          <Title style={styles.textStyle}>End Date/Time</Title>
        </Surface>
        <Surface style={styles.dateTimePickerContainer}>
          <DatePicker
            date={endDate}
            onDateChange={date => setEndDate(date)}
            style={styles.dateTimePicker}
          />
        </Surface>
        <Button
          mode="outlined"
          style={{margin: 10}}
          onPress={() => hideFilterModal()}>
          Done
        </Button>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dateTimePickerContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#000',
    margin: 0,
    padding: 10,
    borderRadius: 10,
  },
  dateTimePicker: {
    width: width - 100,
    height: 100,
  },
  textStyle: {margin: 10, textAlign: 'center', color: '#fff'},
  textContainer: {
    backgroundColor: '#18A558',
    marginBottom: 10,
    marginTop: 10,
  },
  dropdownTextStyles: {
    fontSize: 18,
  },
  dropdownLabelStyles: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default FilterModal;
