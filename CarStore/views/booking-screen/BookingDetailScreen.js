import React from 'react';
import {View, Text} from 'react-native';
export default class BookingDetailScreen extends React.Component {
  render() {
    const {booking} = this.props.route.params;
    console.log('BOOKING DETAILS', booking);
    return (
      <View>
        <Text> Booking details </Text>
      </View>
    );
  }
}
