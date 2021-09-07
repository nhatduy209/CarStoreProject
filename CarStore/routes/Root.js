import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../views/sign-up-sign-in/LoginScreen';
import SignUpScreen from '../views/sign-up-sign-in/SignUpScreen';
import ForgotPasswordScreen from '../views/sign-up-sign-in/ForgotPasswordScreen';
import ForgotPasswordCodeScreen from '../views/sign-up-sign-in/ForgotPasswordCodeScreen';
import ChangePasswordScreen from '../views/sign-up-sign-in/ChangePasswordScreen';
import Icon from 'react-native-vector-icons/FontAwesome5';
const Stack = createNativeStackNavigator();

export class Root extends React.Component {

  constructor(props) {
    super(props);
  }

  headerLeft = (props) => {
    return (
      <TouchableOpacity onPress = { () => props.props.navigation.navigate('LoginScreen')} >
        <View style={{ flexDirection: 'row', alignItems: 'center' , padding : 15}}>
        <Icon
              name="arrow-left"
              size={18}
              style = {{ marginRight : 10, color : "#00b3b3"}}
            ></Icon>
          <Text style={{ fontSize: 17, fontWeight: "900" , color : "#00b3b3"}}>
            Forgot password</Text>
        </View>
      </TouchableOpacity>

    )
  }

  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false
          }}
          name="LoginScreen" component={LoginScreen} />
          <Stack.Screen
          options={{
            headerShown: false
          }}
          name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen
          // options={{
          //   title: "",
          //   headerBackVisible : true,
          //   header : (props) => (
          //     <this.headerLeft props = {props} />
          //   ),
          // }}
          options={{
            headerShown: false
          }}
          name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
          <Stack.Screen
          options={{
            headerShown: false
          }}
          name="ForgotPasswordCodeScreen" component={ForgotPasswordCodeScreen} />
          <Stack.Screen
          options={{
            headerShown: false
          }}
          name="ChangePasswordScreen" component={ChangePasswordScreen} />
      </Stack.Navigator>
    )
  }
}