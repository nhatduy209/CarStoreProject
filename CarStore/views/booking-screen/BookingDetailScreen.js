import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import HeaderComponent from '../headerComponent';
import {connect} from 'react-redux';
import {
  confirmBooking,
  cancelBooking,
} from '../../redux/action/booking/BookingAction';
class BookingDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: true,
      descriptionText: '',
      textAction: '',
      textCancel: '',
    };
  }
  handleCancel = async params => {
    const data = {id_meeitng: params.id_meeting, email: params.clients_email};
    this.props.cancelBooking(data);
    this.props.navigation.goBack();
  };
  handleConfirm = async params => {
    const data = {id_meeitng: params.id_meeting, email: params.clients_email};
    this.props.confirmBooking(data);
    this.props.navigation.push('PaymentScreen', {
      bookingDetail: this.props.route.params.booking,
    });
  };
  fortmatDate = date => {
    return new Date(date).toISOString().slice(0, 10);
  };
  render() {
    const {booking} = this.props.route.params;
    return (
      <ScrollView>
        <HeaderComponent navigation={this.props.navigation} />
        <View style={styles.bodyContent}>
          <Text
            style={{
              fontSize: 36,
              fontWeight: '700',
              alignSelf: 'center',
              marginBottom: 30,
            }}>
            BOOKING DETAIL
          </Text>
          <Text style={styles.inputLabel}>Email contact</Text>
          <View style={styles.Input}>
            <Text style={{flex: 1, color: '#000'}}>
              {booking.clients_email}
            </Text>
          </View>
          <Text style={styles.inputLabel}>Car booking</Text>
          <View style={styles.Input}>
            <Text style={{flex: 1, color: '#000'}}>
              {booking.choosenCar ?? 'Xe của di'}
            </Text>
          </View>
          <Text style={styles.inputLabel}>Full name</Text>
          <View style={styles.Input}>
            <Text style={{flex: 1, color: '#000'}}>{booking.full_name}</Text>
          </View>
          <Text style={styles.inputLabel}>Country</Text>
          <View style={styles.Input}>
            <Text style={{flex: 1, color: '#000'}}>{booking.country}</Text>
          </View>
          <Text style={styles.inputLabel}>Birthday</Text>
          <View style={styles.Input}>
            <Text style={{flex: 1, color: '#000'}}>
              {this.fortmatDate(booking.birthday)}
            </Text>
          </View>
          <Text style={styles.inputLabel}>Personal ID</Text>
          <View style={styles.Input}>
            <Text style={{flex: 1, color: '#000'}}>{booking.personal_id}</Text>
          </View>
          <Text style={styles.inputLabel}>Phone number</Text>
          <View style={styles.Input}>
            <Text style={{flex: 1, color: '#000'}}>{booking.phone_number}</Text>
          </View>
          <Text style={styles.inputLabel}>Meeting date</Text>
          <View style={styles.Input}>
            <Text style={{flex: 1, color: '#000'}}>
              {this.fortmatDate(booking.date_meeting)}
            </Text>
          </View>
          <View style={styles.groupButton}>
            {this.props.user.data.role === 'admin' && (
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => this.handleConfirm(booking)}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#ffe',
                    textAlign: 'center',
                  }}>
                  Confirm Booking
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => this.handleCancel(booking)}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#ffe',
                  textAlign: 'center',
                }}>
                Cancel Booking
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.UserReducer.user.data,
  };
};

export default connect(mapStateToProps, {cancelBooking, confirmBooking})(
  BookingDetailScreen,
);

const styles = StyleSheet.create({
  bodyContent: {
    marginTop: 60,
    paddingHorizontal: 16,
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#323637',
    marginBottom: '2%',
  },
  Input: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '2%',
    height: 50,
  },
  editButton: {
    borderRadius: 10,
    backgroundColor: '#363b74',
    padding: 12,
    width: 120,
  },
  cancelButton: {
    borderRadius: 10,
    backgroundColor: '#ccc',
    padding: 12,
    width: 120,
  },
  groupButton: {
    justifyContent: 'space-around',
    width: '100%',
    flexDirection: 'row',
    marginVertical: 30,
  },
});
