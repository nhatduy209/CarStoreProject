import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import HeaderComponent from '../headerComponent';
import {FlatList} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {getListCar} from '../../redux/action/get-list-car/GetListCar';
import {getHistoryItem} from '../../redux/action/history-item/HistoryItemAction';
import PurchaseItemComponent from './PurchaseItemComponent';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AppText from '../../i18/AppText';
import {Rating} from 'react-native-ratings';
import {addComment, reload} from '../../redux/action/comment/CommentAction';
import {STATUS} from '../../config/Status';
import {showToastFail, showToastSuccess} from '../../common/Utils';
import {ModalComponent} from '../modal/ModalComponent';

const deliveryStatus = [
  {
    value: 0,
    label: 'Booking',
  },
  {
    value: 1,
    label: 'Confirmed',
  },
  {
    value: 2,
    label: 'Payment',
  },
];
class PurchaseHistoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0,
      isShow: false,
      isType: false,
      comment: '',
      rating: 0,
      itemRating: {},
      isShowTimeoutSession: false,
      idBill: '',
    };
    this.car = [];
  }
  componentDidMount() {
    this.props.getHistoryItem(this.props.user.data?.email);
  }

  componentDidUpdate() {
    if (this.props.comment.canAddComment === STATUS.SUCCESS) {
      showToastSuccess('Success', 'Thanks you for giving us comment');
      this.props.getHistoryItem(this.props.user.data?.email);
      this.props.reload();
      this.setState({isShow: false});
    }
    if (this.props.comment.canAddComment === STATUS.FAIL) {
      showToastFail('Fail', 'Error occurs , please try again');
      this.props.reload();
    }

    if (this.props.status === STATUS.UNAUTHORIED) {
      if (!this.state.isShowTimeoutSession) {
        this.setState({isShowTimeoutSession: true});
      }
    }
  }

  renderItem = ({item, navigation, isPaid = false}) => {
    return (
      <PurchaseItemComponent
        item={item}
        navigation={navigation}
        isPaid={isPaid}
        state={this}
      />
    );
  };
  renderHeaderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={
          item.value === this.state.currentTab
            ? styles.selectedTab
            : styles.unSelectedTab
        }
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
    return <View style={{width: 50}} />;
  };

  shouldRenderCar = () => {
    switch (this.state.currentTab) {
      case 0:
        this.car = this.props.historyItem?.bookingItem || [];
        break;
      case 1:
        this.car = this.props.historyItem?.confirmedItem || [];
        break;
      case 2:
        this.car = this.props.historyItem?.historyItem || [];
        break;
      default:
        break;
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

  typing = value => {
    if (!this.state.isType) {
      this.setState({isType: true});
    }
    this.setState({comment: value});
  };

  ratingCompleted = value => {
    this.setState({rating: parseFloat(value)});
  };

  handleRating = () => {
    console.log('Log ----' + this.state.idBill);
    this.props.addComment({
      comment: this.state.comment,
      rating: this.state.rating,
      email: this.props.user.data.email,
      idBill: this.state.idBill,
      ...this.state.itemRating,
    });
  };

  renderModal = () => (
    <Modal visible={this.state.isShow} transparent={true} animationType="slide">
      <View
        style={{
          flex: 1,
          backgroundColor: '#ffffff',
          marginTop: '30%',
        }}>
        <View style={{flexDirection: 'row', margin: 20}}>
          <TouchableOpacity
            onPress={() => this.setState({isShow: false, isType: false})}>
            <Icon name="times" size={30} />
          </TouchableOpacity>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}>
            <AppText style={{fontSize: 20}} i18nKey={'feedback'} />
          </View>
        </View>
        <View style={{marginHorizontal: 50, marginBottom: 10}}>
          <TextInput
            onChangeText={this.typing}
            editable
            multiline
            maxLength={40}
            style={{
              ...styles.inputText,
              backgroundColor: this.state.isType ? '#ffffff' : '#f5f5f5',
              borderWidth: this.state.isType ? 1 : 0,
              borderColor: this.state.isType ? 'red' : '#f5f5f5',
            }}
            placeholder="Share what you think"
          />

          <View style={{alignItems: 'flex-start'}}>
            <Rating
              style={{marginTop: 10}}
              type="star"
              ratingCount={5}
              imageSize={20}
              onFinishRating={this.ratingCompleted}
              startingValue={this.state.rating}
            />
          </View>

          <View style={{alignItems: 'flex-end'}}>
            <TouchableOpacity
              onPress={() => this.handleRating()}
              style={{backgroundColor: '#c63939', borderRadius: 10}}>
              <AppText
                i18nKey={'post'}
                style={{fontSize: 18, color: '#ffffff', padding: 10}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  render() {
    this.shouldRenderCar();

    return (
      <View ststtyle={{backgroundColor: '#fff'}}>
        <HeaderComponent navigation={this.props.navigation} />
        {this.renderModal()}
        <ModalComponent
          navigation={this.props.navigation}
          state={this}
          isShow={this.state.isShowTimeoutSession}
          descriptionText="Your session is expired , please login again"
          textAction="Sign in"
          textCancel="Cancel"
        />
        <AppText
          style={{
            fontSize: 32,
            paddingBottom: 20,
            paddingHorizontal: 30,
            marginTop: 60,
            fontWeight: '500',
            alignSelf: 'center',
          }}
          i18nKey={'purchaseHistory'}
        />
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
        <ScrollView>
          <FlatList
            data={this.car}
            renderItem={item =>
              this.state.currentTab === 2
                ? this.renderItem({
                    ...item,
                    navigation: this.props.navigation,
                    isPaid: true,
                  })
                : this.renderItem({
                    ...item,
                    navigation: this.props.navigation,
                  })
            }
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={this.separateItem}
            style={styles.purchaseHistoryContainer}
            ListFooterComponent={this.renderFooter}
            ListEmptyComponent={this.renderEmpty}
          />
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.UserReducer.user.data,
    historyItem: state.HistoryItemReducer.historyItem,
    comment: state.CommentReducer,
    status: state.HistoryItemReducer.status,
  };
};

export default connect(mapStateToProps, {
  getListCar,
  getHistoryItem,
  addComment,
  reload,
})(PurchaseHistoryScreen);
const styles = StyleSheet.create({
  purchaseHistoryContainer: {
    height: '100%',
    backgroundColor: '#fefefe',
  },
  selectedTab: {
    borderColor: 'rgb(32,45,70)',
    borderBottomWidth: 2,
    width: 100,
  },
  unSelectedTab: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
  },
  shadowBox: {
    shadowColor: '#333',
    shadowOffset: {width: -2, peak: 4},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 6,
  },
  inputText: {
    height: 150,
    borderRadius: 20,
    width: '100%',
  },
});
