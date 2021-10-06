import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'react-moment';
import {connect} from 'react-redux';
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
    };
  }

  handleSelect = item => {
    console.log('COUNTRY SELECTED ----', item);
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
    this.setState({date: currentDate, isCalendarVisibleBirthday: false});
  };

  showDatepicker = () => {
    this.setState({isCalendarVisible: true});
  };

  showBirthdayPicker = () => {
    this.setState({isCalendarVisibleBirthday: true});
  };

  handleSubmit = () => {
    console.log('------------------------', this.state.personalID);
  };
  render() {
    const birthday = new Date(this.state.birthday);
    const {email, phoneNum} = this.props.user.data;
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 23, marginTop: 20}}>
          Booking an Appointment
        </Text>
        <Text style={{fontSize: 16, marginTop: 10}}>
          Serving you is our pleasure , please fill in some information below
        </Text>

        <View
          style={{
            borderBottomColor: '#cccccc',
            borderBottomWidth: 1.5,
            marginTop: 10,
            marginBottom: 20,
          }}
        />

        <ScrollView>
          <View style={styles.inputView}>
            <Text style={styles.textInfo}>Email Contact</Text>
            <TextInput
              style={styles.inputInfo}
              value={email}
              editable={false}
            />
          </View>

          <View style={styles.inputView}>
            <Text style={styles.textInfo}>Full name</Text>
            <TextInput style={styles.inputInfo} />
          </View>

          <View style={styles.inputView}>
            <Text style={styles.textInfo}>Country</Text>
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
            <Text style={styles.textInfo}>Your birthday</Text>
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
            <Text style={styles.textInfo}>Personal ID</Text>
            <TextInput
              style={styles.inputInfo}
              onChangeText={value => this.setState({personalID: value})}
            />
          </View>

          <View style={styles.inputView}>
            <Text style={styles.textInfo}>Phone number</Text>
            <TextInput
              style={styles.inputInfo}
              value={phoneNum}
              onChangeText={value => this.setState({phoneNum: value})}
            />
          </View>

          <View style={styles.inputView}>
            <Text style={styles.textInfo}>Pick contact date</Text>
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
              <TouchableOpacity>
                <Text style={styles.txtButton}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.UserReducer.user.data,
  };
}
export default connect(mapStateToProps, {})(BookingScreen);

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
});
