import React, {Fragment, useContext} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Surface} from 'react-native-paper';
// import Icon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import UserContext from '../Utils/UserContext';

const width = Dimensions.get('window').width;
// const height = Dimensions.get('window').height;

const AdminMainView = ({navigation}) => {
  const {userToken} = useContext(UserContext);
  console.log(userToken);
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <SafeAreaView style={{marginTop: 20, height: '100%'}}>
      {userToken.isAdmin ? (
        <Fragment>
          <View style={styles.container}>
            <Surface style={styles.surface}>
              <TouchableOpacity
                style={styles.block}
                onPress={() => navigation.navigate('UserList')}>
                <Icon name="format-list-bulleted" size={35} color="#414a4c" />
                <Text style={styles.text}> User List</Text>
              </TouchableOpacity>
            </Surface>
            <Surface style={styles.surface}>
              <TouchableOpacity
                style={styles.block}
                onPress={() => navigation.navigate('SignUp')}>
                <Icon name="account-plus" size={40} color="#414a4c" />
                <Text style={styles.text}> SignUp</Text>
              </TouchableOpacity>
            </Surface>
          </View>
          <View style={styles.container}>
            <Surface style={styles.surface}>
              <TouchableOpacity
                style={styles.block}
                onPress={() => navigation.navigate('KKSAdd')}>
                <Icon name="plus-outline" size={40} color="#414a4c" />
                <Text style={styles.text}> KKS Addition</Text>
              </TouchableOpacity>
            </Surface>
            <Surface style={styles.surface}>
              <TouchableOpacity
                style={styles.block}
                onPress={() => navigation.navigate('Reports')}>
                <Icon name="artstation" size={35} color="#414a4c" />
                <Text style={styles.text}> Reports</Text>
              </TouchableOpacity>
            </Surface>
          </View>
        </Fragment>
      ) : (
        <View style={styles.error}>
          <Text>ONLY ADMINS CAN ACCESS THIS PANEL</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
  },
  surface: {
    width: width / 2 - 30,
    height: 150,
    margin: 5,
    padding: 10,
    borderRadius: 8,
    elevation: 4,
  },
  text: {
    margin: 15,
    fontSize: 20,
  },
  block: {
    height: 150,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default AdminMainView;
