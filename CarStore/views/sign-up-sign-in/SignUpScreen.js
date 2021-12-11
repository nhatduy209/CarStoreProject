import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {
  signUp,
  realoadSignUpStatus,
} from '../../redux/action/login-action/SignUpAction';
import {STATUS_SIGNUP} from '../../config/Status';
import {testIds} from '../../config/TestID';
import {handleValidate} from '../../common/Utils';
import AppText from '../../i18/AppText';
import {showToastFail, showToastSuccess} from '../../common/Utils';

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
      showWarning: false,
    };
    this.arrayCheck = [];
  }
  handleSignUp = () => {
    let count = 0;
    const signupInfo = {
      email: this.state.email,
      password: this.state.password,
      phone: this.state.phone,
      name: this.state.name,
    };
    this.arrayCheck = handleValidate(signupInfo);
    this.arrayCheck.map(item => {
      if (!item.isCorrect) {
        this.setState({showWarning: true});
        return;
      } else {
        count++;
      }
    });
    if (this.state.confirmPassword !== this.state.password) {
      ToastAndroid.show(
        'Check your confirm password and your password again',
        ToastAndroid.LONG,
      );
    }
    if (count === this.arrayCheck.length) {
      this.props.signUp(signupInfo);
    }
  };
  handleHidePassowrd = () => {
    this.setState({
      hidePassword: !this.state.hidePassword,
    });
  };
  componentDidUpdate() {
    if (this.props.user?.status === STATUS_SIGNUP.SUCCESS) {
      showToastSuccess('Success', 'Create account successfully');
      this.props.navigation.navigate('LoginScreen');
      this.props.realoadSignUpStatus();
    } else if (this.props.user?.status === STATUS_SIGNUP.FAIL) {
      showToastFail('Error', 'Email has already been used');
      this.props.realoadSignUpStatus();
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
            <AppText
              style={{fontSize: 32, fontWeight: '500'}}
              i18nKey={'createAccount'}
            />
          </View>

          {/* input field */}
          <View style={{marginHorizontal: 30}}>
            <View>
              <AppText style={styles.emailAndPassWord} i18nKey={'FullName'} />
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
              {this.state.showWarning && !this.arrayCheck[3].isCorrect && (
                <AppText
                  style={{color: 'red'}}
                  i18nKey={'warningEmptyName'}></AppText>
              )}
            </View>
            <View>
              <AppText
                style={styles.emailAndPassWord}
                i18nKey={'PhoneNumber'}
              />
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
              {this.state.showWarning && !this.arrayCheck[2].isCorrect && (
                <AppText
                  style={{color: 'red'}}
                  i18nKey={'warningEmptyPhone'}></AppText>
              )}
            </View>
            <View>
              <AppText style={styles.emailAndPassWord} i18nKey={'Email'} />
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
              {this.state.showWarning && !this.arrayCheck[0].isCorrect && (
                <AppText
                  style={{color: 'red'}}
                  i18nKey={'warningEmptyEmail'}></AppText>
              )}
            </View>
            <View>
              <AppText style={styles.emailAndPassWord} i18nKey={'Password'} />
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
              {this.state.showWarning && !this.arrayCheck[1].isCorrect && (
                <AppText
                  style={{color: 'red'}}
                  i18nKey={'warningEmptyPassword'}></AppText>
              )}
            </View>
            <View>
              <AppText
                style={styles.emailAndPassWord}
                i18nKey={'confrimPassword'}
              />

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
                      confirmPassword: value,
                    })
                  }
                  value={this.state.confirmPassword}
                />
              </View>
              {this.state.confirmPassword !== this.state.password && (
                <AppText
                  style={{color: 'red'}}
                  i18nKey={'warningEmptyConfirmPassword'}></AppText>
              )}
            </View>

            <TouchableOpacity
              testID={testIds.SignUp_Screen.buttonSignUp}
              style={styles.signUpButton}
              onPress={this.handleSignUp}>
              <AppText style={styles.loginText} i18nKey={'SignUp'} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: '2%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AppText i18nKey={'alreadyHaveAccount'} />
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('LoginScreen')}>
              <AppText style={{color: '#00e6e6'}} i18nKey={'signIn'} />
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

export default connect(mapStateToProps, {signUp, realoadSignUpStatus})(
  SignUpScreen,
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
