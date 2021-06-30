/* eslint-disable no-shadow */
import React, {useState, useContext} from 'react';
import {View, StatusBar, StyleSheet, Image} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
// eslint-disable-next-line no-unused-vars
import userData from '../Data/UserData';
import AuthContext from '../Utils/LoginContext';

const LoginView = ({navigation}) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const {signIn} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#18A558" />
      <View>
        <Image
          style={styles.image}
          source={require('../assets/Logos/OpsLog_Logo_nbc.png')}
        />
      </View>
      <TextInput
        style={styles.inputs}
        theme={{colors: {primary: 'white', placeholder: '#fff', text: '#fff'}}}
        mode="flat"
        label="ID"
        onChangeText={id => setId(id)}
        value={id}
      />
      <TextInput
        style={styles.inputs}
        mode="flat"
        label="Password"
        theme={{colors: {primary: 'white', placeholder: '#fff', text: '#fff'}}}
        secureTextEntry={true}
        onChangeText={password => setPassword(password)}
        value={password}
      />
      <Button
        style={styles.loginButton}
        labelStyle={styles.loginButtonContent}
        dark={false}
        mode="contained"
        onPress={() => signIn({id, password})}>
        Login
      </Button>
      <View>
        <Image
          style={styles.image}
          source={require('../assets/Logos/company_logo.png')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#18A558',
  },
  inputs: {
    margin: 10,
    backgroundColor: '#18A558',
  },
  loginButton: {
    margin: 10,
    backgroundColor: '#fff',
    height: 50,
    justifyContent: 'center',
  },
  loginButtonContent: {
    color: '#18A558',
  },
  image: {
    alignSelf: 'center',
    marginTop: 10,
    height: 110,
    width: 250,
    resizeMode: 'contain',
  },
});

export default LoginView;
