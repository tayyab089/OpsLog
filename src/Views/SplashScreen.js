import React from 'react';
import {View} from 'react-native';
import {ActivityIndicator, Colors} from 'react-native-paper';

function SplashScreen() {
  return (
    <View style={{flex: 1, alignContent: 'center',justifyContent: 'center',alignSelf: 'center', backgroundColor: '#18A558', width: '100%'}}>
      <ActivityIndicator animating={true} color={Colors.white} />
    </View>
  );
}

export default SplashScreen;
