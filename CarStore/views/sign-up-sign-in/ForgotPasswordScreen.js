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
import {connect} from 'react-redux';
import {recoverpassword} from '../../redux/action/login-action/RecoverPasswordAction';

class ForgotPasswordScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNull: false,
      email: '',
    };
  }
  componentDidMount() {
    // console.log("props",this.props.navigation)
  }

  handleEmailGetPassword() {
    if (this.state.email === '') {
      this.setState({isNull: true});
    } else {
      this.props.recoverpassword({email: this.state.email});
      this.props.navigation.navigate('ForgotPasswordCodeScreen');
    }
  }
  render() {
    return (
      <View style={{height: '100%'}}>
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={{padding: '8%'}}>
          <Icon
            name="arrow-left"
            size={16}
            style={{color: '#555', marginRight: 5}}></Icon>
        </TouchableOpacity>
        <View
          style={{
            alignItems: 'flex-start',
            marginHorizontal: '8%',
            marginVertical: '8%',
          }}>
          <Text style={{fontSize: 45, fontWeight: '700'}}>
            Forgot {"\n"}
            Password
          </Text>
        </View>
        <View
          style={{
            alignItems: 'flex-start',
            marginHorizontal: '8%',
          }}>
          <Text style={{fontSize: 24}}>Type your email:</Text>
        </View>
        {/* input field */}
        <View style={{marginHorizontal: 30}}>
          <TextInput
            placeholder={'Email'}
            onChangeText={value => this.setState({email: value})}
            style={styles.emailInput}></TextInput>
          <Text
            style={
              !this.state.isNull
                ? {display: 'none'}
                : {color: 'red', padding: 10}
            }>
            Please type your email!
          </Text>
        </View>
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => this.handleEmailGetPassword()}>
          <Text style={styles.forgotPasswordText}>NEXT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.UserReducer.user,
  };
};

export default connect(mapStateToProps, {recoverpassword})(
  ForgotPasswordScreen,
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  signUpButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    padding: 12,
    alignSelf: 'flex-end',
    margin: '8%',
    borderRadius: 10,
    backgroundColor: 'rgb(32,45,70)',
  },
  forgotPasswordText: {
    color: '#fff',
  },
  emailInput: {
    height: 60,
    backgroundColor: '#ddd',
    borderRadius: 10,
    marginTop: '8%',
    paddingHorizontal: '4%',
    fontSize: 20,
    color:'#aaa'
  },
});
