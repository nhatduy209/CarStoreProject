import React from 'react';
import {Image, View, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import UpsertItemScreen from '../../../views/item-screens/manage-item/UpsertItemScreen';
import AddImageItemScreen from '../../../views/item-screens/manage-item/AddImageItemScreen';
import ManageItemsScreen from '../../../views/item-screens/manage-item/ManageItemsScreen';
const Stack = createStackNavigator();

const NavigationDrawerStructureLeft = props => {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.openDrawer();
  };
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={toggleDrawer}>
        {/*Donute Button Image */}
        <Image
          source={require('../../../images/drawer.png')}
          style={{width: 25, height: 25, marginLeft: 5}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default class ManageItemScreenStack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortUpOption: false,
    };
  }
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="ManageItemsScreen"
          component={ManageItemsScreen}
          options={{
            headerShown: false,
            title: '',
            headerLeft: () => (
              <NavigationDrawerStructureLeft
                navigationProps={this.props.navigation}
              />
            ),
          }}
        />
        <Stack.Screen
          name="UpsertItemScreen"
          component={UpsertItemScreen}
          options={{
            headerShown: false,
            title: '',
          }}
        />
        <Stack.Screen
          name="AddImageItemScreen"
          component={AddImageItemScreen}
          options={{
            headerShown: false,
            title: '',
          }}
        />
      </Stack.Navigator>
    );
  }
}
