/* eslint-disable no-shadow */
import React, {useState, useContext} from 'react';
import {View, StatusBar, StyleSheet, Image} from 'react-native';
import {TextInput, Button, Switch, Text} from 'react-native-paper';
import AuthContext from '../Utils/LoginContext';

const SignUpView = ({navigation}) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const {signUp} = useContext(AuthContext);

  const handleSignUp = data => {
    signUp(data);
    setId('');
    setPassword('');
    setIsAdmin(false);
  };

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
      <View style={styles.adminSwitchContainer}>
        <Text style={styles.adminSwitchText}>Is Admin</Text>
        <Switch value={isAdmin} onValueChange={setIsAdmin} />
      </View>
      <Button
        style={styles.loginButton}
        labelStyle={styles.loginButtonContent}
        dark={false}
        mode="contained"
        onPress={() => handleSignUp({id, password, isAdmin})}>
        Add User
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
  adminSwitchContainer: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  adminSwitchText: {
    color: '#fff',
    fontSize: 18,
    marginRight: 20,
  },
});

export default SignUpView;
