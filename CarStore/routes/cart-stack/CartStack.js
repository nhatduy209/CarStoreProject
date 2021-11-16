/* eslint-disable prettier/prettier */
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import CartScreen from '../../views/cart-screen/CartScreen';
import BookingScreen from '../../views/booking-screen/BookingScreen';
const Stack = createStackNavigator();

const NavigationStackStructureLeft = props => {
  //Structure for the navigatin Drawer

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity
        style={{marginLeft: 20}}
        onPress={() => props.navigationProps.goBack()}>
        {/*Donute Button Image */}
        <Icon name="arrow-left" size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default class CartStack extends React.Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="CartScreen"
          component={CartScreen}
          options={{
            title: '',
            headerLeft: () => (
              <NavigationStackStructureLeft
                navigationProps={this.props.navigation}
              />
            ),
          }}
        />
        <Stack.Screen
          name="BookingScreen"
          component={BookingScreen}
          options={{
            title: '',
            headerLeft: () => (
              <NavigationStackStructureLeft
                navigationProps={this.props.navigation}
              />
            ),
          }}
        />
      </Stack.Navigator>
    );
  }
}
