import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class PurchaseItemComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={[styles.purchaseItemContainer, styles.shadowBox]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 12,
            paddingBottom: 20,
          }}>
          <Text style={{fontSize: 16, fontWeight: '700'}}>Cái gì đó ở đây</Text>
          <Text style={{color: '#ff4d00', fontSize: 16}}>deliveryStatus</Text>
        </View>
        {/* info */}
        <View
          style={{
            flexDirection: 'row',
            borderColor: '#ddd',
            borderBottomWidth: 0.5,
            paddingBottom: 12,
          }}>
          <Image
            style={{
              height: 80,
              width: 80,
              borderColor: '#eee',
              borderWidth: 1,
              resizeMode: 'center',
              marginHorizontal: 8,
            }}
            source={{uri: this.props.item?.image}}
          />
          <View
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '70%',
            }}>
            <Text style={{fontSize: 20}}>{this.props.item?.car_name}</Text>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  backgroundColor: '#a70000',
                  height: 24,
                  width: 24,
                  borderRadius: 10,
                  marginRight: 12,
                }}
              />
              <Text>{this.props.item?.color}</Text>
            </View>
            <Text
              style={{
                color: '#ff4d00',
                alignSelf: 'flex-end',
                fontSize: 16,
              }}>
              ${this.props.item?.prices}
            </Text>
          </View>
        </View>

        {/* total price */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 12,
            borderColor: '#ddd',
            borderBottomWidth: 0.5,
          }}>
          <Text>1 Sản phẩm</Text>
          <View
            style={{
              flexDirection: 'row',
              width: '35%',
              justifyContent: 'space-between',
            }}>
            <Text>
              Thành tiền:{' '}
              <Text
                style={{
                  color: '#ff4d00',
                }}>{`$${this.props.item?.prices}`}</Text>
            </Text>
            <Icon name="angle-right" size={16} />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 12,
            borderColor: '#ddd',
            borderBottomWidth: 0.5,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Icon name="truck" size={16} />
            <Text
              style={{
                color: '#2dc937',
                marginLeft: 12,
              }}>
              deliveryStatus
            </Text>
          </View>

          <Icon name="angle-right" size={16} />
        </View>

        {/* re-buy */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 12,
          }}>
          <Text style={{color: '#aaa', marginTop: 12}}>Chưa được đánh giá</Text>
          <TouchableOpacity
            style={{
              backgroundColor: 'rgb(32,45,70)',
              width: 100,
              padding: 12,
              borderRadius: 10,
              marginTop: 12,
              alignSelf: 'flex-end',
            }}>
            <Text style={{textAlign: 'center', color: '#fff'}}>Mua lại</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  purchaseItemContainer: {
    backgroundColor: '#fff',
    paddingVertical: 12,
  },
  shadowBox: {
    shadowColor: '#333',
    shadowOffset: {width: -2, peak: 4},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 6,
  },
});
