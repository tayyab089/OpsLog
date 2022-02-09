import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DataMainView from '../Database/DataMainView';
import DataTableView from '../Database/DataTableView';
import DataTrendView from '../Database/DataTrendView';
import DataTrendQRScanner from '../Database/DataTrendQRScanner';
import {Button, withTheme} from 'react-native-paper';
import TransformRotate from '../Utils/Transitions/TransfomRotate';

const Stack = createStackNavigator();

const DataViewNavigator = ({theme}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        initialRouteName: 'DataMainView',
        ...TransformRotate,
      }}>
      <Stack.Screen
        name="DataMainView"
        component={DataMainView}
        options={({navigation}) => ({
          title: 'Data View',
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
        name="DataTable"
        component={DataTableView}
        options={({navigation}) => ({
          title: 'Data Table',
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
        name="DataTrend"
        component={DataTrendView}
        options={({navigation}) => ({
          title: 'Graphical Data',
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate('DTQRScanner')}
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
        name="DTQRScanner"
        component={DataTrendQRScanner}
        options={{title: 'QRScanner'}}
      />
    </Stack.Navigator>
  );
};

export default withTheme(DataViewNavigator);
