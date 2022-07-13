import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Moment from 'react-moment';
import AppText from '../../i18/AppText';
import {connect} from 'react-redux';

class PurchaseItemComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.purchaseItemContainer, styles.shadowBox]}>
        {/* info */}

        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('DetailItemScreen', {
              data: this.props.item,
            });
          }}>
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
                {this.props.language === 'vi'
                  ? `${this.props.item?.prices * 23000} VND`
                  : `$${this.props.item?.prices}`}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* total price */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 12,
            borderColor: '#ddd',
            borderBottomWidth: 0.5,
          }}>
          <AppText i18nKey={'product'} />
          <View
            style={{
              flexDirection: 'row',
              width: '35%',
              justifyContent: 'space-between',
              marginRight: 10,
            }}>
            <AppText i18nKey={'Price'} />
            <Text
              style={{
                color: '#ff4d00',
              }}>
              {' '}
              {this.props.language === 'vi'
                ? `${this.props.item?.prices * 23000} VND`
                : `$${this.props.item?.prices}`}
            </Text>
          </View>
        </View>
        {this.props.isPaid && (
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
              <Moment
                date={this.props.item.selling_date}
                format="DD/MM/YYYY"
                element={Text}
                style={{
                  color: '#2dc937',
                  marginLeft: 12,
                }}
              />
            </View>
          </View>
        )}
        {/* re-buy */}
        {this.props.isPaid && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 12,
            }}>
            <AppText
              style={{color: '#aaa', marginTop: 12}}
              i18nKey={this.props.item.isRating ? 'rated' : 'unRated'}
            />
            <TouchableOpacity
              onPress={() =>
                this.props.state.setState({
                  isShow: true,
                  itemRating: this.props.item,
                  idBill: this.props.item.idBill,
                })
              }
              disabled={this.props.item.isRating ? true : false}
              style={{
                backgroundColor: this.props.item.isRating
                  ? '#bbbbbb'
                  : 'rgb(32,45,70)',
                width: 100,
                padding: 12,
                borderRadius: 10,
                marginTop: 12,
                alignSelf: 'flex-end',
              }}>
              <AppText
                style={{textAlign: 'center', color: '#fff'}}
                i18nKey={'rate'}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    language: state.LanguageReducer.language,
  };
};

export default connect(mapStateToProps, {})(PurchaseItemComponent);

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
