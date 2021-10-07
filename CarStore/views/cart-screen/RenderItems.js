import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {deleteItem} from '../../redux/action/cart-action/GetListCart';
import {connect} from 'react-redux';
class RenderItems extends React.Component {
  handleDelete = () => {
    const {_id} = this.props.item;
    const data = {
      id: _id,
      email: this.props.user.data.email,
    };
    this.props.deleteItem(data);
  };

  render() {
    const {img, car_name, quantity, color, price, category} = this.props.item;
    return (
      <View style={styles.container}>
        <Image source={{uri: img}} style={{width: 150, height: '100%'}} />

        <View style={{flex: 1}}>
          <View style={{marginBottom: 30, flexDirection: 'row'}}>
            <View>
              <Text style={{fontWeight: 'bold', fontSize: 15}}>{car_name}</Text>
              <Text style={{fontSize: 14, color: '#bbbbbb'}}>{category}</Text>
              <Text style={{fontSize: 14, color: '#bbbbbb'}}>
                Color : {color}
              </Text>
            </View>

            <TouchableOpacity
              onPress={this.handleDelete}
              style={{alignItems: 'flex-end', flex: 1}}>
              <Icon name="trash-alt" size={30} />
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontWeight: 'bold', fontSize: 15}}>{price}USD</Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                flex: 1,
              }}>
              <Text>{quantity}items</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.CartReducer.cart,
    user: state.UserReducer.user.data,
  };
};

export default connect(mapStateToProps, {deleteItem})(RenderItems);

const styles = new StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 20,
  },
  buttonIncreaseDecrease: {
    backgroundColor: '#Bbbbbb',
  },
});
