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
    const {car_img, car_name, color, price, category} = this.props.item;
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.push('DetailItemScreen', {
            data: this.props.item,
          })
        }
        style={styles.container}>
        <Image
          source={{uri: car_img}}
          style={{width: 150, height: '100%', resizeMode: 'contain'}}
        />

        <View style={{flex: 1}}>
          <View style={{marginBottom: 30, flexDirection: 'row'}}>
            <View>
              <Text style={{fontWeight: 'bold', fontSize: 15}}>{car_name}</Text>
              <Text style={{fontSize: 14, color: '#bbbbbb'}}>{category}</Text>
              <Text style={{fontSize: 14, color: '#bbbbbb'}}>
                Color : {color}
              </Text>
            </View>

            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <TouchableOpacity onPress={this.handleDelete}>
                <Icon name="trash-alt" size={30} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontWeight: 'bold', fontSize: 15}}>{price}USD</Text>
          </View>
        </View>
      </TouchableOpacity>
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
