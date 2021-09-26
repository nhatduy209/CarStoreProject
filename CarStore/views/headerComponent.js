import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // console.log("props",this.props.navigation)
  }
  render() {
    return (
      <View
        style={{
          position: 'absolute',
          width: '100%',
          zIndex: 100,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
        }}>
          <Image source={require('../images/headerbg.png')} style={{resizeMode:'stretch',height:100,opacity:0.8,width:'100%',position:'absolute'}}/>
        <View
          style={{
            flexDirection: 'row',
            height: 50,
            alignItems: 'center',
            paddingHorizontal: 20,
            position: 'relative',
            top: 10,
          }}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon
              name="arrow-left"
              size={16}
              style={{color: '#fff', marginRight: 5}}></Icon>
          </TouchableOpacity>
          <Text style={{marginLeft: '25%', fontSize: 20, fontWeight: 'bold',color:'#fff'}}>
            Choose your car
          </Text>
        </View>
        {this.props.search ? (
          <View style={styles.Input}>
            <Icon
              name="search"
              size={16}
              style={{color: '#555', marginRight: 5}}></Icon>
            <TextInput style={{flex: 1, color: '#000'}}></TextInput>
          </View>
        ) : (
          <View></View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  Input: {
    borderWidth: 0.5,
    borderRadius: 10,
    paddingHorizontal: 10,
    borderColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '2%',
    marginHorizontal: 10,
    position: 'relative',
    top: 10,
  },
});
