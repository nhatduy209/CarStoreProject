import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import {connect} from 'react-redux';
import {signUp} from '../../redux/action/login-action/SignUpAction';

class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      hidePassword: true,
      icon: 'eye-slash',
      confirmPassword: '',
      hideConfirmPassword: true,
      iconConfirm: 'eye-slash',
      phone: '',
    };
  }
  handleSignUp = () => {
    const signupInfo = {
      email: this.state.email,
      password: this.state.password,
      phone: this.state.phone,
      email: this.state.email,
      name: this.state.name,
    };
    this.props.signUp(signupInfo);
  };
  handleHidePassowrd = () => {
    this.setState({
      hidePassword: !this.state.hidePassword,
      icon: this.state.hidePassword ? 'eye-slash' : 'eye',
    });
  };
  handleHideConfirmedPassowrd = () => {
    this.setState({
      hideConfirmPassword: !this.state.hideConfirmPassword,
      iconConfirm: this.state.hideConfirmPassword ? 'eye' : 'eye-slash',
    });
  };
  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>
        <ScrollView style={{height:'100%'}}>
          <View style={{alignItems: 'center', marginVertical: '8%'}}>
            <Text style={{fontSize: 32, fontWeight: '500'}}>
              Create Account
            </Text>
          </View>

          {/* input field */}
          <View style={{marginHorizontal: 30}}>
            <View>
              <Text style={styles.emailAndPassWord}>Name</Text>
              <View style={styles.Input}>
                <Icon
                  name="user"
                  size={16}
                  style={{color: '#555', marginRight: 5}}></Icon>
                <TextInput
                  style={{flex: 1,color:'#000'}}
                  placeholder={'Name'}
                  onChangeText={value => this.setState({name: value})}
                  value={this.state.name}></TextInput>
              </View>
            </View>
            <View>
              <Text style={styles.emailAndPassWord}>Phone</Text>
              <View style={styles.Input}>
                <Icon
                  name="phone"
                  size={16}
                  style={{color: '#555', marginRight: 5}}></Icon>
                <TextInput
                  style={{flex: 1,color:'#000'}}
                  placeholder={'Phone'}
                  onChangeText={value => this.setState({phone: value})}
                  value={this.state.phone}></TextInput>
              </View>
            </View>
            <View>
              <Text style={styles.emailAndPassWord}>Email</Text>
              <View style={styles.Input}>
                <Icon
                  name="envelope"
                  size={16}
                  style={{color: '#555', marginRight: 5}}></Icon>
                <TextInput
                  style={{flex: 1,color:'#000'}}
                  placeholder={'Email'}
                  onChangeText={value => this.setState({email: value})}
                  value={this.state.email}></TextInput>
              </View>
            </View>
            <View>
              <Text style={styles.emailAndPassWord}>Password</Text>
              <View style={styles.Input}>
                <Icon
                  onPress={this.handleHidePassowrd}
                  name={this.state.icon}
                  size={16}
                  style={{color: '#555', marginRight: 5}}></Icon>
                <TextInput
                  style={{flex: 1,color:'#000'}}
                  placeholder={'Password'}
                  secureTextEntry={this.state.hidePassword}
                  onChangeText={value => this.setState({password: value})}
                  value={this.state.password}></TextInput>
              </View>
            </View>
            <View>
              <Text style={styles.emailAndPassWord}>Confirm password</Text>

              <View style={styles.Input}>
                <Icon
                  onPress={this.handleHideConfirmedPassowrd}
                  name={this.state.iconConfirm}
                  size={16}
                  style={{color: '#555', marginRight: 5}}></Icon>

                <TextInput
                  style={{flex: 1,color:'#000'}}
                  placeholder={'Confirm password'}
                  secureTextEntry={this.state.hideConfirmPassword}
                  onChangeText={value =>
                    this.setState({passwordConfirmed: value})
                  }
                  value={this.state.passwordConfirmed}></TextInput>
              </View>
            </View>

            <TouchableOpacity
              style={styles.signUpButton}
              onPress={this.handleSignUp}>
              <Text style={styles.loginText}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: '2%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('LoginScreen')}>
              <Text style={{color: '#00e6e6'}}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.UserReducer.user,
  };
};

export default connect(mapStateToProps, {signUp})(SignUpScreen);

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
  emailAndPassWord: {
    fontSize: 17,
    fontWeight: '900',
    color: '#323637',
    marginBottom: '2%',
    marginTop: '4%',
  },
  Input: {
    borderWidth: 0.5,
    borderRadius: 10,
    paddingHorizontal: 10,
    borderColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '2%',
  },
  loginText: {
    fontSize: 17,
    padding: 12,
    color: '#ffffff',
  },
  signUpButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2%',
    borderRadius: 20,
    backgroundColor: '#33DDFF',
  },
});
