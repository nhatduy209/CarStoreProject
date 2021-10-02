import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image,ImageBackground } from 'react-native';
import { color } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class DrawerContent extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      currentScreen:''
    }
  }

  // handle navigate home 
  onHomePress = () => {
    this.setState({currentScreen:'HomeScreen'})
    this.props.navigation.navigate('HomeScreen');
  }
  onStoreInfoPress = ()=>{
    this.setState({currentScreen:'StoreInfoScreen'})
    this.props.navigation.navigate('StoreInfoScreen');
  }
  render() {
    return (
      <ImageBackground source={require('../../images/backgroundDrawer.jpg')} style={{height:'100%',borderTopRightRadius:20,borderBottomRightRadius:20}}>
        
        <View style={{height:'15%',alignSelf:'center',justifyContent:'center',marginTop:'10%'}}>
        <Image source={require('../../images/avatar.jpg')} style={{resizeMode: "center",width:100,height:100}}></Image>
        </View>
        <View style={{alignItems: 'center',justifyContent: 'center',marginBottom:'10%'}}>
              <Text style={{ fontSize: 25,fontWeight:'bold',color:'#fff' }}>
                username
              </Text>
              <Text style={{ color: '#fff' }}>
                email
              </Text>
            </View>
        {/* list item in drawer  */}
        <View>
          {/* each item  */}
          <TouchableOpacity onPress={this.onHomePress}>
            <View style={styles.itemDrawer}>
              <Icon
                size={25}
                name="user"
                style={styles.iconStyle}
              >
              </Icon>
              <Text style={styles.itemText}>
                Profile
              </Text>
            </View>
          </TouchableOpacity>
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
          <TouchableOpacity onPress={this.onHomePress}>
            <View style={styles.itemDrawer}>
              <Icon
                size={25}
                name="car"
                style={styles.iconStyle}
              >
              </Icon>
              <Text style={styles.itemText}>
                Product
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onHomePress}>
            <View style={styles.itemDrawer}>
              <Icon
                size={25}
                name="book"
                style={styles.iconStyle}
              >
              </Icon>
              <Text style={styles.itemText}>
                Policy
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onHomePress}>
            <View style={styles.itemDrawer}>
              <Icon
                size={25}
                name="phone"
                style={styles.iconStyle}
              >
              </Icon>
              <Text style={styles.itemText}>
                Contact us
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onStoreInfoPress}>
            <View style={styles.itemDrawer}>
              <Icon
                size={25}
                name="phone"
                style={styles.iconStyle}
              >
              </Icon>
              <Text style={styles.itemText}>
                Store info
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onHomePress}>
            <View style={styles.itemDrawer}>
              <Icon
                size={25}
                name="check"
                style={styles.iconStyle}
              >
              </Icon>
              <Text style={styles.itemText}>
                Log out
              </Text>
            </View>
          </TouchableOpacity>
        </View>

      </ImageBackground>
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
    color: '#fff',
    margin: 10,
  },
  itemDrawer: {
    paddingHorizontal: 40,
    paddingVertical: 14,
    flexDirection: 'row',
  },
  itemText: {
    alignSelf: 'center',
    margin: 10,
    fontSize: 16,
    color:'#fff',
    fontWeight:'bold'
  },
  choosenScreen:{
    backgroundColor:'#fff',
    marginRight:50,
    borderTopRightRadius:50,
    borderBottomRightRadius:50
  }
})
