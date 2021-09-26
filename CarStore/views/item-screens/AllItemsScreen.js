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
  componentDidUpdate(prevProp) {
    if (prevProp.search_car !== this.props.search_car) {
      console.log('search', this.props.search_car);
      this.setState({listItems: this.props.search_car});
    }
  }
  renderItem({item}) {
    return (
      <CardItem data={item}></CardItem>
      //       );
    );
  }
  separateItem = () => {
    return <View style={{width: 10}}></View>;
  };
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
              renderItem={this.renderItem}
              keyExtractor={item => item.name}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={this.separateItem}
              style={{paddingTop:90}}></FlatList>

          // <ScrollView
          //   showsVerticalScrollIndicator={false}
          //   style={{
          //     height: '100%',
          //     backgroundColor: this.props.isSearch ? '#fff' : '#eee',
          //   }}>
          //   <View style={{paddingTop: this.props.isSearch ? 0 : 70}}>
          //     {this.state.listItems.map((item, index) => {
          //       return (
          //         <CardItem
          //           data={item}
          //           key={index}
          //           navigation={this.props.navigation}></CardItem>
          //       );
          //     })}
          //   </View>
          // </ScrollView>
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
