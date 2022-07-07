import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'react-moment';
import {connect} from 'react-redux';
import {
  createBooking,
  changeShowModalState,
} from '../../redux/action/booking/BookingAction';
import AppText from '../../i18/AppText';
import {handleValidate} from '../../common/Utils';
import {showToastFail} from '../../common/Utils';
import io from 'socket.io-client';
import {ngrokUrl} from '../../config/URL';

const socket = io(ngrokUrl, {
  transports: ['websocket'],
});

class BookingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countryVisible: false,
      country: 'Vietnam',
      countryCode: 'VN',
      isCalendarVisible: false,
      isCalendarVisibleBirthday: false,
      date: new Date(),
      birthday: this.props.user.data.birthday,
      phoneNum: this.props.user.data.phoneNum,
      email: this.props.user.data.email,
      personalID: '',
      selectedCar: this.props.cart.data[0],
      fullName: '',
    };
    this.arrayCheck = [];
  }

  componentDidMount() {
    socket.on('connection', con => {
      console.debug('SOCKET: connected to socket server', con);
    });
  }

  handleSelect = item => {
    this.setState({country: item.name, countryCode: item.cca2});
  };

  onChange = (event, selectedDate) => {
    const date = new Date();
    const currentDate = selectedDate || date;
    this.setState({date: currentDate, isCalendarVisible: false});
  };

  onChangeBirthday = (event, selectedDate) => {
    const date = new Date();
    const currentDate = selectedDate || date;
    this.setState({birthday: currentDate, isCalendarVisibleBirthday: false});
  };

  showDatepicker = () => {
    this.setState({isCalendarVisible: true});
  };

  showBirthdayPicker = () => {
    this.setState({isCalendarVisibleBirthday: true});
  };

  handleSubmit = () => {
    let count = 0;
    const data = {
      full_name: this.state.fullName,
      clients_email: this.state.email,
      country: this.state.country,
      birthday: this.state.birthday,
      personal_id: this.state.personalID,
      phone_number: this.state.phoneNum,
      date_meeting: this.state.date,
      car_booking: {
        car_name: this.state.selectedCar.car_name,
        prices: this.state.selectedCar.price,
        color: this.state.selectedCar.color,
        category: this.state.selectedCar.category,
        image: this.state.selectedCar.car_img,
      },
    };
    const checkDate = {
      full_name: this.state.fullName,
      clients_email: this.state.email,
      country: this.state.country,
      birthday: this.state.birthday,
      personal_id: this.state.personalID,
      phone_number: this.state.phoneNum,
    };
    this.arrayCheck = handleValidate(checkDate);
    this.arrayCheck.map(item => {
      if (!item.isCorrect) {
        showToastFail(
          'Error',
          'All data must be filled in , please check again',
        );
        return;
      } else {
        count++;
      }
    });

    if (count === this.arrayCheck.length) {
      this.props.createBooking({data});
      console.log('HI');
      socket.emit('booking_from_client', {
        data: data,
      });
    }
  };
  handleModalButton = () => {
    return this.props.booking.STATUS_BOOKING === 'SUCCESS' ? 'OK' : ' Close';
  };
  handleCloseModal = () => {
    this.props.navigation.navigate('Home');
    this.props.changeShowModalState();
  };
  render() {
    console.log('?');
    const birthday = new Date(this.state.birthday);
    const {email, phoneNum} = this.props.user.data;
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.booking.showModal}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{this.props.booking.message}</Text>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.handleCloseModal()}>
                <Text style={styles.textStyle}>{this.handleModalButton()}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <AppText
          style={{fontSize: 23, marginTop: 20}}
          i18nKey={'bookingAnAppointment'}
        />
        <AppText
          style={{fontSize: 16, marginTop: 10}}
          i18nKey={'bookingPleasure'}
        />

        <View
          style={{
            borderBottomColor: '#cccccc',
            borderBottomWidth: 1.5,
            marginTop: 10,
            marginBottom: 20,
          }}
        />

        <ScrollView keyboardDismissMode="on-drag">
          <View style={styles.inputView}>
            <AppText style={styles.textInfo} i18nKey={'emailContact'} />
            <TextInput
              style={styles.inputInfo}
              value={email}
              editable={false}
            />
          </View>

          <View style={styles.inputView}>
            <AppText style={styles.textInfo} i18nKey={'chooseYourCar'} />
            <Picker
              mode="dropdown"
              selectedValue={this.state.selectedCar}
              onValueChange={(itemValue, itemIndex) => {
                console.log('ITEM VALUE __', itemValue);
                this.setState({selectedCar: itemValue});
              }}>
              {this.props.cart.data.map((item, index) => {
                const carSelected = item.car_name + ' (' + item.color + ')';
                return <Picker.Item label={carSelected} value={item} />;
              })}
            </Picker>
          </View>

          <View style={styles.inputView}>
            <AppText style={styles.textInfo} i18nKey={'fullName'} />
            <TextInput
              onChangeText={value => this.setState({fullName: value})}
              style={styles.inputInfo}
              blurOnSubmit={false}
            />
          </View>

          <View style={styles.inputView}>
            <AppText style={styles.textInfo} i18nKey={'country'} />
            <TouchableOpacity
              onPress={() => this.setState({countryVisible: true})}>
              <View
                style={{
                  ...styles.inputInfo,
                  justifyContent: 'center',
                }}>
                <CountryPicker
                  {...{
                    countryCode: this.state.countryCode,
                    withCountryNameButton: this.state.country,
                    withFilter: true,
                    withFlag: true,
                    onSelect: this.handleSelect,
                  }}
                  visible={this.state.countryVisible}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.inputView}>
            <AppText style={styles.textInfo} i18nKey={'yourbirthday'} />
            <View
              style={{
                ...styles.inputInfo,
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    isCalendarVisibleBirthday: true,
                  })
                }>
                <Moment date={birthday} format="DD/MM/YYYY" element={Text} />
              </TouchableOpacity>
            </View>
            {this.state.isCalendarVisibleBirthday && (
              <DateTimePicker
                testID="dateTimePicker"
                value={new Date()}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={this.onChangeBirthday}
                maximumDate={new Date()}
              />
            )}
          </View>

          <View style={styles.inputView}>
            <AppText style={styles.textInfo} i18nKey={'PersonalID'} />
            <TextInput
              style={styles.inputInfo}
              onChangeText={value => this.setState({personalID: value})}
            />
          </View>

          <View style={styles.inputView}>
            <AppText style={styles.textInfo} i18nKey={'PhoneNumber'} />
            <TextInput
              style={styles.inputInfo}
              value={phoneNum}
              onChangeText={value => this.setState({phoneNum: value})}
            />
          </View>

          <View style={styles.inputView}>
            <AppText style={styles.textInfo} i18nKey={'pickContactDate'} />
            <View
              style={{
                ...styles.inputInfo,
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => this.setState({isCalendarVisible: true})}>
                <Moment
                  date={this.state.date}
                  format="DD/MM/YYYY"
                  element={Text}
                />
              </TouchableOpacity>
            </View>
            {this.state.isCalendarVisible && (
              <DateTimePicker
                testID="dateTimePicker"
                value={new Date()}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={this.onChange}
                minimumDate={new Date()}
              />
            )}
          </View>

          <View
            style={{
              flexDirection: 'row',
              height: 50,
              marginVertical: 10,
            }}>
            <View
              style={{
                ...styles.btnButton,
                backgroundColor: '#26B2D5',
                width: '47%',
                marginRight: 10,
              }}>
              <TouchableOpacity onPress={this.handleSubmit}>
                <Text
                  style={{
                    ...styles.txtButton,
                    color: '#ffffff',
                  }}>
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                ...styles.btnButton,
                borderWidth: 0.5,
                backgroundColor: '#ffffff',
                flex: 1,
              }}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <AppText style={styles.txtButton} i18nKey={'Cancel'} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.UserReducer.user.data,
    cart: state.CartReducer.cart,
    booking: state.BookingReducer,
  };
};
export default connect(mapStateToProps, {createBooking, changeShowModalState})(
  BookingScreen,
);

const styles = new StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
  },
  textInfo: {
    fontSize: 15,
    color: '#bbbbbb',
    marginBottom: 10,
  },
  inputInfo: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 15,
    paddingHorizontal: 30,
    height: 45,
  },
  inputView: {
    marginVertical: 5,
  },
  btnButton: {
    alignItems: 'center',
    borderRadius: 20,
    justifyContent: 'center',
  },
  txtButton: {
    fontSize: 20,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
  },
});
