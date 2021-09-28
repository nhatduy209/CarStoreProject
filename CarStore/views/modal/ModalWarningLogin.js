import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Modal from "react-native-modal";
import { connect } from 'react-redux'
import {showModalNotLogin} from '../../redux/action/show-modal/ShowModalAction'
class ModalWarningLogin extends React.Component {


  handleDismissModal = () => {
    this.props.showModalNotLogin(false)
  }

  handleSignIn = () => {
    this.props.showModalNotLogin(false)
    this.props.navigation.navigate('LoginScreen');
  }
  render(){
    return(
      <Modal isVisible={this.props.isShow}>
      <View style={styles.modal}>
        <Text style={{ fontSize: 20, paddingHorizontal : 50, paddingVertical : 20, textAlign: 'center' }}
          numberOfLines={2}>You're not login , please login first</Text>
        <TouchableOpacity  onPress={ this.handleSignIn} >
          <View style={{ ...styles.loginBtn, backgroundColor: '#99ffcc' }}>
            <Text style={{ fontSize: 20 }}>
              Sign in
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress= {this.handleDismissModal}>
          <View style={styles.loginBtn}>
            <Text style={{ fontSize: 20, color: '#bbbbbb' }}>
              Cancel
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
    )
  }
}

const mapStateToProps = state => {
  return {
    isShow: state.ModalReducer.isShow,
  }
}

export default connect(mapStateToProps, { showModalNotLogin  })(ModalWarningLogin)

const styles = new StyleSheet.create({
  modal: {
    alignSelf: 'center', backgroundColor: '#ffffff', height: 200,
    borderRadius: 20
  },
  loginBtn: { alignItems: 'center', marginHorizontal: 70, padding: 10, borderRadius: 20 }
})