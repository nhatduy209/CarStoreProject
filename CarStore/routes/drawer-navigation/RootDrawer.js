import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import HomeScreen from '../../views/home-screen/HomeScreen';
import StoreInfoScreen from '../../views/StoreInfoScreen';
import ManageItemsScreen from '../../views/item-screens/manage-item/ManageItemsScreen';
import { View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import CircleTransition from 'react-native-circle-reveal-view'
import DrawerContent from './DrawerContent'

const Drawer = createDrawerNavigator();

export default class RootDrawer extends React.Component {

  render() {
    return (
      <Drawer.Navigator
      screenOptions={{drawerStyle:{borderTopRightRadius:20,borderBottomRightRadius:20,backgroundColor:'rgb(32,45,70)'}}}
      drawerContent={(props)=><DrawerContent {...props}></DrawerContent>}>
        <Drawer.Screen
          options={{
           headerShown : false,
          }}
          name="HomeScreen"
          component={HomeScreen} />
          <Drawer.Screen
          options={{
           headerShown : false,
          }}
          name="StoreInfoScreen"
          component={StoreInfoScreen} />
          <Drawer.Screen
          options={{
           headerShown : false,
          }}
          name="ManageItemsScreen"
          component={ManageItemsScreen} />
      </Drawer.Navigator>
    );
  }
}
