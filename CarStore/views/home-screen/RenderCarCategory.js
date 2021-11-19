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
import {
  getListCarByCategory,
  reloadListCarCategory,
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
        <ActivityIndicator size="large" color="#bbbbbb"></ActivityIndicator>
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

  render() {
    return (
      <View
        style={{
          backgroundColor: '#ffffff',
          flex: 1,
        }}>
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
          style={{paddingTop: 80}}
          ListFooterComponent={this.renderFooter}
          onEndReachedThreshold={1}
          onEndReached={({distanceFromEnd}) =>
            // problem
            this.loadMoreItem()
          }
        />
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    car: state.CarReducer.car_category,
    status: state.CarReducer.status_loading,
  };
};

export default connect(mapStateToProps, {
  getListCarByCategory,
  reloadListCarCategory,
})(RenderCarCategory);
