import React, {useContext} from 'react';
import {StyleSheet, View, Dimensions, Image} from 'react-native';
import {Text, withTheme} from 'react-native-paper';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AuthContext from './LoginContext';
import UserContext from './UserContext';

const windowHeight = Dimensions.get('window').height;

function CustomDrawerContent(props) {
  const {signOut} = useContext(AuthContext);
  const {userToken} = useContext(UserContext);
  return (
    <DrawerContentScrollView {...props}>
      <View style={{...styles.upperHalf, backgroundColor: props.theme.colors.primary}}>
        <Image
          style={styles.logo}
          source={require('../assets/Logos/OpsLog_Logo_nbc.png')}
        />
        <Text style={styles.id}>{userToken.username}</Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        icon={({focused, size}) => (
          <Icon name="logout" size={size} color={focused ? '#7cc' : '#ccc'} />
        )}
        onPress={() => signOut()}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  upperHalf: {
    height: windowHeight * 0.3,
    width: '100%',
    backgroundColor: '#18A558',
    borderTopWidth: 0,
    borderColor: '#18A558',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  id: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    margin: 10,
  }
});
export default withTheme(CustomDrawerContent);
