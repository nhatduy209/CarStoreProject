import React from 'react';
import {View, ScrollView, Image, Text} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Message from '../message/Message';
import {styles} from './Style';

export default class Conversation extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{backgroundColor: '#fff', height: '100%'}}>
        <View
          style={{
            position: 'absolute',
            width: '100%',
            zIndex: 100,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
          }}>
          <View
            style={{
              flexDirection: 'row',
              height: 50,
              alignItems: 'center',
              paddingHorizontal: 32,
              position: 'relative',
              top: 16,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Icon
                  name="arrow-left"
                  size={16}
                  style={{color: '#999', marginRight: 5}}
                />
              </TouchableOpacity>
              <View style={styles.itemContainer}>
                <Image
                  source={require('../../../../images/avatarPerson.jpeg')}
                  style={styles.itemAvatar}
                />
                <View style={styles.itemContent}>
                  <Text>Name</Text>
                  <Text>Last message</Text>
                </View>
                <Icon
                  name="phone"
                  size={16}
                  style={{color: '#999', marginRight: 5}}
                />
                <Icon
                  name="video"
                  size={16}
                  style={{color: '#999', marginRight: 5}}
                />
              </View>
              <Text
                style={{
                  fontSize: 25,
                  width: '90%',
                  fontWeight: 'bold',
                  color: '#000',
                  textAlign: 'center',
                }}>
                {this.props.screenTitle ?? ''}
              </Text>
            </View>
          </View>
        </View>
        <ScrollView
          style={{
            height: '80%',
            backgroundColor: '#fda',
            marginTop: 80,
            borderTopRightRadius: 24,
            borderTopLeftRadius: 24,
            paddingHorizontal: 20,
          }}>
          <Message type={'other'} />
          <Message />
          <Message type={'other'} />
          <Message />
          <Message type={'other'} />
          <Message />
          <Message type={'other'} />
          <Message type={'other'} />
          <Message type={'other'} />
          <Message type={'other'} />
          <Message />
          <Message type={'other'} />
          <Message />
          <Message />
          <Message type={'other'} />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
        </ScrollView>
        <View style={styles.footer}>
          <TextInput style={styles.textInput} />
          <TouchableOpacity>
            <Icon
              name="paper-plane"
              size={16}
              style={[{color: '#999', marginRight: 5}, styles.sendButton]}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
