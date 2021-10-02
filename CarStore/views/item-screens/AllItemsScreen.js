import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import CardItem from './CardItem';
import {searchCar} from '../../redux/action/search-car/SearchAction';
import HeaderComponent from '../headerComponent';
import {getListCar} from '../../redux/action/get-list-car/GetListCar';
import {FlatList} from 'react-native-gesture-handler';
class AllItemsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNull: false,
      email: '',
      listItems: [],
    };
  }
  componentDidMount() {
    if (this.props.isSearch) {
      console.log('search car', this.props.search_car.data);
      this.setState({listItems: this.props.search_car.data});
    } else {
      this.props.getListCar();
      this.setState({listItems: this.props.car.data});
    }
    // console.log("prop",this.props.car)
  }
  componentDidUpdate() {
    if(!this.state.listItems)
    this.setState({listItems: this.props.search_car});
  }
  renderItem({item,navigation}) {
    return (
      <CardItem data={item} navigation={navigation}></CardItem>
      //       );
    );
  }
  separateItem = () => {
    return <View style={{width: 10}}></View>;
  };

  renderFooter = () => {
    return <View style={{height: 100}}></View>;
  }
  render() {
    return (
      <View style={{backgroundColor: !this.state.listItems ? '#fff' : '#eee'}}>
        {this.props.isSearch ? (
          <View></View>
        ) : (
          <HeaderComponent navigation={this.props.navigation} />
        )}
        {!this.state.listItems ? (
          <View>
            <Text
              style={{position: 'absolute', top: '30%', alignSelf: 'center'}}>
              No result
            </Text>
            <Image
              source={require('../../images/car.png')}
              style={{resizeMode: 'center', width: '100%'}}
            />
          </View>
        ) : (
          <FlatList
              data={this.props.car.data}
              renderItem={(item)=>this.renderItem({...item,navigation:this.props.navigation})}
              keyExtractor={item => item.name}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={this.separateItem}
              style={{paddingTop:90}}
              ListFooterComponent = {this.renderFooter}></FlatList>
        )}
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    car: state.CarReducer.car,
    search_car: state.SearchReducer.car,
  };
};

export default connect(mapStateToProps, {getListCar, searchCar})(
  AllItemsScreen,
);

const styles = StyleSheet.create({});
