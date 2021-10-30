import React from 'react';
import {Modal, View, Text, ActivityIndicator} from 'react-native';

export const ProcessLoading = props => (
  <Modal visible={props.visible} animationType="fade" transparent={true}>
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={{borderRadius: 10, backgroundColor: 'white', padding: 60}}>
        <Text style={{fontSize: 20, fontWeight: '200'}}>Loading...</Text>
        <ActivityIndicator color="#00ff00" size="large" />
      </View>
    </View>
  </Modal>
);
