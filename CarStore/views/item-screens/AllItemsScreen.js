import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import CardItem from './CardItem';
import RelatedCardItem from './RelatedCardItem';
import HeaderComponent from '../headerComponent';
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
      <View style={{backgroundColor: '#ddd'}}>
        <HeaderComponent navigation={this.props.navigation} />
        <ScrollView style={{height: '100%'}}>
          <View style={{paddingTop: 70}}>
            <CardItem navigation={this.props.navigation}></CardItem>
            <CardItem navigation={this.props.navigation}></CardItem>
            <CardItem navigation={this.props.navigation}></CardItem>
            <CardItem navigation={this.props.navigation}></CardItem>
            <CardItem navigation={this.props.navigation}></CardItem>
            <CardItem navigation={this.props.navigation}></CardItem>
            <CardItem navigation={this.props.navigation}></CardItem>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.UserReducer.user,
  };
};

export default connect(mapStateToProps, {})(AllItemsScreen);

const styles = StyleSheet.create({});
