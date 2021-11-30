import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import HeaderComponent from '../headerComponent';
import {ScrollView} from 'react-native-gesture-handler';
import AppText from '../../i18/AppText';
import {connect} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  createPayment,
  setStatusDefault,
} from '../../redux/action/payment-action/Payment';
import Icon from 'react-native-vector-icons/FontAwesome';
const defaultUrl =
  'https://media-cdn.laodong.vn/Storage/NewsPortal/2019/6/10/738354/595097.jpg';
class PaymentScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  createPayment = () => {
    const {bookingDetail} = this.props.route.params;
    const data = {
      client: {
        name: bookingDetail?.full_name ?? '',
        address: bookingDetail?.address ?? 'adbxyz',
        email: bookingDetail?.email ?? 'testing@gmail.com',
        personal_id: bookingDetail?.personal_id ?? '12412411',
      },
      car: {
        name: bookingDetail?.car_booking?.car_name ?? 'CAMRY 2.0G',
        prices: bookingDetail?.car_booking?.price ?? 20000,
        color: bookingDetail?.car_booking?.color ?? 'black',
        category: bookingDetail?.car_booking?.category ?? 'Toyota',
        image: bookingDetail?.car_booking?.image ?? defaultUrl,
      },
      admin: {
        name: this.props.user.name,
        email: this.props.user.email,
        personal_id: '12412411',
      },
    };
    this.props.createPayment(data);
  };
  componentDidUpdate() {
    if (this.props.paymentStatus === 'SUCCESS') {
      console.log('success');
      this.props.navigation.navigate('CalendarScreen');
      this.props.setStatusDefault();
    } else {
      console.log('fail');
    }
  }
  render() {
    const {bookingDetail} = this.props.route.params;
    return (
      <View style={{backgroundColor: '#fff'}}>
        <HeaderComponent
          navigation={this.props.navigation}
          screenTitle={'Payment'}
        />
        <ScrollView style={{height: '100%'}}>
          <Image
            style={styles.carImage}
            source={{
              uri: bookingDetail.car_booking?.image ?? defaultUrl,
            }}
          />
          {/* car info */}
          <View
            style={{position: 'absolute', top: 100, left: 20, width: '50%'}}>
            <Text style={[styles.carInfo, styles.shadowBox]}>
              {bookingDetail.car_booking?.car_name ?? 'null nè'}
            </Text>
            <Text style={[styles.carInfo, styles.shadowBox, {marginTop: 12}]}>
              {bookingDetail.car_booking?.category ?? 'null nè'}
            </Text>
            <View style={styles.price_color}>
              <View
                style={{
                  backgroundColor: bookingDetail.car_booking?.color,
                  borderRadius: 25,
                  height: 40,
                  width: 40,
                }}
              />
              <Text style={[styles.carInfo, styles.shadowBox]}>
                ${bookingDetail.car_booking?.prices ?? 'null nè'}
              </Text>
            </View>
          </View>

          <View style={[styles.paymentContainer]}>
            {/* user info */}
            <View
              style={[
                styles.userInfoContainer,
                styles.shadowBox,
                {
                  backgroundColor: '#0f293c',
                },
              ]}>
              <Image
                style={styles.avatar}
                source={{
                  uri: bookingDetail.image ?? defaultUrl,
                }}
              />
              <View style={{marginLeft: 12}}>
                <Text style={{marginLeft: 12, color: '#fff', fontSize: 20}}>
                  {bookingDetail.full_name}
                </Text>
                <View style={styles.rowInfo}>
                  <Icon name="envelope" style={styles.iconStyle} />
                  <Text style={styles.infoText}>
                    {bookingDetail.clients_email}
                  </Text>
                </View>
                <View style={styles.rowInfo}>
                  <Icon name="phone" style={styles.iconStyle} />
                  <Text style={styles.infoText}>
                    {bookingDetail.phone_number}
                  </Text>
                </View>
              </View>
            </View>

            {/* admin info */}
            <View
              style={[
                styles.userInfoContainer,
                styles.shadowBox,
                {
                  backgroundColor: '#f56701',
                  marginTop: 30,
                },
              ]}>
              <Image
                style={styles.avatar}
                source={{
                  uri: this.props.user.image,
                }}
              />
              <View style={{marginLeft: 12}}>
                <Text style={{marginLeft: 12, fontSize: 20, color: '#fff'}}>
                  {this.props.user.name}
                </Text>
                <View style={styles.rowInfo}>
                  <Icon name="envelope" style={styles.iconStyle} />
                  <Text style={styles.infoText}>{this.props.user.email}</Text>
                </View>
                <View style={styles.rowInfo}>
                  <Icon name="map" style={styles.iconStyle} />
                  <Text style={styles.infoText}>
                    {this.props.user.phoneNum}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity onPress={this.createPayment}>
            <AppText
              style={[styles.carInfo, styles.shadowBox, styles.confirmButton]}
              i18nKey={'Confirm'}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.UserReducer.user?.data?.data,
    paymentStatus: state.PaymentReducer?.status,
  };
};

export default connect(mapStateToProps, {createPayment, setStatusDefault})(
  PaymentScreen,
);
const styles = StyleSheet.create({
  paymentContainer: {
    display: 'flex',
    padding: 24,
  },
  textStyle: {
    color: 'rgb(32,45,70)',
    fontSize: 16,
    fontWeight: '700',
  },
  infoText: {
    color: '#fff',
    fontSize: 16,
  },
  rowInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginTop: 16,
  },
  iconStyle: {
    marginRight: 12,
    fontSize: 20,
    color: '#fff',
  },
  price_color: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    alignItems: 'center',
    marginVertical: 8,
    borderRadius: 30,
  },
  avatar: {
    height: 90,
    width: 90,
    borderRadius: 10,
    borderColor: '#eee',
    borderWidth: 5,
    resizeMode: 'cover',
  },
  carImage: {
    width: '110%',
    height: 300,
    marginRight: -120,
    alignSelf: 'flex-end',
    resizeMode: 'contain',
  },
  confirmButton: {
    marginBottom: 20,
    width: '80%',
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: '#0f293c',
    color: '#fff',
    fontSize: 20,
  },
  shadowBox: {
    shadowColor: '#000',
    shadowOffset: {width: 10, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 8,
  },
  userInfoContainer: {
    marginTop: 12,
    borderRadius: 20,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  carInfo: {
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 28,
    fontSize: 16,
    fontWeight: '700',
    marginVertical: 4,
    backgroundColor: '#f56701',
    color: '#fff',
  },
});
