import React from 'react';
import {
  View,
  Text,
  Image,
  UIManager,
  Platform,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import CardItem from '../item-screens/list-item/CardItem';
import Select from '@redmin_delishaj/react-native-select';
import {
  getListCarByCategory,
  reloadListCarCategory,
  getListCarByPrice,
} from '../../redux/action/get-list-car/GetListCar';
import {FlatList} from 'react-native-gesture-handler';
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
class RenderCarCategory extends React.Component {
  constructor(props) {
    super(props);
    this.start = this.props.car.length;
    this.end = 5;
    this.canLoadMore = true;
    this.minPrice = null;
    this.maxPrice = null;
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
  separateItem = () => <View style={{width: 10}} />;

  renderFooter = () => <View style={{height: 70}} />;

  renderHeader = () => {
    return this.props.isManagementScreen ? this.showAddContainer() : <View />;
  };

  loadMoreItem = () => {
    if (this.canLoadMore) {
      this.start += 5;
      this.props.getListCarByCategory(
        this.start,
        this.end,
        this.props.route.params.category,
      );
    } else {
      ToastAndroid.show('All Cars have been shown', ToastAndroid.LONG);
    }
  };

  renderEmpty = () => {
    return this.props.status === 'SUCCESS' ? (
      <View>
        <Text style={{position: 'absolute', top: '30%', alignSelf: 'center'}}>
          No result
        </Text>
        <Image
          source={require('../../images/car.png')}
          style={{resizeMode: 'center', width: '100%'}}
        />
      </View>
    ) : (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ffffff',
        }}>
        <ActivityIndicator size="large" color="#bbbbbb" />
      </View>
    );
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

  getListCarByPrice = () => {
    if (this.minPrice && this.maxPrice) {
      this.props.getListCarByPrice(this.minPrice, this.maxPrice);
    }
  };

  setMaxPrice = value => {
    this.maxPrice = value;
    this.getListCarByPrice();
  };

  setMinPrice = value => {
    this.minPrice = value;
    this.getListCarByPrice();
  };

  renderHeaderImplement = () => {
    return (
      <View style={{flexDirection: 'row', paddingLeft: 16}}>
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

  componentDidMount() {
    this.props.getListCarByCategory(
      this.start,
      this.end,
      this.props.route.params.category,
    );
  }

  componentWillUnmount() {
    this.props.reloadListCarCategory();
  }

  renderListCar = () => {
    return this.minPrice && this.maxPrice ? (
      <FlatList
        ListHeaderComponent={this.renderHeader}
        data={this.props.carPrice}
        renderItem={item =>
          this.renderItem({...item, navigation: this.props.navigation})
        }
        ListEmptyComponent={this.renderEmpty}
        keyExtractor={item => item.name}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={this.separateItem}
        style={{paddingTop: 10}}
        ListFooterComponent={this.renderFooter}
      />
    ) : (
      <FlatList
        ListHeaderComponent={this.renderHeader}
        data={this.props.car}
        renderItem={item =>
          this.renderItem({...item, navigation: this.props.navigation})
        }
        ListEmptyComponent={this.renderEmpty}
        keyExtractor={item => item.name}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={this.separateItem}
        style={{paddingTop: 10}}
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
          backgroundColor: '#ffffff',
          flex: 1,
        }}>
        {this.renderHeaderImplement()}
        {this.renderListCar()}
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    car: state.CarReducer.car_category,
    carPrice: state.CarReducer.car_price,
    status: state.CarReducer.status_loading,
  };
};

export default connect(mapStateToProps, {
  getListCarByCategory,
  reloadListCarCategory,
  getListCarByPrice,
})(RenderCarCategory);
