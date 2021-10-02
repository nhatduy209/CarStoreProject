import React from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity, ImageBackground} from 'react-native';
import HeaderComponent from './headerComponent';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';

class StoreInfoScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  render() {
    return (
        <ImageBackground source={require('../images/backgroundDrawer.jpg')} style={{height:'100%',width:'100%'}}>
            <HeaderComponent screenTitle={'Store Information'} navigation={this.props.navigation} />
            <View style={{height:'100%'}}>
                <Text style={{fontSize:56,fontWeight:'700',color:'#fff',marginTop:100,textAlign:'center'}}>
                    Welcome
                </Text>
                <Text style={{fontSize:20,color:'#fff',marginTop:12,paddingHorizontal:16}}>
                    Address
                </Text>
                <Text style={{fontSize:20,color:'#fff',marginTop:12,paddingHorizontal:16}}>
                    Number phone
                </Text>
                <Text style={{fontSize:20,color:'#fff',marginTop:12,paddingHorizontal:16}}>
                    Rating
                </Text>
                <Text style={{fontSize:20,color:'#fff',marginTop:12,paddingHorizontal:16}}>
                    Like
                </Text>
                <TouchableOpacity style={{justifyContent:'center', padding:12,width:'60%',alignItems:'center',alignSelf:'center',marginTop:20,borderRadius:30,borderWidth:1,flexDirection:'row'}}>
                    <Icon name="heart" style={{padding:12,backgroundColor:'#fff',borderRadius:20}}></Icon>
                <Text style={{fontSize:24,color:'#fff',textAlign:'center',marginLeft:8}}>
                    Contact to us
                </Text>
                </TouchableOpacity>
                <Image source={require('../images/TestImage.png')} style={{resizeMode:'center',height:250,width:'100%',bottom:0,position:'absolute'}}/>
            </View>
        </ImageBackground>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.UserReducer.user,
  };
};

export default connect(mapStateToProps, {})(StoreInfoScreen);

const styles = StyleSheet.create({
});
