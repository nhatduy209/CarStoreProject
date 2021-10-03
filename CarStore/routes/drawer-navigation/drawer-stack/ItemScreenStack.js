/* eslint-disable prettier/prettier */
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react'
import AllItemsScreen from '../../../views/item-screens/AllItemsScreen';
import DetailItemScreen from '../../../views/item-screens/DetailItemScreen';
import { Image, View, TouchableOpacity, StyleSheet,Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import TabBar from '../../TabBar';
const Stack = createStackNavigator();

const NavigationDrawerStructureLeft = props => {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.openDrawer();
  };
  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={toggleDrawer}>
        {/*Donute Button Image */}
        <Image
          source={require('../../../images/drawer.png')}
          style={{ width: 25, height: 25, marginLeft: 5 }}
        />
      </TouchableOpacity>
    </View>
  );
};



export default class ItemScreenStack extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sortUpOption: false
    }

  }
  render() {
    return (
        <Stack.Navigator >
      <Stack.Screen
        name="AllItemsScreen"
        component={AllItemsScreen}   
        options={{
            headerShown: false,
            title:'',
          headerLeft: ()=>
            <NavigationDrawerStructureLeft
              navigationProps={this.props.navigation}
            />
        }}
      />
      <Stack.Screen
        name="DetailItemScreen"
        component={DetailItemScreen}   
        options={{
            headerShown: false,
            title:'',
          headerLeft: ()=>
            <NavigationDrawerStructureLeft
              navigationProps={this.props.navigation}
            />
        }}
      />
      </Stack.Navigator>
    );
  }

}


const styles = StyleSheet.create({
})