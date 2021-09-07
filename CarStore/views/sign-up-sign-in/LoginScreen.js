import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { connect } from "react-redux"
import { login } from '../../redux/action/login-action/LoginAction';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth';


const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('login_key', jsonValue);
    console.log("STORE DATA SUCCESS-----")
  } catch (e) {
    // saving error
  }
}

const removeUserLogin = async () => {
  try {
    await AsyncStorage.removeItem('login_key')
  } catch (e) {
    // remove error
  }

  console.log('Done.')
}


const getUserlogin = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('login_key');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
}

const userLogin = {};
class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isRemember: 0,
      email: "",
      password: "",
      colorRemember: "black",
      userEmail: {}
    }
  }


  componentDidMount() {
    console.log("-------DONT FORGET TO BIND PORT 3000 DEVICE--------");


    getUserlogin().then(res => {
      if (res) {
        this.setState({ email: res.email, password: res.password, isRemember: res.isRemember })
      }
    });
  }

  handleGoogleSignin = async () => {
    // const { idToken } = await GoogleSignin.signIn();
    // const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // auth().signInWithCredential(googleCredential);
    // console.log("GOOOGLE ---- AUTHEN", auth().currentUser);  
    // console.log("ID TOKEN MAIL ------" , idToken);

    GoogleSignin.configure({
      webClientId: "111011050447-m1qe21og2lpbk6nqj5fmtc98b93prco9.apps.googleusercontent.com",
    });

    try {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken); 
      console.log("auth",auth().currentUser)
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
      console.log("error",error)
    }
  }
  handleRememberChange = (value) => {
    if (value === 1) {
      this.setState({ colorRemember: "green", isRemember: value });
    } else {
      this.setState({ colorRemember: "black", isRemember: value });
    }
  }


  handleLogin = async () => {
    if (this.state.isRemember === 1) {
      const loginInfo = {
        email: this.state.email,
        password: this.state.password,
        isRemember: this.state.isRemember
      }
      storeData(loginInfo)
    } else {
      removeUserLogin();
    }
    this.props.login(this.state.email, this.state.password);
  }

  componentDidUpdate() {
    console.log('USER---', this.state.userEmail);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.Skip}>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>

            <Text style={{ marginRight: 5, fontSize: 20 }}>
              Skip
            </Text>
            <Icon
              name="arrow-right"
              size={18}
            ></Icon>

          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 25, textAlign: 'center', color: '#33DDFF', fontWeight: '600' }}>
          WELCOME
        </Text>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../../images/ferrari-welcome.jpeg')}
            style={{ borderRadius: 40, margin: 20 }}
          >
          </Image>
        </View>

        {/* input field */}
        <View style={{ marginHorizontal: 30 }}>
          <View>
            <Text style={styles.emailAndPassWord}>
              Email
            </Text>
            <View style={styles.Input}>
              <Icon
                name='envelope'
                size={20}
                style={{ paddingHorizontal: 20 }}>
              </Icon>
              <TextInput style={{ flex: 1 }}
                onChangeText={value => this.setState({ email: value })}
                value={this.state.email}>

              </TextInput>
            </View>
          </View>

          <View>
            <Text style={styles.emailAndPassWord}>
              Password
            </Text>
            <View style={styles.Input}>
              <Icon
                name='lock'
                size={20}
                style={{ paddingHorizontal: 20 }}>
              </Icon>
              <TextInput style={{ flex: 1 }}
                onChangeText={value => this.setState({ password: value })}
                secureTextEntry
                value={this.state.password}
              >

              </TextInput>
            </View>
          </View>

          {/*end input field */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Slider
              style={{ width: 60, height: 40 }}
              minimumValue={0}
              maximumValue={1}
              value={this.state.isRemember}
              onValueChange={value => this.handleRememberChange(value)}
              minimumTrackTintColor="#00e6e6"
              maximumTrackTintColor="#000000"
            />
            <Text style={{ color: this.state.colorRemember }}>
              Remember
            </Text>

            <TouchableOpacity style={{ marginLeft: 40, flex: 1 }}
              onPress={() => this.props.navigation.navigate('ForgotPasswordScreen')}>
              <Text style={{ textAlign: 'right' }}>
                Forgot password
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.loginButton}
            onPress={this.handleLogin}>
            <Text style={styles.loginText}>
              LOGIN
            </Text>
          </TouchableOpacity>

          <Text style={{ textAlign: 'center', fontSize: 17 }}> -------------- Or --------------</Text>

          <View style={{ flexDirection: 'row', marginVertical: 10 }}>
            <TouchableOpacity style={{ ...styles.loginWith, backgroundColor: 'blue' }}>
              <Icon
                name='facebook'
                size={20}
                style={{ color: 'white', marginRight: 5 }}>
              </Icon>
              <Text style={{ color: 'white', fontSize: 12 }}>
                Login with Facebook
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ ...styles.loginWith, backgroundColor: '#ff3333', marginLeft: 'auto' }} onPress={this.handleGoogleSignin}>
              <Icon
                name='google'
                size={20}
                style={{ color: 'white', marginRight: 5 }}>
              </Icon>
              <Text style={{ color: 'white', fontSize: 12 }}>
                Login with Google
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{
          flexDirection: 'row',
          bottom: 0, //Here is the trick
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text>
            Don't have account ?{' '}
          </Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUpScreen')}>
            <Text style={{ color: '#00e6e6' }}>
              Sign up
            </Text>
          </TouchableOpacity>

        </View>
      </View >
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.UserReducer.user,
  }
}

export default connect(mapStateToProps, { login })(LoginScreen)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff', flex: 1
  },
  Skip: {
    flexDirection: 'row', justifyContent: 'flex-end', marginRight: 20,
    marginTop: 15
  },
  emailAndPassWord: { fontSize: 17, fontWeight: '900', color: '#323637' },
  Input: {
    borderWidth: 0.5,
    borderRadius: 20,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  loginText: {
    fontSize: 17,
    padding: 10,
    color: '#ffffff'
  },
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderRadius: 20,
    backgroundColor: '#33DDFF'
  },
  loginWith: { flexDirection: 'row', alignItems: 'center', padding: 7 }
})