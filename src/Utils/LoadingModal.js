/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator, Colors, Modal, Portal, Text} from 'react-native-paper';

const LoadingModal = ({visible, hideModal}) => {
  // const containerStyle = {backgroundColor: 'white', padding: 20, margin: 40, height: 200};
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.containerStyle}>
        <Text style={styles.textStyle}>Processing. . . .</Text>
        <ActivityIndicator animating={true} color={Colors.green800} />
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
    margin: 40,
    height: 200,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 18,
  },
});



export default LoadingModal;
