import React from 'react';
import {Image, View, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import UpsertItemScreen from '../../../views/item-screens/manage-item/UpsertItemScreen';
const Stack = createStackNavigator();

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
          name="UpsertItemScreen"
          component={UpsertItemScreen}
          options={{
            headerShown: false,
            title: '',
          }}
        />
      </Stack.Navigator>
    );
  }
}
