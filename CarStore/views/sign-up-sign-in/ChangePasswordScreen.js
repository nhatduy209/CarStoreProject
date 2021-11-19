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
import {changepassword} from '../../redux/action/login-action/ChangePasswordAction';

class ChangePasswordScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      hidePassword: true,
      icon: 'eye-slash',
      confirmPassword: '',
      hideConfirmPassword: true,
      iconConfirm: 'eye-slash',
      error: '',
    };
  }
  handleChangePassword = async () => {
    const data = {
      email: this.props.email,
      password: this.state.password,
    };
    if (this.state.password.length > 0) {
      if (this.state.password.localeCompare(this.state.confirmPassword) === 0) {
        await this.props.changepassword(data);
        this.props.navigation.navigate('LoginScreen');
      } else {
        this.setState({error: 'Confirm password not match!'});
      }
    } else {
      this.setState({error: 'Please type new password!'});
    }
  };
  handleHidePassowrd = () => {
    this.setState({
      hidePassword: !this.state.hidePassword,
      icon: !this.state.hidePassword ? 'eye-slash' : 'eye',
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
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
        <ScrollView style={{height: '100%'}}>
          <View style={{alignItems: 'center', marginVertical: '15%'}}>
            <Text style={{fontSize: 32, fontWeight: '500'}}>
              Change password
            </Text>
          </View>

          {/* input field */}
          <View style={{marginHorizontal: 30}}>
            <View>
              <Text style={styles.label}>New password</Text>
              <View style={styles.Input}>
                <Icon
                  onPress={this.handleHidePassowrd}
                  name={this.state.icon}
                  size={16}
                  style={{color: '#555', marginRight: 5}}
                />
                <TextInput
                  style={{flex: 1, color: '#000'}}
                  placeholder={'New password'}
                  secureTextEntry={this.state.hidePassword}
                  onChangeText={value => this.setState({password: value})}
                  value={this.state.password}
                />
              </View>
              <Text
                style={
                  this.state.error.indexOf('type') > 0
                    ? styles.textError
                    : {display: 'none'}
                }>
                {this.state.error}
              </Text>
            </View>
            <View>
              <Text style={styles.label}>Confirm new password</Text>

              <View style={styles.Input}>
                <Icon
                  onPress={this.handleHideConfirmedPassowrd}
                  name={this.state.iconConfirm}
                  size={16}
                  style={{color: '#555', marginRight: 5}}
                />

                <TextInput
                  style={{flex: 1, color: '#000'}}
                  placeholder={'Confirm new password'}
                  secureTextEntry={this.state.hideConfirmPassword}
                  onChangeText={value =>
                    this.setState({confirmPassword: value})
                  }
                  value={this.state.passwordConfirmed}
                />
              </View>
              <Text
                style={
                  this.state.error.indexOf('match') < 0
                    ? {display: 'none'}
                    : styles.textError
                }>
                {this.state.error}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.changePasswordButton}
              onPress={() => this.handleChangePassword()}>
              <Text style={styles.confirmText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
const mapStateToProps = state => {
  return {
    email: state.UserReducer.recoverCode.email,
  };
};

export default connect(mapStateToProps, {changepassword})(ChangePasswordScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  textError: {color: 'red'},
  label: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#323637',
    marginBottom: '5%',
    marginTop: '4%',
  },
  Input: {
    borderWidth: 0.5,
    borderRadius: 10,
    paddingHorizontal: 8,
    borderColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '5%',
  },
  confirmText: {
    fontSize: 17,
    padding: 12,
    color: '#ffffff',
  },
  changePasswordButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
    borderRadius: 20,
    backgroundColor: 'rgb(32,45,70)',
  },
  loginWith: {flexDirection: 'row', alignItems: 'center', padding: 7},
});
