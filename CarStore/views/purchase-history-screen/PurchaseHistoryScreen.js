import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import HeaderComponent from '../headerComponent';
import {FlatList} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {getListCar} from '../../redux/action/get-list-car/GetListCar';
import PurchaseItemComponent from './PurchaseItemComponent';
import {TouchableOpacity} from 'react-native-gesture-handler';
const deliveryStatus = [
  {
    value: 0,
    label: 'confirming',
  },
  {
    value: 1,
    label: 'confirmed',
  },
  {
    value: 2,
    label: 'delivering',
  },
  {
    value: 3,
    label: 'deliveried',
  },
  {
    value: 4,
    label: 'not confirmed',
  },
];
class PurchaseHistoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0,
    };
  }
  componentDidMount() {
    this.props.getListCar(0, 5);
  }
  renderItem = ({item, navigation}) => {
    return <PurchaseItemComponent item={item} navigation={navigation} />;
  };
  renderHeaderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={item.value === this.state.currentTab ? styles.selectedTab : ''}
        onPress={() => this.setState({currentTab: item.value})}>
        <Text
          style={[
            {padding: 8, fontSize: 16},
            item.value === this.state.currentTab
              ? {color: 'rgb(32,45,70)', fontWeight: '700'}
              : {color: '#000'},
          ]}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };
  renderFooter = () => {
    return <View style={{height: 200}} />;
  };
  separateItem = () => {
    return <View style={{height: 10}} />;
  };
  separateHeaderItem = () => {
    return <View style={{width: 20}} />;
  };
  render() {
    return (
      <View style={{backgroundColor: '#fff'}}>
        <HeaderComponent navigation={this.props.navigation} />
        <Text
          style={{
            fontSize: 32,
            paddingBottom: 20,
            paddingHorizontal: 30,
            marginTop: 60,
            fontWeight: '700',
            alignSelf: 'center',
          }}>
          Purchase History
        </Text>
        <FlatList
          data={deliveryStatus}
          horizontal
          renderItem={item => this.renderHeaderItem(item)}
          keyExtractor={item => item.value}
          showsHorizontalScrollIndicator={false}
          style={{
            backgroundColor: '#fff',
            marginBottom: 12,
            height: 50,
            borderBottomWidth: 2,
            borderColor: '#eee',
          }}
          ItemSeparatorComponent={this.separateHeaderItem}
        />
        <FlatList
          data={this.props.car}
          renderItem={item =>
            this.renderItem({...item, navigation: this.props.navigation})
          }
          keyExtractor={item => item.name}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={this.separateItem}
          style={styles.purchaseHistoryContainer}
          ListFooterComponent={this.renderFooter}
        />
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    car: state.CarReducer.car,
  };
};

export default connect(mapStateToProps, {getListCar})(PurchaseHistoryScreen);
const styles = StyleSheet.create({
  purchaseHistoryContainer: {
    height: '100%',
    backgroundColor: '#fefefe',
  },
  selectedTab: {
    borderColor: 'rgb(32,45,70)',
    borderBottomWidth: 2,
  },
  shadowBox: {
    shadowColor: '#333',
    shadowOffset: {width: -2, peak: 4},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 6,
  },
});
