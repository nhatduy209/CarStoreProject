import React from 'react';
import HomeScreen from '../../../views/home-screen/HomeScreen';
import {Image, View, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '../../../views/profile/ProfileScreen';
import CartStack from '../../cart-stack/CartStack';
import StoreInfoScreen from '../../../views/store-screen/StoreInfoScreen';
import CalendarScreen from '../../../views/calendar-screen/CalendarScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
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

const NavigationStackStructureLeft = props => {
  //Structure for the navigatin Drawer

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity
        style={{marginLeft: 20}}
        onPress={() => props.navigationProps.navigate('Home')}>
        {/*Donute Button Image */}
        <Icon name="arrow-left" size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default class HomeScreenStack extends React.Component {
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
          name="Home"
          component={HomeScreen}
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
          name="StoreInfoScreen"
          component={StoreInfoScreen}
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
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            title: 'Profile',
          }}
        />

        <Stack.Screen
          name="CartStack"
          component={CartStack}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="CalendarScreen"
          component={CalendarScreen}
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
