import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import DrawerContent from './DrawerContent';
import HomeScreenStack from './drawer-stack/HomeScreenStack';
import StoreInfoScreen from '../../views/StoreInfoScreen';
import ManageItemsScreen from '../../views/item-screens/manage-item/ManageItemsScreen';

const Drawer = createDrawerNavigator();

export default class RootDrawer extends React.Component {
  render() {
    return (
      <Drawer.Navigator
      screenOptions={{drawerStyle:{borderTopRightRadius:20,borderBottomRightRadius:20,backgroundColor:'rgb(32,45,70)'}}}
      drawerContent={(props)=><DrawerContent {...props}></DrawerContent>}>
        <Drawer.Screen
          options={{
            headerShown: false,
          }}
          name="HomeScreenStack"
          component={HomeScreenStack}
        />
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
