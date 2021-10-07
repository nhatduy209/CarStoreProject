import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {connect} from 'react-redux';

class RelatedCardItem extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // console.log("props",this.props.navigation)
  }
  render() {
    return (
      <View style={[styles.relatedCardItem, styles.shadowBox]}>
        <Image
          style={[styles.imageItem, {width: 150, height: 100}]}
          source={{uri:this.props.data.img}}
        />
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <View>
          <Text style={{fontSize:14,color:'#aaa'}}>{this.props.data.category}</Text>
          <Text style={{fontSize:14,fontWeight:'bold'}}>{this.props.data.name}</Text>
          </View>
          <Text style={{fontSize:14}}>${this.props.data.prices}</Text>
        </View>
        
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.UserReducer.user,
    isShow: state.ModalReducer.isShow,
  };
};

export default connect(mapStateToProps, {})(RelatedCardItem);

const styles = StyleSheet.create({
  relatedCardItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 45,
    paddingHorizontal: 15,
    width: 240,
    height:170,
    margin: 10,
  },
  shadowBox: {
    shadowColor: '#000',
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
