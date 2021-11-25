import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  UIManager,
  Platform,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import CardItem from './CardItem';
import {searchCar} from '../../../redux/action/search-car/SearchAction';
import HeaderComponent from '../../headerComponent';
import {
  getListCar,
  getListCarByPrice,
} from '../../../redux/action/get-list-car/GetListCar';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import Select from '@redmin_delishaj/react-native-select';
import {setDefaultListColor} from '../../../redux/action/list-color/ListColorAction';
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
class AllItemsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.start = this.props.car.length;
    this.end = 5;
    this.canLoadMore = true;
    this.minPrice = null;
    this.maxPrice = null;
  }
  componentDidUpdate(prevProps) {
    if (prevProps.car.length === this.props.car.length) {
      this.canLoadMore = false;
      ToastAndroid.show('All Cars have been shown', ToastAndroid.LONG);
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
    const isSearch = this.props.isSearch ?? false;
    if (this.canLoadMore && !isSearch) {
      return (
        <View style={{height: 80}}>
          <ActivityIndicator size="large" color="red" />
        </View>
      );
    } else {
      return <View style={{height: 50}} />;
    }
  };

  showAddContainer = () => {
    return (
      <View style={styles.addContainer}>
        <Text style={{fontSize: 20}}>Item Count: {this.props.car.length}</Text>
        <TouchableOpacity
          onPress={() => {
            this.props.setDefaultListColor();
            this.props.navigation.navigate('UpsertItemScreen', {action: 'Add'});
          }}
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

  prices = () => {
    const list = [];
    for (let i = 2; i < 21; i++) {
      const item = {
        text: (i * 10000).toString(),
        value: i * 10000,
      };
      list.push(item);
    }
    return list;
  };

  config = {
    fontSize: 18,
    textColor: '#000',
    borderWidth: 0.5,
    borderColor: '#eee',
    borderRadius: 10,
  };

  checkTypeOfValue = (min, max) => {
    if (
      !min ||
      typeof min === 'undefined' ||
      !max ||
      typeof max === 'undefined'
    ) {
      return false;
    }
    return true;
  };

  renderHeaderImplement = () => {
    return (
      <View style={{flexDirection: 'row', paddingLeft: 20, marginTop: 40}}>
        <View style={{width: '50%'}}>
          <Text style={{fontSize: 20, paddingVertical: 8}}>Min price</Text>
          <Select
            data={this.prices()}
            onSelect={value => this.setMinPrice(value)}
            value={this.minPrice}
            config={this.config}
          />
        </View>
        <View style={{width: '50%'}}>
          <Text style={{fontSize: 20, paddingVertical: 8}}>Max price</Text>
          <Select
            data={this.prices()}
            onSelect={value => this.setMaxPrice(value)}
            value={this.maxPrice}
            config={this.config}
          />
        </View>
      </View>
    );
  };

  getListCarByPrice = () => {
    console.log('max', typeof this.maxPrice, this.maxPrice);
    console.log('min', typeof this.minPrice, this.minPrice);
    if (
      this.checkTypeOfValue(this.minPrice, this.maxPrice) &&
      this.minPrice < this.maxPrice
    ) {
      console.log('search');
      this.props.getListCarByPrice(this.minPrice, this.maxPrice);
    }
  };

  setMaxPrice = value => {
    this.maxPrice = parseInt(value, 10);
    this.getListCarByPrice();
  };

  setMinPrice = value => {
    this.minPrice = parseInt(value, 10);
    this.getListCarByPrice();
  };

  loadMoreItem = () => {
    if (this.canLoadMore) {
      this.start += 5;
      this.props.getListCar(this.start, this.end);
    }
  };

  renderEmpty = () => (
    <View>
      <Text style={{position: 'absolute', top: '30%', alignSelf: 'center'}}>
        No result
      </Text>
      <Image
        source={require('../../../images/car.png')}
        style={{resizeMode: 'center', width: '100%'}}
      />
    </View>
  );

  renderListCar = () => {
    return this.checkTypeOfValue(this.minPrice, this.maxPrice) &&
      this.minPrice < this.maxPrice ? (
      <FlatList
        ListHeaderComponent={this.renderHeader}
        data={this.props.carPrice}
        renderItem={item =>
          this.renderItem({...item, navigation: this.props.navigation})
        }
        keyExtractor={item => item.name}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={this.separateItem}
        ListFooterComponent={<View style={{height: 70}} />}
        style={{paddingTop: 10}}
      />
    ) : (
      <FlatList
        ListHeaderComponent={this.renderHeader}
        data={this.props.isSearch ? this.props.listSearchItems : this.props.car}
        renderItem={item =>
          this.renderItem({...item, navigation: this.props.navigation})
        }
        ListEmptyComponent={this.renderEmpty}
        keyExtractor={item => item.name}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={this.separateItem}
        style={{paddingTop: 80}}
        ListFooterComponent={this.renderFooter}
        onEndReachedThreshold={1}
        onEndReached={({distanceFromEnd}) =>
          // problem
          this.loadMoreItem()
        }
      />
    );
  };

  render() {
    return (
      <View
        style={{
          backgroundColor: !this.props.listSearchItems ? '#fff' : '#eee',
        }}>
        {this.props.isSearch ? (
          <View />
        ) : (
          <HeaderComponent
            navigation={this.props.navigation}
            screenTitle={this.props.screenTitle}
          />
        )}
        {this.renderHeaderImplement()}
        {this.renderListCar()}
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    car: state.CarReducer.car,
    carPrice: state.CarReducer.car_price,
    search_car: state.SearchReducer.car,
  };
};

export default connect(mapStateToProps, {
  getListCar,
  searchCar,
  setDefaultListColor,
  getListCarByPrice,
})(AllItemsScreen);

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
