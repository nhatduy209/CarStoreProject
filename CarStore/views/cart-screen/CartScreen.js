import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import RenderItems from './RenderItems';
import {connect} from 'react-redux';
import {getListCartActon} from '../../redux/action/cart-action/GetListCart';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AppText from '../../i18/AppText';
class CartScreen extends React.Component {
  constructor(props) {
    super(props);
    this.flatlistRef = null;
  }

  componentDidMount() {
    this.props.getListCartActon(this.props.user.data.email);
  }

  componentDidUpdate() {
    if (this.props.status === 'DELETE_SUCCESS') {
      this.props.getListCartActon(this.props.user.data.email);
    }
  }

  renderCartItem = ({item}) => {
    return <RenderItems item={item} navigation={this.props.navigation} />;
  };

  itemSeparatorComponent = () => {
    return (
      <View
        style={{
          height: 10,
          borderBottomWidth: 0.5,
          borderBottomColor: '#bbbbbb',
        }}
      />
    );
  };

  handleTotal = () => {
    let tong = 0;
    try {
      this.props.cart.data.forEach(item => (tong += item.price));
    } catch {
      return tong;
    }
    return tong;
  };

  handleContinueShopping = () => {
    this.props.navigation.push('Home');
    this.props.navigation.navigate('Home');
  };

  handleContact = () => {
    if (this.props.cart.data.length) {
      this.props.navigation.navigate('BookingScreen');
    } else {
      ToastAndroid.show(
        "You don't have any car to set appointment",
        ToastAndroid.LONG,
      );
    }
  };

  render() {
    const count = this.props.cart?.data?.length ?? 0;
    return (
      <View style={styles.container}>
        <AppText style={{fontSize: 27}} i18nKey={'yourCart'} />

        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 15}}>{count} items</Text>
          </View>
        </View>
        <View style={{borderBottomWidth: 1, marginVertical: 15}} />

        <View style={{height: '50%'}}>
          <FlatList
            data={this.props.cart.data}
            keyExtractor={item => item._id}
            renderItem={this.renderCartItem}
            ItemSeparatorComponent={this.itemSeparatorComponent}
          />
        </View>
        <View style={{marginTop: 10, flexDirection: 'row'}}>
          <AppText style={{fontSize: 16}} i18nKey={'subTotal'} />
          <Text style={{fontSize: 16}}>
            {' '}
            {this.handleTotal().toString()}USD
          </Text>
        </View>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
          <TouchableOpacity
            style={{
              ...styles.btnCheckout,
              backgroundColor: '#4dacff',
            }}
            onPress={this.handleContact}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <AppText
                style={{fontSize: 20, color: '#ffffff'}}
                i18nKey={'contactUs'}
              />
              <Text>{'  '}</Text>
              <Icon name="car" size={30} color="#ffffff" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.btnCheckout,
              backgroundColor: '#e6f3ff',
            }}
            onPress={this.handleContinueShopping}>
            <AppText
              style={{textAlign: 'center', fontSize: 20}}
              i18nKey={'continueShopping'}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.CartReducer.cart,
    user: state.UserReducer.user.data,
    status: state.CartReducer.status,
  };
};

export default connect(mapStateToProps, {getListCartActon})(CartScreen);

const styles = new StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
  },
  btnCheckout: {
    width: Dimensions.get('window').width - 80,
    height: 45,
    borderRadius: 20,
    justifyContent: 'center',
    marginVertical: 5,
  },
});
