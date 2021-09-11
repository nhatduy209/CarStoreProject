import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class DrawerContent extends React.Component {

  constructor(props) {
    super(props);
  }

  // handle navigate home 
  onHomePress = () => {
    this.props.navigation.navigate('Home');
  }
  render() {
    return (
      <View>
        {/* list item in drawer  */}
        <View>
          {/* each item  */}
          <TouchableOpacity onPress={this.onHomePress}>
            <View style={styles.itemDrawer}>
              <Icon
                size={25}
                name="home"
                style={styles.iconStyle}
              >
              </Icon>
              <Text style={styles.itemText}>
                Home
              </Text>
            </View>
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    height: 200,
    borderBottomColor: '#bbbbbb',
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    color: '#bbb',
  },
  itemDrawer: {
    paddingHorizontal: 40,
    paddingVertical: 14,
    flexDirection: 'row',
  },
  itemText: {
    alignSelf: 'center',
    marginLeft: 10,
    fontSize: 15
  }
})
