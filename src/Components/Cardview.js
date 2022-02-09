/* eslint-disable prettier/prettier */
import React from 'react';
import {View,Text, Image, StyleSheet} from 'react-native';
import {withTheme} from 'react-native-paper';

const CardView = ({title, src, theme}) => {
  return (
    <View style = {styles.container}>
      <Image
         style={styles.image}
        source = {src}
        />
      <Text style={{...styles.title, backgroundColor: theme.colors.primary}}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        margin: 10,
        backgroundColor: '#eaeaea',
        width: 300,
        alignSelf: 'center',
        elevation: 8,
        borderRadius: 10,
      },
    image: {
      resizeMode: 'cover',
      width: '100%',
      height: undefined,
      aspectRatio: 135 / 76,
      borderRadius: 10,
      alignSelf: 'center',
      borderWidth: 2,
      borderColor: '#ffffff',
    },
    title: {
      textAlign: 'center',
      fontSize: 20,
      fontFamily: 'sans-serif',
      width: '100%',
      paddingVertical: 8,
      borderWidth: 2,
      borderColor: '#ffffff',
      borderRadius: 10,
      backgroundColor: '#18A558',
      color: '#ffffff',
      // fontWeight: 'bold',
    },
});

export default withTheme(CardView);
