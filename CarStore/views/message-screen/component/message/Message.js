import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './Style';

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
          {/* <Image
            source={require('../../../../images/avatarPerson.jpeg')}
            style={[
              styles.itemAvatar,
              this.props.type === 'other'
                ? {display: 'flex'}
                : {display: 'none'},
            ]}
          /> */}
          <Text
            style={[
              styles.itemContent,
              this.props.type === 'other' ? styles.otherSide : styles.mine,
            ]}>
            {this.props.content}
          </Text>
          {/* <Image
            source={require('../../../../images/avatarPerson.jpeg')}
            style={[
              styles.itemAvatar,
              this.props.type === 'other'
                ? {display: 'none'}
                : {display: 'flex'},
            ]}
          /> */}
        </View>
      </View>
    );
  }
}
