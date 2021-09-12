import React, {useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';

class ForgotPasswordCodeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSent: false,
      inputValue: [],
      prevIndex:null,
      recoverCode:'',
      isIncorrect:false,
    };
    this.inputRefs = [
      React.createRef(),
      React.createRef(),
      React.createRef(),
      React.createRef(),
      React.createRef(),
    ];
  }

  componentDidUpdate() {
    if(this.state.recoverCode===''){
    console.log('res',this.props.user.recoverCode.data.data)
    this.setState({recoverCode:this.props.user.recoverCode.data.data})}
  }
  setInputValue(value, idx) {
    const list = [];
    this.state.inputValue.forEach((element, index) => {
      if (index === idx)
      list.push(value);
      else
      list.push(element)
    });
    this.setState({inputValue: list});
  }
  handleKeyDown(value, idx) {
    if (typeof this.state.inputValue[idx]!== 'undefined') {
      if (value !== '') {
        this.inputRefs[idx + 1 > 4 ? 4 : idx + 1].focus();
      } else {
        this.inputRefs[idx - 1 > -1 ? idx - 1 : 0].focus();
      }
      this.setInputValue(value, idx);
    } else {
      const list = this.state.inputValue;
      list.push(value);
      this.setState({inputValue: list});
      if (idx < this.inputRefs.length - 1) this.inputRefs[idx + 1].focus();
    }
    this.setState({prevIndex:idx})
  }
  onKeyDown= e=>()=> {
    if (this.state.inputValue[e] === '') {
      this.inputRefs[e - 1 > -1 ? e - 1 : 0].focus();
    }
    this.setState({isIncorrect:false})
  }

  handleConfirmCode(){
    const input = this.state.inputValue.toString().split(',').join("");
    if(input.length===5&&input.localeCompare(this.state.recoverCode)===0){
      this.setState({isIncorrect:false})
        this.props.navigation.navigate('ChangePasswordScreen')
    }
    else
    this.setState({isIncorrect:true})
  }
  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>
      <ScrollView>
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
          <Text style={{fontSize: 40, fontWeight: '700', width: '70%'}}>
            Enter 4-digit recovery code
          </Text>
          <Text style={{fontSize: 24, fontWeight: '500',marginTop:'10%'}}>
            The recovery code was sent to your mail. Please enter the code
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: '2%',
            justifyContent: 'center',
          }}>
          {this.inputRefs.map((k, idx) => (
            <TextInput
              key={idx}
              ref={r => (this.inputRefs[idx] = r)}
              maxLength={1}
              onKeyPress={this.onKeyDown(idx)}
              onChangeText={value => this.handleKeyDown(value, idx)}
              style={styles.codeNumber}></TextInput>
          ))}
        </View>
        <Text style={this.state.isIncorrect?{padding:20,paddingHorizontal:'10%'}:{display:'none'}}>Your code is incorrect</Text>
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() =>
            this.handleConfirmCode()
          }>
          <Text style={styles.forgotPasswordText}>Confirm</Text>
        </TouchableOpacity>
      </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.UserReducer,
  };
};

export default connect(mapStateToProps, {})(ForgotPasswordCodeScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  codeNumber: {
    backgroundColor: '#ddd',
    marginHorizontal: '2%',
    marginTop: '4%',
    width: 60,
    height: 60,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 24,
    color:'#aaa'
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
});
