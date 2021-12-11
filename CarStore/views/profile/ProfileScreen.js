import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'react-native-image-picker';
import Moment from 'react-moment';
import {
  changeInfo,
  reloađUpateStatus,
} from '../../redux/action/change-info/ChangeInfoAction';
import {STATUS} from '../../config/Status';
import {ProcessLoading} from '../modal/ProcessLoading';
import {showToastFail, showToastSuccess} from '../../common/Utils';
import AppText from '../../i18/AppText';

const avatarUrlDefault =
  'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg';
class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: this.props.user?.data?.image ?? avatarUrlDefault,
      phoneNum: this.props.user.data?.phone ?? 'Set your phone number',
      gender: this.props.user?.data?.gender ?? true, // true is male and false is female
      isCalendarVisible: false,
      date: this.props.user?.data?.birthday ?? new Date(),
      address: this.props.user?.data?.address ?? 'Set your address ',
      email: this.props.user?.data?.email ?? 'mail',
      name: this.props.user?.data?.name ?? 'Your name',
      loading: false,
    };
  }
  handlePhotos = () => {
    const Options = {};
    ImagePicker.launchImageLibrary(Options, response => {
      try {
        this.setState({url: response.assets[0].uri});
        this.setState({Avatar: response.assets[0].fileName});
        this.setState({PathImageDevice: response.assets[0].uri});
      } catch (err) {
        this.setState({PathImageDevice: ''});
      }
    });
  };

  handleReset = () => {
    this.setState({
      url: this.props.user?.data?.image ?? avatarUrlDefault,
      email: this.props.user.data.email,
      name: this.props.user.data.name,
      phoneNum: this.props.user.data?.phone ?? 'Set your phone number',
      gender: this.props.user.data.gender, // true is male and false is female
      isCalendarVisible: false,
      date: this.props.user.data.birthday,
      address: this.props.user?.data?.address ?? 'Set your address ',
      Avatar: null,
    });
  };
  handleSave = () => {
    console.log('---this.props.user.data--', this.props.user);
    // TODO TRAN THANH TOAN HANDLE SAVE INFO
    const data = {
      url: this.state.url,
      name: this.state.name,
      email: this.state.email,
      phoneNum: this.state.phoneNum,
      gender: this.state.gender, // true is male and false is female
      isCalendarVisible: this.state.isCalendarVisible,
      date: this.state.date,
      password: this.props.user.data.password,
      address: this.state.address,
    };
    this.props.changeInfo({data, Avatar: this.state.Avatar});
    this.setState({loading: true});
  };

  onChange = (event, selectedDate) => {
    const date = new Date();
    const currentDate = selectedDate || date;
    this.setState({date: currentDate, isCalendarVisible: false});
  };

  showDatepicker = () => {
    this.setState({isCalendarVisible: true});
  };

  handleGender = value => {
    if (value === 'male') {
      this.setState({gender: true});
    } else {
      this.setState({gender: false});
    }
  };
  componentDidUpdate() {
    if (this.props.updateStatus && this.props.updateStatus === STATUS.SUCCESS) {
      showToastSuccess('Success', 'Update info successfully');
      if (this.state.loading) {
        this.setState({loading: false});
      }
      this.props.reloađUpateStatus();
    } else if (this.props.updateStatus === STATUS.FAIL) {
      showToastFail('Fail', 'Update info fail');
    }
  }
  render() {
    const date = new Date(this.state.date);
    const isGender = this.state.gender
      ? {colorMale: '#4db8ff', colorFemale: '#bbbbbb'}
      : {colorMale: '#bbbbbb', colorFemale: 'pink'};
    return (
      <View style={styles.container}>
        <ProcessLoading visible={this.state.loading} />
        <View style={styles.avtImage}>
          <TouchableOpacity onPress={this.handlePhotos}>
            <Image
              style={{
                height: 130,
                width: 130,
                borderRadius: 70,
                position: 'absolute',
                alignSelf: 'center',
              }}
              source={{uri: this.state.url}}
            />
            <Icon size={24} name="camera" style={styles.cameraIcon} />
          </TouchableOpacity>
        </View>

        {/* View for detail info */}
        <ScrollView>
          <View>
            <View style={styles.detailInfo}>
              <AppText style={styles.textStyleTitle} i18nKey={'Email'} />
              <TextInput
                style={styles.textStyleData}
                onChangeText={value => {
                  this.setState({email: value});
                }}
                value={this.state.email}
                editable={false}
              />
            </View>

            <View style={styles.detailInfo}>
              <AppText style={styles.textStyleTitle} i18nKey={'FullName'} />
              <TextInput
                style={styles.textStyleData}
                onChangeText={value => {
                  this.setState({name: value});
                }}
                value={this.state.name}
              />
            </View>

            <View style={styles.detailInfo}>
              <AppText style={styles.textStyleTitle} i18nKey={'Birthday'} />
              <TouchableOpacity onPress={this.showDatepicker}>
                {/* <Text style={{ ...styles.textStyleData, paddingVertical: 10 }}> {setDate}</Text> */}
                <Moment
                  date={this.state.date}
                  format="DD/MM/YYYY"
                  element={Text}
                  style={{
                    ...styles.textStyleData,
                    paddingVertical: 10,
                  }}
                />
              </TouchableOpacity>
              {this.state.isCalendarVisible && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={this.onChange}
                />
              )}
            </View>

            <View style={styles.detailInfo}>
              <AppText style={styles.textStyleTitle} i18nKey={'PhoneNumber'} />
              <TextInput
                style={styles.textStyleData}
                onChangeText={value => {
                  this.setState({phoneNum: value});
                }}
                value={this.state.phoneNum}
              />
            </View>

            <View
              style={{
                ...styles.detailInfo,
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 20,
              }}>
              <AppText style={styles.textStyleTitle} i18nKey={'Gender'} />
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={{marginHorizontal: 20}}
                  onPress={() => this.handleGender('male')}>
                  <Icon name="male" size={35} color={isGender.colorMale} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.handleGender('female')}>
                  <Icon name="female" size={35} color={isGender.colorFemale} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.detailInfo}>
              <AppText style={styles.textStyleTitle} i18nKey={'Address'} />
              <TextInput
                style={styles.textStyleData}
                onChangeText={value => {
                  this.setState({address: value});
                }}
                value={this.state.address}
              />
            </View>
          </View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View style={styles.btnReset}>
              <TouchableOpacity onPress={this.handleReset}>
                <AppText style={{fontSize: 25, padding: 5}} i18nKey={'Reset'} />
              </TouchableOpacity>
            </View>

            <View style={styles.btnSave}>
              <TouchableOpacity onPress={this.handleSave}>
                <AppText
                  style={{
                    fontSize: 25,
                    padding: 5,
                    color: '#ffffff',
                  }}
                  i18nKey={'Save'}
                />
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
    updateStatus: state.UserReducer.updateStatus,
  };
}
export default connect(mapStateToProps, {changeInfo, reloađUpateStatus})(
  ProfileScreen,
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  avtImage: {
    height: 200,
    backgroundColor: '#f2e6ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    height: 25,
    width: 25,
    alignSelf: 'center',
    marginLeft: 80,
    marginTop: 110,
    color: '#bbbbbb',
  },
  detailInfo: {
    borderBottomWidth: 0.5,
    borderColor: '#bbbbbb',
    marginHorizontal: 20,
    paddingTop: 15,
  },
  textStyleTitle: {
    color: '#d9b3ff',
    fontSize: 17,
  },
  textStyleData: {
    fontSize: 19,
    color: '#000',
  },
  btnReset: {
    width: Dimensions.get('window').width / 2 - 40,
    borderColor: '#bbbbbb',
    borderWidth: 0.5,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    borderRadius: 20,
    marginLeft: 20,
  },
  btnSave: {
    width: Dimensions.get('window').width / 2 - 40,
    borderColor: '#bbbbbb',
    borderWidth: 0.5,
    backgroundColor: '#1e90ff',
    alignItems: 'center',
    borderRadius: 20,
    marginLeft: 'auto',
    marginRight: 20,
  },
});
