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
import {ngrokUrl} from '../../../../config/URL';
import io from 'socket.io-client';
import * as ImagePicker from 'react-native-image-picker';
import {uploadImageToStorage} from '../../../../common/pushImage';
import {ModalComponent} from '../../../modal/ModalComponent';
import {STATUS} from '../../../../config/Status';

const socket = io(ngrokUrl, {
  transports: ['websocket'],
});

class Conversation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputMesssage: '',
      image: {},
      isShow: false,
    };
    this.scrollViewRef = React.createRef();
  }
  componentDidMount() {
    console.log('mount');
    this.didFocusSubscription = this.props.navigation.addListener(
      'focus',
      () => {
        this.props.getInitMessage(this.props.user?.email ?? '');
        socket.on('connect', con => {
          console.debug('SOCKET: connected to socket server', con);
        });

        socket.on(this.props.reciverId, data => {
          console.debug(
            'Response from admin ---> ',
            data + this.props.user?.email,
          );
          this.props.getInitMessage(this.props.user?.email ?? '');
        });
      },
    );
  }

  componentDidUpdate() {
    console.log('update');
    if (this.props.status === STATUS.UNAUTHORIED) {
      if (!this.state.isShow) {
        this.setState({isShow: true});
      }
    }
  }

  renderItem = item => {
    if (item?.id.includes(this.props.user?.email)) {
      return (
        <Message
          key={item.id}
          content={item.content}
          shareItem={item.shareItem}
          time={item.time}
          navigation={this.props.navigation}
        />
      );
    }

    return (
      <Message
        type={'other'}
        content={item.content}
        key={item.id}
        shareItem={item.shareItem}
        navigation={this.props.navigation}
      />
    );
  };
  sendMessage = async () => {
    if (!this.state.inputMesssage.length && !this.state.image?.uri?.length) {
      return;
    }
    console.log('image ====' + JSON.stringify(this.state.image));

    if (this.state.image?.uri) {
      const {uri, fileName} = this.state.image;
      console.log('uri filename ' + uri, fileName);
      await uploadImageToStorage(uri, fileName)
        .then(async res => {
          console.log('res mess ' + res);
          const data = {
            reciver: 'admin_123',
            content: res,
            sender: this.props.user?.email,
          };
          socket.emit('code_from_client', {
            data: this.state.inputMesssage,
            id: this.props.senderId,
          });
          await this.props.sendMessage({
            data,
            onSuccess: () => {
              this.props.getInitMessage(this.props.user?.email ?? '');
            },
          });
          this.setState({inputMesssage: '', image: {}});
        })
        .catch(err => console.log('err ne ' + err));
    } else {
      const data = {
        reciver: 'admin_123',
        content: this.state.inputMesssage,
        sender: this.props.user?.email,
      };
      socket.emit('code_from_client', {
        data: this.state.inputMesssage,
        id: this.props.senderId,
      });
      await this.props.sendMessage({
        data,
        onSuccess: () => {
          this.props.getInitMessage(this.props.user?.email ?? '');
        },
      });
      this.setState({inputMesssage: '', image: {}});
    }
  };

  addImage = () => {
    ImagePicker.launchImageLibrary({}, response => {
      try {
        this.setState({image: response.assets[0]});
      } catch (err) {
        console.log('Error when choose image' + err);
      }
    });
  };

  removeImage = () => {
    this.setState({image: {}});
  };

  render() {
    return (
      <View style={{backgroundColor: '#fff', height: '100%'}}>
        <ModalComponent
          navigation={this.props.navigation}
          state={this}
          isShow={this.state.isShow}
          descriptionText={'Your session has expired, please login again'}
          textAction="Sign in"
          textCancel="Cancel"
        />
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
          ref={r => (this.scrollViewRef = r)}
          onContentSizeChange={() => {
            this.scrollViewRef.scrollToEnd();
          }}
          style={{
            height: '80%',
            backgroundColor: '#eee',
            marginTop: 80,
            borderTopRightRadius: 24,
            borderTopLeftRadius: 24,
            paddingHorizontal: 20,
          }}>
          {this.props.messages?.map(el => this.renderItem(el))}
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
          <TouchableOpacity onPress={() => this.addImage()}>
            <Icon
              name="image"
              size={16}
              style={[{color: '#999', marginRight: 5}, styles.sendButton]}
            />
          </TouchableOpacity>
        </View>
        {this.state.image?.uri && (
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{paddingRight: 8}}
              onLongPress={() => this.removeImage()}>
              <Image
                style={{width: 80, height: 80}}
                source={{uri: this.state.image.uri}}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.UserReducer.user?.data?.data,
    messages: state.MessageReducer.messages,
    reciverId: state.MessageReducer.reciverId,
    senderId: state.MessageReducer.senderId,
    status: state.MessageReducer.status,
  };
};

export default connect(mapStateToProps, {getInitMessage, sendMessage})(
  Conversation,
);
