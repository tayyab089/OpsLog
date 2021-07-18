import 'react-native-gesture-handler';

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
// eslint-disable-next-line prettier/prettier
import {DefaultTheme, Provider as PaperProvider, Text} from 'react-native-paper';
import SplashScreen from './src/Views/SplashScreen';
import AuthContext from './src/Utils/LoginContext';
import UserContext from './src/Utils/UserContext';
import CustomDrawerContent from './src/Utils/Drawer';
import DataViewNavigator from './src/Screens/DataScreens';
import MainNavigator from './src/Screens/MainScreens';
import LoginNavigator from './src/Screens/LoginScreens';
import AdminViewNavigator from './src/Screens/AdminScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Alert} from 'react-native';
import * as Keychain from 'react-native-keychain';

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
        const userData = await Keychain.getGenericPassword();
        userToken = JSON.parse(userData.username);
      } catch (e) {
        console.log('failed');
      }
      // After restoring token, we may need to validate it in production apps
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };

    bootstrapAsync();
  }, []);

  // Use useMemo hook to save and run from memory the authentication logic and to define the context for login context
  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        console.log(data);
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        };
        fetch('https://hidden-stream-06963.herokuapp.com/login', options)
          .then(resp => resp.json())
          .then(response => {
            if (response.username === data.id) {
              Keychain.setGenericPassword(
                JSON.stringify(response),
                JSON.stringify(response.token),
              ).then((resp, err) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(response);
                  //dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
                  dispatch({type: 'SIGN_IN', token: response});
                }
              });
            } else {
              Alert.alert(response.toString());
            }
          })
          .catch(err => console.log(err));
      },
      signOut: async () => {
        await Keychain.resetGenericPassword();
        dispatch({type: 'SIGN_OUT'});
      },
      signUp: async data => {
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        };
        fetch('https://hidden-stream-06963.herokuapp.com/register', options)
          .then(resp => resp.json())
          .then(response => {
            Alert.alert(response);
            console.log(response);
          })
          .catch(err => console.log(err));
      },
      userToken: state.userToken,
    }),
    [],
  );

  const userContext = {userToken: state.userToken};

  return (
    <AuthContext.Provider value={authContext}>
      <UserContext.Provider value={userContext}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            {state.isLoading ? (
              // We haven't finished checking for the token yet
              <Stack.Navigator>
                <Stack.Screen
                  name="Splash"
                  component={SplashScreen}
                  options={{
                    headerShown: false,
                  }}
                />
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
                <Drawer.Screen
                  name="Admin"
                  component={AdminViewNavigator}
                  options={{
                    drawerIcon: ({focused, size}) => (
                      <Icon
                        name="account-settings"
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
      </UserContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
