import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import HeaderComponent from '../headerComponent';
import {connect} from 'react-redux';
import {
  confirmBooking,
  cancelBooking,
} from '../../redux/action/booking/BookingAction';
import AppText from '../../i18/AppText';
import Moment from 'react-moment';
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
    this.props.navigation.goBack();
  };
  fortmatDate = date => {
    return new Date(date).toISOString().slice(0, 10);
  };
  render() {
    const {booking} = this.props.route.params;
    console.log('HELLO --', booking);
    return (
      <ScrollView>
        <View
          style={{flex: 1, backgroundColor: '#f5f5f5', paddingHorizontal: 7}}>
          <HeaderComponent
            navigation={this.props.navigation}
            screenTitle="BOOKING DETAIL"
          />
          <View style={styles.panel}>
            <Image
              source={{uri: booking.car_booking.image}}
              style={{height: 200, width: 250}}
            />
          </View>

          <AppText i18nKey={'InfoUser'} style={styles.textStyle} />
          <View style={styles.groupInfo}>
            <View style={styles.info}>
              <AppText i18nKey={'Email'} style={styles.textInfo} />
              <Text> {booking.clients_email}</Text>
            </View>

            <View style={styles.info}>
              <AppText i18nKey={'FullName'} style={styles.textInfo} />
              <Text> {booking.full_name}</Text>
            </View>

            <View style={styles.info}>
              <AppText i18nKey={'Birthday'} style={styles.textInfo} />
              <Moment
                date={booking.birthday}
                format="DD/MM/YYYY"
                element={Text}
              />
            </View>

            <View style={styles.info}>
              <AppText i18nKey={'Country'} style={styles.textInfo} />
              <Text> {booking.country}</Text>
            </View>

            <View style={styles.info}>
              <AppText i18nKey={'Address'} style={styles.textInfo} />
              <Text numberOfLines={1} style={{width: 150}}>
                {' '}
                269 , Ha Duy Phien , ap 4a , xa Binh My , huyen Củ Chi , tp HCM{' '}
              </Text>
            </View>

            <View style={styles.info}>
              <AppText i18nKey={'PhoneNumber'} style={styles.textInfo} />
              <Text> {booking.phone_number}</Text>
            </View>

            <View style={styles.info}>
              <AppText i18nKey={'PersonalID'} style={styles.textInfo} />
              <Text> {booking.personal_id}</Text>
            </View>
          </View>

          <AppText i18nKey={'CarMeeting'} style={styles.textStyle} />
          <View style={styles.groupInfo}>
            <View style={styles.info}>
              <AppText i18nKey={'CarName'} style={styles.textInfo} />
              <Text> {booking.car_booking.car_name}</Text>
            </View>

            <View style={styles.info}>
              <AppText i18nKey={'Brand'} style={styles.textInfo} />
              <Text> {booking.car_booking.category}</Text>
            </View>

            <View style={styles.info}>
              <AppText i18nKey={'CarColor'} style={styles.textInfo} />
              <Text numberOfLines={1}>{booking.car_booking.color}</Text>
            </View>

            <View style={styles.info}>
              <AppText i18nKey={'Price'} style={styles.textInfo} />
              <Text> {booking.car_booking.prices}</Text>
            </View>
          </View>

          <AppText i18nKey={'MeetingInfo'} style={styles.textStyle} />
          <View style={styles.groupInfo}>
            <View style={styles.info}>
              <AppText i18nKey={'ID'} style={styles.textInfo} />
              <Text numberOfLines={1}>{booking.id_meeting}</Text>
            </View>

            <View style={styles.info}>
              <AppText i18nKey={'MeetingStatus'} style={styles.textInfo} />
              {booking.status_meeting ? (
                <AppText i18nKey={'Confirmed'} />
              ) : (
                <AppText i18nKey={'WaitingConfirm'} />
              )}
            </View>

            <View style={styles.info}>
              <AppText i18nKey={'DateMeeting'} style={styles.textInfo} />
              <Moment
                date={booking.date_meeting}
                format="DD/MM/YYYY"
                element={Text}
              />
            </View>
          </View>

          <View style={styles.groupButton}>
            {this.props.user.data.role === 'admin' && (
              <TouchableOpacity
                style={{...styles.Button, color: '#363b74'}}
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
              style={{...styles.Button, color: '#ccc'}}
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
  Button: {
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
  panel: {
    padding: 20,
    alignItems: 'center',
    marginVertical: 30,
  },
  groupInfo: {
    marginHorizontal: 5,
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderRadius: 7,
    marginBottom: 20,
    elevation: 2,
  },
  textStyle: {
    marginHorizontal: 5,
    color: '#bbbbbb',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  info: {
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  textInfo: {
    marginVertical: 8,
    fontWeight: 'bold',
  },
});
