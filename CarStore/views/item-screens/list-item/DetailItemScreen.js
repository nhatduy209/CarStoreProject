/* eslint-disable react/no-did-mount-set-state */
import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import HeaderComponent from '../../headerComponent';
import RelatedItemList from './RelatedItemList';
import {addToCart} from '../../../redux/action/cart-action/AddToCart';
import {connect} from 'react-redux';
import {STATUS} from '../../../config/Status';
import {ModalComponent} from '../../modal/ModalComponent';
import AppText from '../../../i18/AppText';
import {Rating} from 'react-native-ratings';
import {getListComment} from '../../../redux/action/comment/CommentAction';
import {showToastSuccess, showToastFail} from '../../../common/Utils';
import {getDetail} from '../../../redux/action/get-detail-car/GetDetailCar';
import {formatNumber} from '../../../common/Utils';

class DetailItemScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedItems: [],
      quantity: 0,
      isShow: false,
      rating: 3,
    };
  }
  componentDidMount() {
    this.props.getListComment(
      this.props.route.params.data.name ??
        this.props.route.params.data.car_name,
    );
    this.props.getDetail(
      this.props.route.params.data.name ??
        this.props.route.params.data.car_name,
    );
    console.log(this.props.route.params.data);
    const list = this.props.car.filter(item => {
      return item.category === this.props.route.params.data.category;
    });
    this.setState({relatedItems: list});
  }
  componentDidUpdate() {
    const name = this.props.detail_car?.data?.name;
    if (this.props.cart.status === 'ADD_SUCCESS') {
      showToastSuccess('Sucess', `Add ${name} to cart successfully`);
      this.props.cart.status = STATUS.FAIL;
    }
    if (this.props.cart.status === 'ADD_FAIL') {
      showToastFail('Error', `${name} already exist in your cart`);
      this.props.cart.status = STATUS.FAIL;
    }
  }
  handleAddToCart() {
    if (this.props.user?.data?.data?.email) {
      const data = {
        email: this.props.user.data.data.email,
        name: this.props.detail_car?.data?.name,
        color: this.props.detail_car?.data?.color[0].color,
        quantity: this.state.quantity,
        price: this.props.detail_car?.data?.prices,
        url: this.props.detail_car?.data?.img,
      };
      this.props.addToCart(data);
    } else {
      this.setState({isShow: true});
    }
  }
  renderRelatedItem = () => {
    return this.state.relatedItems.length === 0 ? (
      <View style={{height: 20}} />
    ) : (
      <View>
        <View
          style={{
            paddingHorizontal: 20,
            marginTop: 20,
          }}>
          <AppText i18nKey={'releatedItem'} />
        </View>
        <RelatedItemList
          data={this.state.relatedItems}
          navigation={this.props.navigation}
        />
      </View>
    );
  };

  render() {
    console.log('OH HELLO DETAIL  ---', this.props?.detail_car);
    let totalRating = 0;
    if (this.props?.comment) {
      this.props?.comment?.data?.map(
        item => (totalRating = totalRating + item.rating),
      );
    }

    return (
      <View style={{height: '100%'}}>
        <HeaderComponent
          navigation={this.props.navigation}
          screenTitle={this.props.route.params.data.name}
        />
        <ModalComponent
          navigation={this.props.navigation}
          state={this}
          isShow={this.state.isShow}
          descriptionText="You are not login, please login first"
          textAction="Sign in"
          textCancel="Cancel"
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{height: '100%', backgroundColor: '#eee'}}>
          <View style={styles.itemImageContainer}>
            <Image
              style={[styles.imageItem, {width: '100%', height: '100%'}]}
              source={{
                uri: this.props.detail_car?.data?.img,
              }}
            />
          </View>
          <View style={styles.infoContainer}>
            <View
              style={[
                styles.itemInfo,
                styles.shadowBox,
                {padding: 16, marginTop: -30},
              ]}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.name}>
                  {this.props.detail_car?.data?.name}
                </Text>
                <Text style={styles.price}>
                  {this.props.language === 'vi'
                    ? `${formatNumber(
                        this.props.detail_car?.data?.prices * 23000,
                      )}VNĐ`
                    : `${formatNumber(this.props.detail_car?.data?.prices)}USD`}
                </Text>
              </View>
            </View>
            {this.renderRelatedItem()}
            <View
              style={{
                paddingHorizontal: 20,
                marginTop: 20,
              }}>
              <AppText i18nKey={'carInfo'} />
            </View>
            <View style={[styles.Description, {padding: 16}]}>
              <View style={{alignItems: 'center'}}>
                <View style={[styles.Description_row]}>
                  <AppText style={styles.titleDescrition} i18nKey={'width'} />
                  <Text style={styles.valueDescrition}>
                    {this.props.detail_car?.data?.width}
                  </Text>
                </View>
                <View style={[styles.Description_row]}>
                  <AppText style={styles.titleDescrition} i18nKey={'length'} />
                  <Text style={styles.valueDescrition}>
                    {this.props.detail_car?.data?.length}
                  </Text>
                </View>
                <View style={[styles.Description_row]}>
                  <AppText style={styles.titleDescrition} i18nKey={'heigth'} />
                  <Text style={styles.valueDescrition}>
                    {this.props.detail_car?.data?.height}
                  </Text>
                </View>
                <View style={[styles.Description_row]}>
                  <AppText
                    style={styles.titleDescrition}
                    i18nKey={'Category'}
                  />
                  <Text style={styles.valueDescrition}>
                    {this.props.detail_car?.data?.category}
                  </Text>
                </View>
                <View style={[styles.Description_row]}>
                  <AppText
                    style={styles.titleDescrition}
                    i18nKey={'description'}
                  />
                  <Text style={styles.valueDescrition}>
                    {this.props.detail_car?.data?.description}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              marginHorizontal: 20,
              marginBottom: 80,
              backgroundColor: '#ffffff',
              borderRadius: 5,
            }}>
            <View style={{padding: 10}}>
              <AppText i18nKey={'commentItem'} style={{fontSize: 16}} />
              <View style={{alignItems: 'flex-start', flexDirection: 'row'}}>
                <Rating
                  type="star"
                  ratingCount={5}
                  imageSize={20}
                  readonly
                  startingValue={
                    totalRating / (this.props.comment?.data?.length || 1)
                  }
                />
                <Text>
                  {' '}
                  (
                  {(
                    totalRating / (this.props.comment?.data?.length || 1)
                  ).toFixed(2)}
                  /5){' '}
                </Text>
                <TouchableOpacity
                  style={{marginLeft: 'auto'}}
                  onPress={() =>
                    this.props.navigation.navigate('CommentScreen', {
                      name: this.props.route.params.data.name,
                    })
                  }>
                  <AppText
                    style={{marginLeft: 'auto', color: 'red'}}
                    i18nKey={'seeAllComment'}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('CartStack');
            }}
            style={[
              styles.btnBuy,
              styles.shadowBox,
              {backgroundColor: '#9695c1'},
            ]}>
            <Text style={styles.btn__text}>Go to cart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.handleAddToCart()}
            style={[
              styles.btnBuy,
              styles.shadowBox,
              {backgroundColor: '#fff'},
            ]}>
            <Text style={styles.btn__text}>Add to cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.UserReducer.user,
    car: state.CarReducer.car,
    cart: state.CartReducer,
    comment: state.CommentReducer.comment.data,
    detail_car: state.CarReducer.detail.data,
    language: state.LanguageReducer.language,
  };
};

