import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  BackHandler,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import {
  login,
  loginWithEmail,
  reload,
} from '../../redux/action/login-action/LoginAction';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import * as Animatable from 'react-native-animatable';
import {STATUS} from '../../config/Status';
import {ProcessLoading} from '../modal/ProcessLoading';
import {ToastAndroid} from 'react-native';
import {LOGIN_KEY, TOKEN_DEVICE} from '../../config/StorageKey';
import {_storeData, _retrieveData} from '../../common/Utils';
import {testIds} from '../../config/TestID';
import AppText from '../../i18/AppText';

const removeUserLogin = async () => {
  try {
    await AsyncStorage.removeItem(LOGIN_KEY);
  } catch (e) {
    // remove error
  }
};

const getUserlogin = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(LOGIN_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRemember: false,
      email: '',
      password: '',
      colorRemember: 'black',
      userEmail: {},
      loading: false,
    };
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
    if (this.props.user?.status === STATUS.SUCCESS) {
      if (this.state.loading) {
        // eslint-disable-next-line react/no-did-mount-set-state
        this.setState({loading: false});
      }
      this.props.navigation.navigate('RootDrawer');
    }
    getUserlogin().then(res => {
      if (res) {
        this.setState({
          email: res.email,
          password: res.password,
          isRemember: res.isRemember,
        });
      }
    });
  }

  backAction = () => {
    Alert.alert('Hold on!', 'Are you sure you want to go back?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'YES', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };

  componentDidUpdate() {
    console.log('HELLO ---', this.props.user?.status);
    if (this.props.user?.status === STATUS.SUCCESS) {
      if (this.state.loading) {
        this.setState({loading: false});
      }
      this.props.navigation.navigate('RootDrawer');
    } else if (this.props.user?.status === STATUS.FAIL) {
      ToastAndroid.show(
        'Invalid account, check and try again',
        ToastAndroid.LONG,
      );
      this.props.reload();
      if (this.state.loading) {
        this.setState({loading: false});
      }
    }
  }

  handleGoogleSignin = async () => {
    GoogleSignin.configure({
      webClientId:
        '111011050447-m1qe21og2lpbk6nqj5fmtc98b93prco9.apps.googleusercontent.com',
    });

    try {
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      console.log('auth', idToken);
      console.log('auth', auth().currentUser);
      this.props.loginWithEmail(auth().currentUser);
      //TODO :  add api sign up here
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
      console.log('error', error);
    }
  };
  handleRememberChange = value => {
    if (value) {
      this.setState({isRemember: true});
    } else {
      this.setState({isRemember: false});
    }
  };

  handleLogin = async () => {
    const tokenDevice = await _retrieveData(TOKEN_DEVICE);
    this.setState({loading: true});
    if (this.state.isRemember) {
      const loginInfo = {
        email: this.state.email,
        password: this.state.password,
        isRemember: this.state.isRemember,
      };
      const jsonValue = JSON.stringify(loginInfo);
      _storeData(LOGIN_KEY, jsonValue);
    } else {
      removeUserLogin();
    }
    this.props.login(this.state.email, this.state.password, tokenDevice);
  };

  render() {
    return (
      <View style={styles.container}>
        <Animatable.View style={styles.Skip} animation="fadeInLeft">
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => this.props.navigation.navigate('RootDrawer')}>
            <AppText style={{marginRight: 5, fontSize: 20}} i18nKey={'Skip'} />
            <Icon name="arrow-right" size={18} />
          </TouchableOpacity>
        </Animatable.View>

        {/* ANIMATION VIEW */}
        <Animatable.View
          animation="fadeInUp"
          iterationCount={1}
          duration={2000}>
          <AppText
            style={{
              fontSize: 25,
              textAlign: 'center',
              color: '#33DDFF',
              fontWeight: '600',
            }}
            i18nKey={'Welcome'}
          />
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../../images/ferrari-welcome.jpeg')}
              style={{borderRadius: 40, margin: 20}}
            />
          </View>

          {/* input field */}
          <View style={{marginHorizontal: 30}}>
            <View>
              <Text style={styles.emailAndPassWord}>Email</Text>
              <View style={styles.Input}>
                <Icon
                  name="envelope"
                  size={20}
                  style={{paddingHorizontal: 20}}
                />
                <TextInput
                  testID={testIds.txtEmail}
                  style={{flex: 1, color: '#000'}}
                  onChangeText={value => this.setState({email: value})}
                  value={this.state.email}
                />
              </View>
            </View>

            <View>
              <AppText style={styles.emailAndPassWord} i18nKey={'Password'} />
              <View style={styles.Input}>
                <Icon name="lock" size={20} style={{paddingHorizontal: 20}} />
                <TextInput
                  testID={testIds.txtPassword}
                  style={{flex: 1, color: '#000'}}
                  onChangeText={value => this.setState({password: value})}
                  secureTextEntry
                  value={this.state.password}
                />
              </View>
            </View>

            {/*end input field */}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Switch
                testID={testIds.switchButton}
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={'#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={value => this.handleRememberChange(value)}
                value={this.state.isRemember}
              />
              <AppText
                style={{color: this.state.colorRemember}}
                i18nKey={'Remember'}
              />

              <TouchableOpacity
                style={{marginLeft: 40, flex: 1}}
                onPress={() =>
                  this.props.navigation.navigate('ForgotPasswordScreen')
                }>
                <AppText
                  style={{textAlign: 'right'}}
                  i18nKey={'ForgetPassword'}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              testID={testIds.buttonLogin}
              style={styles.loginButton}
              onPress={this.handleLogin}>
              <AppText style={styles.loginText} i18nKey={'Login'} />
            </TouchableOpacity>

            <AppText
              style={{textAlign: 'center', fontSize: 17}}
              i18nKey={'Or'}
            />

            <View style={{flexDirection: 'row', marginVertical: 10}}>
              <TouchableOpacity
                style={{
                  ...styles.loginWith,
                  backgroundColor: 'blue',
                }}>
                <Icon
                  name="facebook"
                  size={20}
                  style={{color: 'white', marginRight: 5}}
                />

                <AppText
                  style={{color: 'white', fontSize: 12}}
                  i18nKey={'LoginWithFacebook'}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  ...styles.loginWith,
                  backgroundColor: '#ff3333',
                  marginLeft: 'auto',
                }}
                onPress={this.handleGoogleSignin}>
                <Icon
                  name="google"
                  size={20}
                  style={{color: 'white', marginRight: 5}}
                />
                <AppText
                  style={{color: 'white', fontSize: 12}}
                  i18nKey={'LoginWithGoogle'}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              bottom: 0, //Here is the trick
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AppText i18nKey={'DontHaveAccount'} />
            <TouchableOpacity
              testID={testIds.SignUp_Screen.buttonSignUp}
              onPress={() => this.props.navigation.navigate('SignUpScreen')}>
              <AppText
                style={{color: '#00e6e6', marginLeft: 5}}
                i18nKey={'SignUp'}
              />
            </TouchableOpacity>
          </View>
        </Animatable.View>
        <ProcessLoading visible={this.state.loading} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.UserReducer.user,
  };
};

export default connect(mapStateToProps, {login, loginWithEmail, reload})(
  LoginScreen,
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  Skip: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 20,
    marginTop: 15,
  },
  emailAndPassWord: {fontSize: 17, fontWeight: '900', color: '#323637'},
  Input: {
    borderWidth: 0.5,
    borderRadius: 20,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 17,
    padding: 10,
    color: '#ffffff',
  },
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderRadius: 20,
    backgroundColor: '#33DDFF',
  },
  loginWith: {flexDirection: 'row', alignItems: 'center', padding: 7},
});
