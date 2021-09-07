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
import {signUp} from '../../redux/action/login-action/LoginAction';

class ForgotPasswordScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    // console.log("props",this.props.navigation)
  }

  render() {
    return (
        <View style={{height: '100%'}}>
          <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{padding: '8%'}}>
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
            <Text style={{fontSize: 40, fontWeight: '700', width: '50%'}}>
              Forgot Password
            </Text>
          </View>
          <View
            style={{
              alignItems: 'flex-start',
              marginHorizontal: '8%',
            }}>
            <Text style={{fontSize: 24}}>
              Type your email:
            </Text>
          </View>
          {/* input field */}
          <View style={{marginHorizontal: 30}}>
            <TextInput placeholder={"Email"}
              style={{height:60,backgroundColor:'#ddd',borderRadius:10,marginTop:'8%',paddingHorizontal:'4%',fontSize:20}}
              >
              </TextInput>
          </View>
          <TouchableOpacity
              style={styles.signUpButton}
              onPress={() => this.props.navigation.navigate("ForgotPasswordCodeScreen")}>
              <Text style={styles.forgotPasswordText}>SIGN UP</Text>
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

export default connect(mapStateToProps, {signUp})(ForgotPasswordScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  signUpButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width:100,
    padding: 12,
    alignSelf:'flex-end',
    margin: '8%',
    borderRadius: 10,
    backgroundColor: 'rgb(32,45,70)',
  },
  forgotPasswordText:{
    color:'#fff',
  },
});