export default connect(mapStateToProps, {addToCart, getDetail, getListComment})(
  DetailItemScreen,
);

const styles = StyleSheet.create({
  imageItem: {
    resizeMode: 'center',
    alignSelf: 'center',
  },
  infoContainer: {
    backgroundColor: '#eee',
    marginTop: -10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  name: {
    fontSize: 15,
  },
  btnContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 30,
    paddingBottom: 10,
  },
  btn__text: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  btnBuy: {
    width: '45%',
    justifyContent: 'center',
    padding: 10,
    height: 60,
    borderRadius: 30,
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  shadowBox: {
    shadowColor: '#bbb',
    shadowOffset: {width: -2, peak: 4},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 6,
  },
  itemImageContainer: {
    marginHorizontal: -40,
    justifyContent: 'space-around',
    // backgroundColor: '#9695c1',
    backgroundColor: '#fff',
    height: 400,
  },
  itemInfo: {
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    zIndex: 10,
    marginHorizontal: 20,
  },
  chat: {
    position: 'absolute',
    right: 0,
    borderColor: '#000',
    borderWidth: 0.5,
    borderRadius: 30,
    width: 160,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },
  contact: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 50,
    zIndex: 10,
    margin: 16,
    marginHorizontal: 32,
  },
  count: {backgroundColor: '#ccc', borderRadius: 20, padding: 10, width: '40%'},
  Description: {
    margin: 16,
    padding: 8,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  Description_row: {
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleDescrition: {width: '35%', fontSize: 14, color: '#ccc'},
  valueDescrition: {width: '65%', fontSize: 14, fontWeight: 'bold'},
});
