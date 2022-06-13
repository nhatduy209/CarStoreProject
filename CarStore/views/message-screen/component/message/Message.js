import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {styles} from './Style';
const avatarUrlDefault =
  'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg';

export default class Message extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View
        onPress={() => this.props.navigation.push('ConvesationScreen')}
        style={[
          styles.container,
          this.props.type === 'other'
            ? {justifyContent: 'flex-start'}
            : {justifyContent: 'flex-end'},
        ]}>
        <View
          style={[
            styles.content,
            this.props.type === 'other' ? styles.otherSide : styles.mine,
          ]}>
          {this.props.shareItem && (
            <TouchableOpacity
              style={[styles.messageSharedItem]}
              onPress={() =>
                this.props.navigation.navigate('DetailItemScreen', {
                  data: this.props.shareItem,
                })
              }>
              <Image
                source={{uri: this.props.shareItem?.img ?? avatarUrlDefault}}
                style={[styles.imageSharedItem]}
              />
              <Text style={[styles.itemContent]}>
                {this.props.shareItem?.name}
              </Text>
              <Text style={[styles.itemContent]}>
                {this.props.shareItem?.category}
              </Text>
            </TouchableOpacity>
          )}
          {this.props.content && (
            <Text
              style={[
                styles.itemContent,
                this.props.type === 'other' ? styles.otherSide : styles.mine,
              ]}>
              {this.props.content}
            </Text>
          )}
        </View>
      </View>
    );
  }
}
