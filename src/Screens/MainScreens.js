import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomePage from '../Views/HomePage';
import SectionListView from '../Views/SectionListView';
import AreaListView from '../Views/AreaListView';
import DataInputView from '../Views/DataInputView';
import QRScanner from '../Views/QRScannerView';
import {Button} from 'react-native-paper';
import TransformRotate from '../Utils/Transitions/TransfomRotate';

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#18A558',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        initialRouteName: 'Home',
        ...TransformRotate,
      }}>
      <Stack.Screen
        name="Home"
        component={HomePage}
        options={({navigation}) => ({
          title: 'TEL-OPERATOR ROUND',
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate('QRScanner')}
              mode="text"
              color="#fff"
              icon="qrcode-scan"
            />
          ),
          headerLeft: () => (
            <Button
              onPress={() => navigation.toggleDrawer()}
              mode="text"
              color="#fff"
              icon="reorder-horizontal"
            />
          ),
        })}
      />
      <Stack.Screen
        name="SectionListView"
        component={SectionListView}
        options={({route, navigation}) => ({
          title: route.params.title,
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate('QRScanner')}
              mode="text"
              color="#fff"
              icon="qrcode-scan"
            />
          ),
          headerLeft: () => (
            <Button
              onPress={() => navigation.toggleDrawer()}
              mode="text"
              color="#fff"
              icon="reorder-horizontal"
            />
          ),
        })}
      />
      <Stack.Screen
        name="AreaListView"
        component={AreaListView}
        options={({route, navigation}) => ({
          title: route.params.area,
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate('QRScanner')}
              mode="text"
              color="#fff"
              icon="qrcode-scan"
            />
          ),
          headerLeft: () => (
            <Button
              onPress={() => navigation.toggleDrawer()}
              mode="text"
              color="#fff"
              icon="reorder-horizontal"
            />
          ),
        })}
      />
      <Stack.Screen
        name="DataInputView"
        component={DataInputView}
        options={{title: 'TEL-OPERATOR ROUND APP'}}
      />
      <Stack.Screen
        name="QRScanner"
        component={QRScanner}
        options={{title: 'QRScanner'}}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
