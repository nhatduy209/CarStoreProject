import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import DrawerContent from './DrawerContent';
import HomeScreenStack from './drawer-stack/HomeScreenStack';

const Drawer = createDrawerNavigator();

export default class RootDrawer extends React.Component {
  render() {
    return (
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            backgroundColor: '#fff',
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
      </Drawer.Navigator>
    );
  }
}
