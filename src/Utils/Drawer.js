import React, {useContext} from 'react';
import {StyleSheet, View, Dimensions, Image} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AuthContext from '../Utils/LoginContext';

const windowHeight = Dimensions.get('window').height;

function CustomDrawerContent(props) {
  const {signOut} = useContext(AuthContext);
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.upperHalf}>
        <Image
          style={styles.logo}
          source={require('../assets/Logos/OpsLog_Logo_nbc.png')}
        />
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
});
export default CustomDrawerContent;
