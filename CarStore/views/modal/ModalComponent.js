import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';

export const ModalComponent = props => {
  const {descriptionText, textAction, textCancel} = props;

  const handleDismissModal = () => {
    props.state.setState({isShow: false});
  };

  const handleSignIn = () => {
    props.state.setState({isShow: false});
    props.navigation.navigate('LoginScreen');
  };

  return (
    <Modal isVisible={props.isShow}>
      <View style={styles.modal}>
        <Text
          style={{
            fontSize: 17,
            paddingHorizontal: 50,
            paddingVertical: 20,
            textAlign: 'center',
          }}
          numberOfLines={2}>
          {descriptionText}
        </Text>
        <TouchableOpacity onPress={handleSignIn}>
          <View
            style={{
              ...styles.loginBtn,
              backgroundColor: '#99ffcc',
            }}>
            <Text style={{fontSize: 20}}>{textAction}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDismissModal}>
          <View style={styles.loginBtn}>
            <Text style={{fontSize: 20, color: '#bbbbbb'}}>{textCancel}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = new StyleSheet.create({
  modal: {
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    height: 200,
    borderRadius: 20,
  },
  loginBtn: {
    alignItems: 'center',
    marginHorizontal: 70,
    padding: 10,
    borderRadius: 20,
  },
});
