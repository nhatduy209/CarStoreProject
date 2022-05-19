import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import io from 'socket.io-client';

const socket = io(
  'https://03b1-2001-ee0-4fc5-b200-656c-aa37-f8b3-f71a.ngrok.io',
  {
    transports: ['websocket'],
  },
);
export class Message extends React.Component {
  constructor() {
    super();
    this.state = {
      message: '',
    };
  }

  sendMessage = () => {
    console.log('EMIT ' + this.state.message);
    socket.emit('code_from_client', {data: this.state.message});
  };

  componentDidMount() {
    socket.on('connect', con => {
      console.debug('SOCKET: connected to socket server', con);
    });

    socket.on('code_from_admin_sending', data => {
      console.debug('Response from admin ---> ', data);
    });

    console.log('check 1', socket);
  }

  render() {
    console.log('HI');
    return (
      <View>
        <TextInput
          placeholder="message"
          onChangeText={text => this.setState({message: text})}
        />
        <TouchableOpacity onPress={() => this.sendMessage()}>
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
