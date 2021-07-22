import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AdminMainView from '../Admin/AdminMainView';
import UserList from '../Admin/UserListView';
import SignUpView from '../Admin/SignUpView';
import KKSAdditionView from '../Admin/KKSAdditionView';
import {Button} from 'react-native-paper';
import TransformRotate from '../Utils/Transitions/TransfomRotate';

const Stack = createStackNavigator();

const AdminViewNavigator = () => {
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
        initialRouteName: 'AdminMainView',
        ...TransformRotate,
      }}>
      <Stack.Screen
        name="AdminMainView"
        component={AdminMainView}
        options={({navigation}) => ({
          title: 'Admin Panel',
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
        name="UserList"
        component={UserList}
        options={({navigation}) => ({
          title: 'User List',
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
        name="SignUp"
        component={SignUpView}
        options={({navigation}) => ({
          title: 'Add User',
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
        name="KKSAdd"
        component={KKSAdditionView}
        options={({navigation}) => ({
          title: 'Add KKS',
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

export default AdminViewNavigator;
