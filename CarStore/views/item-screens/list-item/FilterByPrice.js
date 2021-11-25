import React from 'react';
import {
  View,
  Text,
  UIManager,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import CardItem from './CardItem';
import {getListCarByPrice} from '../../../redux/action/get-list-car/GetListCar';
import {FlatList, TextInput} from 'react-native-gesture-handler';
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
class FilterByPrice extends React.Component {
  constructor(props) {
    super(props);
    this.minPrice = 0;
    this.maxPrice = 0;
    this.state = {filter: false};
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
    return <View style={{height: 50}} />;
  };

  renderHeaderImplement = () => {
    return (
      <View
        style={{
          marginTop: 40,
          paddingHorizontal: 16,
          flexDirection: 'row',
        }}>
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 20, paddingVertical: 8}}>Min price</Text>
            <TextInput
              style={styles.filterInput}
              keyboardType="numeric"
              onChangeText={text => this.setPrice(text, true)}
              value={this.minPrice}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 20, paddingVertical: 8}}>Max price</Text>
            <TextInput
              style={styles.filterInput}
              keyboardType="numeric"
              onChangeText={text => this.setPrice(text, false)}
              value={this.maxPrice}
            />
          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            padding: 8,
            width: 70,
            borderRadius: 10,
            justifyContent: 'center',
            margin: 20,
          }}
          onPress={() => this.handelFilter()}>
          <Text style={{alignSelf: 'center', fontSize: 16}}>filter</Text>
        </TouchableOpacity>
      </View>
    );
  };

  handelFilter = () => {
    if (this.minPrice < this.maxPrice) {
      this.setState({filter: true});
      this.props.listFilterByPrice(true);
      this.props.getListCarByPrice(this.minPrice, this.maxPrice);
    } else {
      this.setState({filter: false});
      this.props.listFilterByPrice(false);
    }
  };

  setPrice = (value, isMinPrice) => {
    isMinPrice
      ? (this.minPrice = value ? parseInt(value, 10) : 0)
      : (this.maxPrice = value ? parseInt(value, 10) : 0);
    if (this.minPrice === 0 || this.maxPrice === 0) {
      this.setState({filter: false});
      this.props.listFilterByPrice(false);
    }
  };
  renderList = () => {
    return this.state.filter ? (
      <FlatList
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
      <View />
    );
  };

  render() {
    return (
      <View
        style={{
          top: 30,
          marginLeft: 16,
        }}>
        {this.renderHeaderImplement()}
        {this.renderList()}
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    carPrice: state.CarReducer.car_price,
  };
};

export default connect(mapStateToProps, {
  getListCarByPrice,
})(FilterByPrice);

const styles = StyleSheet.create({
  filterInput: {
    borderWidth: 1,
    borderColor: '#aaa',
    color: '#000',
    borderRadius: 10,
    width: '50%',
    height: 36,
    marginTop: 4,
    paddingHorizontal: 12,
  },
});
