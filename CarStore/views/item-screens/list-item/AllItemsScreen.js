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
import {connect} from 'react-redux';
import CardItem from './CardItem';
import {searchCar} from '../../../redux/action/search-car/SearchAction';
import HeaderComponent from '../../headerComponent';
import {
  getListCar,
  getListCarByPrice,
} from '../../../redux/action/get-list-car/GetListCar';
import {reloadListItem} from '../../../redux/action/manage-item-action/ReloadListItemAction';
import {FlatList} from 'react-native-gesture-handler';
import {setDefaultListColor} from '../../../redux/action/list-color/ListColorAction';
import FilterByPrice from './FilterByPrice';
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

    this.state = {
      filterByPrice: false,
      shouldLoad: true,
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.car.length === this.props.car.length && this.canLoadMore) {
      this.canLoadMore = false;
      this.setState({shouldLoad: false});
    }

    if (this.props.reload) {
      console.log('reload', this.props.car.length, prevProps.car.length);
      this.start = 0;
      this.props.getListCar(this.start, this.end);
      this.props.reloadListItem();
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
        <View style={{height: 160}}>
          <ActivityIndicator size="large" color="red" />
        </View>
      );
    } else {
      return <View style={{height: 150}} />;
    }
  };

  loadMoreItem = () => {
    if (this.canLoadMore) {
      this.start += 5;
      this.props.getListCar(this.start, this.end);
    } else {
      this.canLoadMore = false;
      ToastAndroid.show('All Cars have been shown', ToastAndroid.LONG);
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
    return this.state.filterByPrice ? (
      <View />
    ) : (
      <FlatList
        data={this.props.isSearch ? this.props.listSearchItems : this.props.car}
        renderItem={item =>
          this.renderItem({...item, navigation: this.props.navigation})
        }
        ListEmptyComponent={this.renderEmpty}
        keyExtractor={item => item.name}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={this.separateItem}
        style={{marginTop: 50}}
        ListFooterComponent={() => this.canLoadMore && this.renderFooter()}
        onEndReachedThreshold={1}
        onEndReached={({distanceFromEnd}) =>
          // problem
          this.loadMoreItem()
        }
      />
    );
  };

  renderFilter = () => {
    return this.props.isManagementScreen ? (
      <View />
    ) : (
      <FilterByPrice
        navigation={this.props.navigation}
        listFilterByPrice={value => this.setState({filterByPrice: value})}
      />
    );
  };

  render() {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          paddingBottom: this.props.isManagementScreen ? 0 : 120,
        }}>
        {this.props.isSearch ? (
          <View />
        ) : (
          <HeaderComponent
            navigation={this.props.navigation}
            screenTitle={this.props.screenTitle}
          />
        )}
        {this.renderFilter()}
        {this.renderListCar()}
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    car: state.CarReducer.car,
    reload: state.CarReducer.reload ?? false,
    carPrice: state.CarReducer.car_price,
    search_car: state.SearchReducer.car,
  };
};

export default connect(mapStateToProps, {
  getListCar,
  searchCar,
  setDefaultListColor,
  getListCarByPrice,
  reloadListItem,
})(AllItemsScreen);
