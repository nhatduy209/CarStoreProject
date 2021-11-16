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
import CardItem from '../item-screens/list-item/CardItem';
import {getListCarByCategory} from '../../redux/action/get-list-car/GetListCar';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
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

  componentDidUpdate(prevProps) {
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

  renderEmpty = () => (
    <View>
      <Text style={{position: 'absolute', top: '30%', alignSelf: 'center'}}>
        No result
      </Text>
      <Image
        source={require('../../images/car.png')}
        style={{resizeMode: 'center', width: '100%'}}
      />
    </View>
  );

  componentDidMount() {
    this.props.getListCarByCategory(
      this.start,
      this.end,
      this.props.route.params.category,
    );
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: !this.props.listSearchItems ? '#fff' : '#eee',
        }}>
        <FlatList
          ListHeaderComponent={this.renderHeader}
          data={
            this.props.isSearch ? this.props.listSearchItems : this.props.car
          }
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
  };
};

export default connect(mapStateToProps, {
  getListCarByCategory,
})(RenderCarCategory);

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
