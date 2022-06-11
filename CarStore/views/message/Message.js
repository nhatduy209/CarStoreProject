import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import io from 'socket.io-client';
import {ngrokUrl} from '../../config/URL';

const socket = io(ngrokUrl, {
  transports: ['websocket'],
});
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
