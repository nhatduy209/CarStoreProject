import React from 'react';
import {View, ScrollView, Image, Text} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Message from '../message/Message';
import {connect} from 'react-redux';
import {
  getInitMessage,
  sendMessage,
} from '../../../../redux/action/message/MessageAction';
import {styles} from './Style';

class Conversation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputMesssage: '',
    };
  }
  componentDidMount() {
    this.props.getInitMessage(this.props.user?.email ?? '');
  }
  renderItem = item => {
    console.log(item);
    if (item.id.includes(this.props.user?.email)) {
      return <Message key={item.id} content={item.content} />;
    }

    return <Message type={'other'} content={item.content} key={item.id} />;
  };
  sendMessage = async () => {
    console.log(this.state.inputMesssage);
    const data = {
      reciver: 'admin_123',
      content: this.state.inputMesssage,
      sender: this.props.user?.email,
    };
    await this.props.sendMessage({
      data,
      onSuccess: () => this.props.getInitMessage(this.props.user?.email ?? ''),
    });
    this.setState({inputMesssage: ''});
  };
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
                <Text style={styles.itemContent}>Admin</Text>
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
          {this.props.messages.map(el => this.renderItem(el))}
        </ScrollView>
        <View style={styles.footer}>
          <TextInput
            style={styles.textInput}
            value={this.state.inputMesssage}
            onChangeText={value => this.setState({inputMesssage: value})}
          />
          <TouchableOpacity onPress={() => this.sendMessage()}>
            <Icon
              name="paper-plane"
              size={16}
              style={[{color: '#999', marginRight: 5}, styles.sendButton]}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon
              name="image"
              size={16}
              style={[{color: '#999', marginRight: 5}, styles.sendButton]}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.UserReducer.user?.data?.data,
    messages: state.MessageReducer.messages,
  };
};

export default connect(mapStateToProps, {getInitMessage, sendMessage})(
  Conversation,
);
