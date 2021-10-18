/* eslint-disable react/no-did-mount-set-state */
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import CardItem from './CardItem';
import {searchCar} from '../../../redux/action/search-car/SearchAction';
import HeaderComponent from '../../headerComponent';
import {getListCar} from '../../../redux/action/get-list-car/GetListCar';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
class AllItemsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countItem: 0,
      listItems: [],
    };
  }
  componentDidMount() {
    if (this.props.isSearch) {
      this.setState({listItems: this.props.search_car.data});
    } else {
      this.props.getListCar();
      this.setState({listItems: this.props.car.data});
      this.setState({
        countItem: this.props.car.data ? this.props.car.data.length : 0,
      });
    }
    // console.log('prop', this.props.car);
  }
  componentDidUpdate() {
    if (!this.state.listItems) {
      this.setState({listItems: this.props.search_car});
      this.setState({
        countItem: this.props.car.data ? this.props.car.data.length : 0,
      });
    }
  }
  renderItem({item, navigation}) {
    return (
      <CardItem
        data={item}
        navigation={navigation}
        isShownOption={true}
        isManagementScreen={this.props.isManagementScreen}
      />
    );
  }
  separateItem = () => {
    return <View style={{width: 10}} />;
  };

  renderFooter = () => {
    return <View style={{height: 100}} />;
  };
  showAddContainer = () => {
    <Text>Count Item {this.state.countItem}</Text>;
    return (
      <View style={styles.addContainer}>
        <Text style={{fontSize: 20}}>Item Count: {this.state.countItem}</Text>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('UpsertItemScreen', {action: 'add'})
          }
          style={[
            styles.btnBuy,
            styles.shadowBox,
            {backgroundColor: '#9695c1'},
          ]}>
          <Icon style={styles.btn__text} name="plus" />
        </TouchableOpacity>
      </View>
    );
  };
  renderHeader = () => {
    return this.props.isManagementScreen ? this.showAddContainer() : <View />;
  };
  render() {
    return (
      <View style={{backgroundColor: !this.state.listItems ? '#fff' : '#eee'}}>
        {this.props.isSearch ? (
          <View />
        ) : (
          <HeaderComponent
            navigation={this.props.navigation}
            screenTitle={this.props.screenTitle}
          />
        )}

        {!this.state.listItems ? (
          <View>
            <Text
              style={{position: 'absolute', top: '30%', alignSelf: 'center'}}>
              No result
            </Text>
            <Image
              source={require('../../../images/car.png')}
              style={{resizeMode: 'center', width: '100%'}}
            />
          </View>
        ) : (
          <FlatList
            ListHeaderComponent={this.renderHeader}
            data={this.props.car.data}
            renderItem={item =>
              this.renderItem({...item, navigation: this.props.navigation})
            }
            keyExtractor={item => item.name}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={this.separateItem}
            style={{paddingTop: 120}}
            ListFooterComponent={this.renderFooter}
          />
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

const styles = StyleSheet.create({
  addContainer: {
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  btnBuy: {
    width: 80,
    justifyContent: 'center',
    padding: 10,
    height: 60,
    borderRadius: 30,
  },
  shadowBox: {
    shadowColor: '#bbb',
    shadowOffset: {width: -2, peak: 4},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 6,
  },
  btn__text: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
