import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  UIManager,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import CardItem from './CardItem';
import {searchCar} from '../../../redux/action/search-car/SearchAction';
import HeaderComponent from '../../headerComponent';
import {getListCar} from '../../../redux/action/get-list-car/GetListCar';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {setDefaultListColor} from '../../../redux/action/list-color/ListColorAction';
import {reloadListItem} from '../../../redux/action/manage-item-action/ReloadListItemAction';
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
class AllItemsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countItem: 0,
      listItems: [],
    };
    // get limit item in db
    this.start = 0;
    this.end = 5;
    this.canLoadMore = true;
  }
  componentDidMount() {
    // if (this.props.isSearch) {
    //   this.setState({listItems: this.props.search_car.data});
    // } else {
    //   this.props.getListCar(this.start, this.end);
    //   this.setState({listItems: this.props.car.data});
    //   this.setState({
    //     countItem: this.props.car.data ? this.props.car.data.length : 0,
    //   });
    // }
    // console.log('prop', this.props.car);
  }
  componentDidUpdate(prevProps) {
    // if (prevProps !== this.props) {
    //   this.setState({
    //     countItem: this.props.car.data ? this.props.car.data.length : 0,
    //   });
    // }
    // if (this.props.reload) {
    //   this.props.getListCar();
    //   this.props.reloadListItem();
    // }
    // if (!this.state.listItems) {
    //   this.setState({listItems: this.props.search_car});
    //   this.setState({
    //     countItem: this.props.car.data ? this.props.car.data.length : 0,
    //   });
    // }
    console.log(' LENGTH ---- ', prevProps.car.length, this.props.car.length);
    if (prevProps.car.length === this.props.car.length) {
      this.canLoadMore = false;
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

  renderFooter = () => (
    <View style={{height: 80}}>
      <ActivityIndicator size="large" color="red" />
    </View>
  );

  showAddContainer = () => {
    <Text>Count Item {this.state.countItem}</Text>;
    return (
      <View style={styles.addContainer}>
        <Text style={{fontSize: 20}}>Item Count: {this.state.countItem}</Text>
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

  loadMoreItem = () => {
    console.log('THIS --', this.canLoadMore);
    if (this.canLoadMore) {
      this.start += 5;
      this.end = 5;
      this.props.getListCar(this.start, this.end);
    } else {
      // eslint-disable-next-line no-alert
      alert('All cars is shown on screen');
    }
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
            data={this.props.car}
            renderItem={item =>
              this.renderItem({...item, navigation: this.props.navigation})
            }
            keyExtractor={item => item.name}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={this.separateItem}
            style={{paddingTop: 80}}
            ListFooterComponent={this.renderFooter()}
            onEndReachedThreshold={1}
            onEndReached={({distanceFromEnd}) =>
              // problem
              this.loadMoreItem()
            }
          />
        )}
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    car: state.CarReducer.car,
    reload: state.CarReducer.reload ?? false,
    search_car: state.SearchReducer.car,
  };
};

export default connect(mapStateToProps, {
  getListCar,
  searchCar,
  reloadListItem,
  setDefaultListColor,
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
