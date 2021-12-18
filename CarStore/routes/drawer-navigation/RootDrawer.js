import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import DrawerContent from './DrawerContent';
import HomeScreenStack from './drawer-stack/HomeScreenStack';
import ManageItemScreenStack from './drawer-stack/ManageITemScreenStack';
import SettingScreenStack from './drawer-stack/SettingScreenStack';
import StatisticScreen from '../../views/statistic-screen/StatictisScreen';
import PaymentScreen from '../../views/payment-screen/PaymentScreen';
import StoreInfoScreen from '../../views/store-screen/StoreInfoScreen';
const Drawer = createDrawerNavigator();

export default class RootDrawer extends React.Component {
  render() {
    return (
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            backgroundColor: 'rgb(32,45,70)',
          },
        }}
        drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen
          options={{
            headerShown: false,
          }}
          name="HomeScreenStack"
          component={HomeScreenStack}
        />
        <Drawer.Screen
          options={{
            headerShown: false,
          }}
          name="StoreInfoScreen"
          component={StoreInfoScreen}
        />
        <Drawer.Screen
          options={{
            headerShown: false,
          }}
          name="ManageItemScreenStack"
          component={ManageItemScreenStack}
        />
        <Drawer.Screen
          options={{
            headerShown: false,
          }}
          name="SettingScreenStack"
          component={SettingScreenStack}
        />
        <Drawer.Screen
          options={{
            headerShown: false,
          }}
          name="StatisticScreen"
          component={StatisticScreen}
        />
        <Drawer.Screen
          options={{
            headerShown: false,
          }}
          name="PaymentScreen"
          component={PaymentScreen}
        />
      </Drawer.Navigator>
    );
  }
}
