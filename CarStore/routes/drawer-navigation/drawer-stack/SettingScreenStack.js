import React from 'react';
import {Image, View, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import SettingScreen from '../../../views/setting-screen/SettingScreen';
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
          name="SettingScreen"
          component={SettingScreen}
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
      </Stack.Navigator>
    );
  }
}
