import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
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
      this.props.navigation.goBack();
      this.props.setStatusDefault();
    } else {
      console.log('fail');
    }
  }
  render() {
    const {bookingDetail} = this.props.route.params;
    return (
      <View style={{backgroundColor: '#f2f2f2'}}>
        <HeaderComponent
          navigation={this.props.navigation}
          screenTitle={'Payment'}
        />
        <ScrollView style={{height: '100%'}}>
          <Image
            style={{
              width: '100%',
              height: 420,
              borderRadius: 210,
              marginRight: -100,
              marginTop: -100,
              marginBottom: 12,
              alignSelf: 'flex-end',
              borderColor: '#ffc100',
              borderWidth: 16,
            }}
            source={{
              uri: bookingDetail.car_booking?.image ?? defaultUrl,
            }}
          />
          {/* car info */}
          <View
            style={{position: 'absolute', top: 100, left: 20, width: '50%'}}>
            <AppText
              style={[styles.carInfo, styles.shadowBox]}
              //   i18nKey={'Name'}
            >
              {bookingDetail.car_booking?.car_name ?? 'null nè'}
            </AppText>
            <AppText
              style={[styles.carInfo, styles.shadowBox, {marginTop: 12}]}
              //   i18nKey={'Category'}
            >
              {bookingDetail.car_booking?.category ?? 'null nè'}
            </AppText>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '80%',
                alignItems: 'center',
                marginVertical: 8,
                borderRadius: 30,
              }}>
              <View
                style={{
                  backgroundColor: '#2dc937',
                  borderRadius: 25,
                  height: 40,
                  width: 40,
                }}
              />
              <AppText
                style={[styles.carInfo, styles.shadowBox]}
                //   i18nKey={'price: $120000'}
              >
                ${bookingDetail.car_booking?.price ?? 'null nè'}
              </AppText>
            </View>
          </View>
          <View style={[styles.paymentContainer, {marginLeft: 20}]}>
            {/* user info */}
            <View
              style={[
                styles.userInfoContainer,
                styles.shadowBox,
                {
                  backgroundColor: '#0f293c',
                  flexDirection: 'row',
                  alignItems: 'center',
                },
              ]}>
              <Image
                style={{
                  height: 90,
                  width: 90,
                  borderRadius: 10,
                  borderColor: '#aaa',
                  borderWidth: 5,
                  resizeMode: 'cover',
                }}
                source={{
                  uri: 'https://media-cdn.laodong.vn/Storage/NewsPortal/2019/6/10/738354/595097.jpg',
                }}
              />
              <View style={{marginLeft: 12}}>
                <AppText
                  style={{marginLeft: 12, color: '#fff', fontSize: 20}}
                  //   i18nKey={'price: $120000'}
                >
                  {bookingDetail.full_name}
                </AppText>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 8,
                    marginTop: 16,
                  }}>
                  <Icon
                    name="envelope"
                    size={20}
                    color={'#fff'}
                    style={{marginRight: 12}}
                  />
                  <AppText
                    style={{
                      color: '#fff',
                      fontSize: 16,
                    }}
                    //   i18nKey={'price: $120000'}
                  >
                    {bookingDetail.clients_email}
                  </AppText>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 8,
                    marginTop: 16,
                  }}>
                  <Icon
                    name="phone"
                    size={20}
                    color={'#fff'}
                    style={{marginRight: 12}}
                  />
                  <AppText
                    style={{
                      color: '#fff',
                      fontSize: 16,
                      width: '85%',
                    }}
                    //   i18nKey={'price: $120000'}
                  >
                    {bookingDetail.phone_number}
                  </AppText>
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
                  flexDirection: 'row',
                  alignItems: 'center',
                },
              ]}>
              <Image
                style={{
                  height: 90,
                  width: 90,
                  borderRadius: 10,
                  borderColor: '#eee',
                  borderWidth: 5,
                  resizeMode: 'cover',
                }}
                source={{
                  uri: this.props.user.image,
                }}
              />
              <View style={{marginLeft: 12}}>
                <AppText
                  style={{marginLeft: 12, fontSize: 20, color: '#fff'}}
                  //   i18nKey={'price: $120000'}
                >
                  {this.props.user.name}
                </AppText>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 8,
                    marginTop: 16,
                  }}>
                  <Icon
                    name="envelope"
                    size={20}
                    style={{marginRight: 12, color: '#fff'}}
                  />
                  <AppText
                    style={{
                      fontSize: 16,
                      color: '#fff',
                    }}
                    //   i18nKey={'price: $120000'}
                  >
                    {this.props.user.email}
                  </AppText>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 8,
                    marginTop: 16,
                  }}>
                  <Icon
                    name="map"
                    size={20}
                    style={{marginRight: 12, color: '#fff'}}
                  />
                  <AppText
                    style={{
                      fontSize: 16,
                      width: '70%',
                      color: '#fff',
                    }}
                    //   i18nKey={'price: $120000'}
                  >
                    {this.props.user.phoneNum}
                  </AppText>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={this.createPayment}>
            <AppText
              style={[
                styles.carInfo,
                styles.shadowBox,
                {
                  marginBottom: 20,
                  width: '80%',
                  textAlign: 'center',
                  alignSelf: 'center',
                  backgroundColor: '#0f293c',
                  color: '#fff',
                  fontSize: 20,
                },
              ]}
              //   i18nKey={'price: $120000'}
            >
              Confirm Payment
            </AppText>
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
  },
  carInfoContainer: {},
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
