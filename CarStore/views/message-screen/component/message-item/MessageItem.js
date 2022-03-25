import React from 'react';
import {View, Text, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {styles} from './Style';

export default class MessageItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.push('ConvesationScreen')}
        style={styles.itemContainer}>
        <Image
          source={require('../../../../images/avatarPerson.jpeg')}
          style={styles.itemAvatar}
        />
        <View style={styles.itemContent}>
          <Text>Name</Text>
          <Text>Last message</Text>
        </View>
        <Text style={styles.lastOnline}>time</Text>
      </TouchableOpacity>
    );
  }
}
