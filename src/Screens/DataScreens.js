import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DataMainView from '../Database/DataMainView';
import DataTableView from '../Database/DataTableView';
import DataTrendView from '../Database/DataTrendView';
import {Button} from 'react-native-paper';
import TransformRotate from '../Utils/Transitions/TransfomRotate';

const Stack = createStackNavigator();

const DataViewNavigator = () => {
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
    </Stack.Navigator>
  );
};

export default DataViewNavigator;
