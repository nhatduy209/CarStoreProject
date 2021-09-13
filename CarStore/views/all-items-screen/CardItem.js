import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';

class CardItem extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // console.log("props",this.props.navigation)
  }
  render() {
    return (
      <View style={[styles.cardItem,styles.shadowBox]}>
        <Text style={{fontSize:18,color:'#aaa'}}>Ferrari</Text>
        <View style={{flexDirection: 'row',alignItems:'center'}}>
        <Text style={{fontSize:18,width:'70%',fontWeight:'bold'}}>sf90-stradale</Text>
        <Text style={{fontSize:18,width:'30%',fontWeight:'bold'}}>$168,125</Text>
        </View>
        
        <Image
          style={[styles.imageItem, {width: 300, height: 250}]}
          source={require('../../images/TestImage.png')}
        />
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.UserReducer.user,
  };
};

export default connect(mapStateToProps, {})(CardItem);

const styles = StyleSheet.create({
  cardItem: {
    backgroundColor: '#eee',
    borderRadius: 8,
    marginHorizontal: '5%',
    width: '90%',
    height: 250,
    margin: 10,
    paddingTop:20,
    paddingHorizontal:20
  },
  shadowBox: {
    shadowColor: '#bbb',
    shadowOffset: {width: -2, peak: 4},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 6,
  },
  imageItem: {
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: -40,
  },
});
