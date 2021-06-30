/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {Portal, Modal, Text, Button} from 'react-native-paper';

const RemarksModal = ({item, visible, hideModal, deleteItem}) => {
  // eslint-disable-next-line prettier/prettier
  const containerStyle = {backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 10};
  const textStyle = {marginBottom: 50, marginTop: 20};

  if (item.remarks === '') {
    item.remarks = 'All Okay :)';
  }

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}>
        <Text style={textStyle}>Remarks: {item.remarks}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <Button
            style={{marginRight: 10}}
            mode="contained"
            onPress={deleteItem}>
            Delete
          </Button>
          <Button mode="contained" onPress={hideModal}>
            Okay
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default RemarksModal;

// () =>
//               deleteItem('DELETE FROM data_input_table where date=?', [
//                 item.date,
//               ])

// () => {
//     hideModal();
//   }
