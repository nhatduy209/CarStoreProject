import React from 'react';
import {
  View,
  StyleSheet,
  Image,Text
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
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
      <View style={[styles.relatedCardItem,styles.shadowBox]}>
        <Image
          style={[styles.imageItem, {width: 150, height: 100}]}
          source={require('../../images/TestImage.png')}
        />
        <Text style={{fontSize:14,color:'#aaa',width:'30%'}}>Ferrari</Text>
        <Text style={{fontSize:14,width:'70%',fontWeight:'bold'}}>sf90-stradale</Text>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.UserReducer.user,
  };
};

export default connect(mapStateToProps, {})(
    RelatedCardItem
);

const styles = StyleSheet.create({
  relatedCardItem:{
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 45,
    paddingHorizontal: 15,
    width: '45%',
    height:170,
    margin: 10,
  },
  shadowBox:{
    shadowColor: '#000',
    shadowOffset: {width: -2, peak: 4},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation:6,
  },imageItem: {
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: -40,
  },
});
