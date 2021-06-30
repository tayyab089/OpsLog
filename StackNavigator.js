import 'react-native-gesture-handler';

import React, {Fragment} from 'react';
import {
  NavigationContainer,
  // eslint-disable-next-line no-unused-vars
  NavigationHelpersContext,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Button,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import HomePage from './src/Views/HomePage';
import SectionListView from './src/Views/SectionListView';
import AreaListView from './src/Views/AreaListView';
import DataInputView from './src/Views/DataInputView';
import QRScanner from './src/Views/QRScannerView';
import LoginView from './src/Views/LoginView';
import SplashScreen from './src/Views/SplashScreen';
import AuthContext from './src/Utils/LoginContext';

const Stack = createStackNavigator();

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
            {state.isLoading ? (
              // We haven't finished checking for the token yet
              <Stack.Screen name="Splash" component={SplashScreen} />
            ) : state.userToken == null ? (
              // No token found, user isn't signed in
              <Stack.Screen
                name="Login"
                component={LoginView}
                options={{
                  headerShown: false,
                  animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                }}
              />
            ) : (
              <Fragment>
                <Stack.Screen
                  name="Home"
                  component={HomePage}
                  options={({navigation}) => ({
                    title: 'TEL-OPERATOR ROUND APP',
                    headerRight: () => (
                      <Button
                        onPress={() => navigation.navigate('QRScanner')}
                        mode="text"
                        color="#fff"
                        icon="qrcode-scan"
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
              </Fragment>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </AuthContext.Provider>
  );
};

export default App;
