import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import HomeScreen from '../../views/home-screen/HomeScreen';
import { View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import CircleTransition from 'react-native-circle-reveal-view'

const Drawer = createDrawerNavigator();



export default class RootDrawer extends React.Component {

  render() {
    return (
      <Drawer.Navigator>
        <Drawer.Screen
          options={{
           headerShown : false,
          }}
          name="HomeScreen"
          component={HomeScreen} />
      </Drawer.Navigator>
    );
  }
}

