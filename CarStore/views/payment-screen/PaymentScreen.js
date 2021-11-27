import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import HeaderComponent from '../headerComponent';
import {ScrollView} from 'react-native-gesture-handler';
import AppText from '../../i18/AppText';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class PaymentScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{backgroundColor: '#fff'}}>
        <HeaderComponent
          navigation={this.props.navigation}
          screenTitle={'Payment'}
        />
        <ScrollView
          style={{backgroundColor: '#fff', height: '100%', paddingTop: 60}}>
          <View style={styles.paymentContainer}>
            {/* car info */}
            <View style={styles.carInfoContainer}>
              <Image
                style={{
                  width: '90%',
                  height: 200,
                  borderRadius: 20,
                  alignSelf: 'center',
                  marginBottom: 20,
                }}
                source={{
                  uri: 'https://media-cdn.laodong.vn/Storage/NewsPortal/2019/6/10/738354/595097.jpg',
                }}
              />
              <AppText
                style={[styles.carInfo, styles.shadowBox]}
                //   i18nKey={'Name'}
              >
                Xe này xe dì xịn quá
              </AppText>
              <AppText
                style={[styles.carInfo, styles.shadowBox, {marginTop: 20}]}
                //   i18nKey={'Category'}
              >
                Loại này hong biết
              </AppText>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignSelf: 'center',
                  alignItems: 'center',
                  width: '100%',
                  marginVertical: 8,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <AppText
                    style={[styles.textStyle, {marginRight: 12}]}
                    // i18nKey={'Color: '}
                  >
                    Color:{' '}
                  </AppText>
                  <View
                    style={{
                      backgroundColor: '#2dc937',
                      borderRadius: 25,
                      height: 50,
                      width: 50,
                    }}
                  />
                </View>
                <AppText
                  style={styles.textStyle}
                  //   i18nKey={'price: $120000'}
                >
                  price: $120000
                </AppText>
              </View>
            </View>

            {/* user info */}
            <View style={[styles.userInfoContainer, styles.shadowBox]}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={{
                    height: 70,
                    width: 70,
                    borderRadius: 10,
                    borderColor: '#aaa',
                    borderWidth: 5,
                    resizeMode: 'cover',
                  }}
                  source={{
                    uri: 'https://media-cdn.laodong.vn/Storage/NewsPortal/2019/6/10/738354/595097.jpg',
                  }}
                />
                <AppText
                  style={{marginLeft: 12, color: '#fff', fontSize: 20}}
                  //   i18nKey={'price: $120000'}
                >
                  Trần Nhất Duy
                </AppText>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  name="envelope"
                  size={20}
                  color={'#fff'}
                  style={{marginRight: 12}}
                />
                <AppText
                  style={{
                    marginVertical: 12,
                    color: '#fff',
                    fontSize: 16,
                  }}
                  //   i18nKey={'price: $120000'}
                >
                  Trần Nhất Duy@gmail.com
                </AppText>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  name="map"
                  size={20}
                  color={'#fff'}
                  style={{marginRight: 12}}
                />
                <AppText
                  style={{
                    marginVertical: 12,
                    color: '#fff',
                    fontSize: 16,
                  }}
                  //   i18nKey={'price: $120000'}
                >
                  1 Đ. Võ Văn Ngân, Linh Chiểu, Thành Phố Thủ Đức, Thành phố Hồ
                  Chí Minh
                </AppText>
              </View>
            </View>

            {/* admin info */}
            <View style={[styles.userInfoContainer, styles.shadowBox]}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={{
                    height: 70,
                    width: 70,
                    borderRadius: 10,
                    borderColor: '#aaa',
                    borderWidth: 5,
                    resizeMode: 'cover',
                  }}
                  source={{
                    uri: 'https://media-cdn.laodong.vn/Storage/NewsPortal/2019/6/10/738354/595097.jpg',
                  }}
                />
                <AppText
                  style={{marginLeft: 12, color: '#fff', fontSize: 20}}
                  //   i18nKey={'price: $120000'}
                >
                  Trần Nhất Duy
                </AppText>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  name="envelope"
                  size={20}
                  color={'#fff'}
                  style={{marginRight: 12}}
                />
                <AppText
                  style={{
                    marginVertical: 12,
                    color: '#fff',
                    fontSize: 16,
                  }}
                  //   i18nKey={'price: $120000'}
                >
                  Trần Nhất Duy@gmail.com
                </AppText>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  name="map"
                  size={20}
                  color={'#fff'}
                  style={{marginRight: 12}}
                />
                <AppText
                  style={{
                    marginVertical: 12,
                    color: '#fff',
                    fontSize: 16,
                  }}
                  //   i18nKey={'price: $120000'}
                >
                  1 Đ. Võ Văn Ngân, Linh Chiểu, Thành Phố Thủ Đức, Thành phố Hồ
                  Chí Minh
                </AppText>
              </View>
            </View>
            <AppText
              style={[
                styles.carInfo,
                styles.shadowBox,
                {backgroundColor: '#011f4b', marginTop: 20, marginBottom: 60},
              ]}
              //   i18nKey={'price: $120000'}
            >
              Confirm Payment
            </AppText>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  paymentContainer: {
    display: 'flex',
    padding: 20,
  },
  textStyle: {
    color: 'rgb(32,45,70)',
    fontSize: 20,
    fontWeight: '700',
  },
  shadowBox: {
    shadowColor: '#000',
    shadowOffset: {width: 10, height: 12},
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 8,
  },
  userInfoContainer: {
    marginTop: 12,
    backgroundColor: '#7289da',
    borderRadius: 20,
    padding: 24,
  },
  carInfoContainer: {},
  carInfo: {
    // borderRadius: 30,
    // borderWidth: 2.5,
    // borderColor: '#f0f0f0',
    // paddingVertical: 16,
    // paddingHorizontal: 28,
    // fontSize: 20,
    // fontWeight: '700',
    // marginVertical: 8,
    // color: 'rgb(32,45,70)',
    color: '#fff',
    fontSize: 20,
    padding: 16,
    textAlign: 'center',
    borderRadius: 30,
    backgroundColor: '#7289da',
  },
});
