import 'react-native-gesture-handler';

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
// eslint-disable-next-line prettier/prettier
import {DefaultTheme, Provider as PaperProvider, Text} from 'react-native-paper';
import SplashScreen from './src/Views/SplashScreen';
import AuthContext from './src/Utils/LoginContext';
import CustomDrawerContent from './src/Utils/Drawer';
import DataViewNavigator from './src/Screens/DataScreens';
import MainNavigator from './src/Screens/MainScreens';
import LoginNavigator from './src/Screens/LoginScreens';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

Text.defaultProps = {
  ...(Text.defaultProps || {}),
  allowFontScaling: true,
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#18A558',
    accent: '#03dac4',
    background: '#f6f6f6',
  },
};

const App = () => {
  // Reducer to set the state of the token for determining the starting page
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  // Use useEffect hook to check if a Token is already available or not
  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        userToken = null;
      } catch (e) {
        // Restoring token failed
        console.log('failed');
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };

    bootstrapAsync();
  }, []);

  // Use useMemo hook to save and run from memory the authentication logic and to define the context for login context
  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
    }),
    [],
  );
  return (
    <AuthContext.Provider value={authContext}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Navigator>
              <Stack.Screen name="Splash" component={SplashScreen} />
            </Stack.Navigator>
          ) : state.userToken == null ? (
            <LoginNavigator state={state} />
          ) : (
            <Drawer.Navigator
              drawerContent={props => <CustomDrawerContent {...props} />}>
              <Drawer.Screen
                name="Main"
                component={MainNavigator}
                options={{
                  drawerIcon: ({focused, size}) => (
                    <Icon
                      name="home"
                      size={size}
                      color={focused ? '#7cc' : '#ccc'}
                    />
                  ),
                }}
              />
              <Drawer.Screen
                name="Data"
                component={DataViewNavigator}
                options={{
                  drawerIcon: ({focused, size}) => (
                    <Icon
                      name="database"
                      size={size}
                      color={focused ? '#7cc' : '#ccc'}
                    />
                  ),
                }}
              />
            </Drawer.Navigator>
          )}
        </NavigationContainer>
      </PaperProvider>
    </AuthContext.Provider>
  );
};

export default App;
