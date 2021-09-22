import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import CardItem from './CardItem';
import RelatedCardItem from './RelatedCardItem';
class AllItemsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNull: false,
      email: '',
    };
  }
  componentDidMount() {
    // console.log("props",this.props.navigation)
  }
  render() {
    return (
      <View style={{height: '100%',backgroundColor:'white'}}>
        
        <View style={{flexDirection:'row',height:'7%',alignItems:'center',paddingHorizontal:20}}>
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}>
          <Icon
            name="arrow-left"
            size={16}
            style={{color: '#555', marginRight: 5}}></Icon>
        </TouchableOpacity>
        <Text style={{marginLeft:'25%',fontSize:20,fontWeight:'bold'}}>Choose your car</Text>
        </View>
        <View style={{flexDirection:'row'}}>
        <RelatedCardItem/>
        <RelatedCardItem/>
        </View>
        <CardItem></CardItem>
        <CardItem></CardItem>
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
    AllItemsScreen
);

const styles = StyleSheet.create({
  
});
