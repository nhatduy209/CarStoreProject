import React from 'react';
import {View, ScrollView, Image, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {styles} from './Style';

export default class Conversation extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
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
        <ScrollView style={{height: '100%'}}>
          <View style={styles.conversationHeader}>
            <Text>hello 1</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}
