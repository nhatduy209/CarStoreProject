import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CalendarScreen from '../../views/calendar-screen/CalendarScreen';
import BookingDetailScreen from '../../views/booking-screen/BookingDetailScreen';
import PaymentScreen from '../../views/payment-screen/PaymentScreen';
const Stack = createStackNavigator();

export default class CalendarStack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortUpOption: false,
    };
  }
  render() {
    return (
      <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
        <Stack.Screen
          name="CalendarScreen"
          component={CalendarScreen}
          options={{
            title: 'Appointment',
          }}
        />

        <Stack.Screen
          name="BookingDetailScreen"
          component={BookingDetailScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="PaymentScreen"
          component={PaymentScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  }
}
