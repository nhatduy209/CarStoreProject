import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {signUp} from '../../redux/action/login-action/SignUpAction';
import {STATUS} from '../../config/Status';
import {testIds} from '../../config/TestID';

class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      hidePassword: true,
      confirmPassword: '',
      phone: '',
    };
  }
  handleSignUp = () => {
    const signupInfo = {
      email: this.state.email,
      password: this.state.password,
      phone: this.state.phone,
      name: this.state.name,
    };
    this.props.signUp(signupInfo);
  };
  handleHidePassowrd = () => {
    this.setState({
      hidePassword: !this.state.hidePassword,
    });
  };
  componentDidUpdate() {
    if (this.props.user?.status === STATUS.SUCCESS) {
      this.props.navigation.navigate('LoginScreen');
    }
  }
  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
        <ScrollView
          style={{height: '100%'}}
          testID={testIds.SignUp_Screen.scrollView}>
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
                  style={{color: '#555', marginRight: 5}}
                />
                <TextInput
                  testID={testIds.SignUp_Screen.textInputName}
                  style={{flex: 1, color: '#000'}}
                  placeholder={'Name'}
                  onChangeText={value => this.setState({name: value})}
                  value={this.state.name}
                />
              </View>
            </View>
            <View>
              <Text style={styles.emailAndPassWord}>Phone</Text>
              <View style={styles.Input}>
                <Icon
                  name="phone"
                  size={16}
                  style={{color: '#555', marginRight: 5}}
                />
                <TextInput
                  testID={testIds.SignUp_Screen.textInputPhone}
                  style={{flex: 1, color: '#000'}}
                  placeholder={'Phone'}
                  onChangeText={value => this.setState({phone: value})}
                  value={this.state.phone}
                />
              </View>
            </View>
            <View>
              <Text style={styles.emailAndPassWord}>Email</Text>
              <View style={styles.Input}>
                <Icon
                  name="envelope"
                  size={16}
                  style={{color: '#555', marginRight: 5}}
                />
                <TextInput
                  testID={testIds.SignUp_Screen.textInputEmail}
                  style={{flex: 1, color: '#000'}}
                  placeholder={'Email'}
                  onChangeText={value => this.setState({email: value})}
                  value={this.state.email}
                />
              </View>
            </View>
            <View>
              <Text style={styles.emailAndPassWord}>Password</Text>
              <View style={styles.Input}>
                <Icon
                  onPress={this.handleHidePassowrd}
                  name={this.state.hidePassword ? 'eye-slash' : 'eye'}
                  size={16}
                  style={{color: '#555', marginRight: 5}}
                />
                <TextInput
                  testID={testIds.SignUp_Screen.textInputPassword}
                  style={{flex: 1, color: '#000'}}
                  placeholder={'Password'}
                  secureTextEntry={this.state.hidePassword}
                  onChangeText={value => this.setState({password: value})}
                  value={this.state.password}
                />
              </View>
            </View>
            <View>
              <Text style={styles.emailAndPassWord}>Confirm password</Text>

              <View style={styles.Input}>
                <Icon
                  onPress={this.handleHidePassowrd}
                  name={this.state.hidePassword ? 'eye-slash' : 'eye'}
                  size={16}
                  style={{color: '#555', marginRight: 5}}
                />

                <TextInput
                  testID={testIds.SignUp_Screen.textInputConfirmPassword}
                  style={{flex: 1, color: '#000'}}
                  placeholder={'Confirm password'}
                  secureTextEntry={this.state.hidePassword}
                  onChangeText={value =>
                    this.setState({
                      passwordConfirmed: value,
                    })
                  }
                  value={this.state.passwordConfirmed}
                />
              </View>
            </View>

            <TouchableOpacity
              testID={testIds.SignUp_Screen.buttonSignUp}
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
