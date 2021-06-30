import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginView from '../Views/LoginView';
// import TransformRotate from '../Utils/Transitions/TransfomRotate';

const Stack = createStackNavigator();

const LoginNavigator = ({state}) => {
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
      }}>
      <Stack.Screen
        name="Login"
        component={LoginView}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default LoginNavigator;
