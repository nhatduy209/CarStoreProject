/* eslint-disable react/no-did-mount-set-state */
import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  LayoutAnimation,
  Platform,
  Modal,
} from 'react-native';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getListCar} from '../../../redux/action/get-list-car/GetListCar';
import {removeItem} from '../../../redux/action/manage-item-action/RemoveItemAction';
import AppText from '../../../i18/AppText';
import {formatNumber} from '../../../common/Utils';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
class CardItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      showModal: false,
    };
  }
  componentDidMount() {
    // console.log("props",this.props)
    this.setState({isShow: false});
  }
  listOptionIcons = [
    {
      iconName: 'pencil',
      backgroundColor: '#99cc33',
      onPress: () => this.handleUpdertItem('Edit'),
    },
    {
      iconName: 'trash',
      backgroundColor: '#ee4035',
      onPress: () => this.handleRemoveItem(),
    },
  ];
  handleDetailItem = () => {
    this.props.isShownOption && this.props.isManagementScreen
      ? this.setState({isShow: !this.state.isShow})
      : this.props.navigation.navigate('DetailItemScreen', {
          data: this.props.data,
        });
  };
  handleUpdertItem = type => {
    this.setState({isShow: !this.state.isShow});
    this.props.navigation.navigate('UpsertItemScreen', {
      action: type,
      data: this.props.data,
    });
  };
  handleRemoveItem = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    this.setState({isShow: !this.state.isShow, showModal: true});
  };
  showOptionItem = (item, index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    return (
      <TouchableOpacity key={index} onPress={() => item.onPress()}>
        <Icon
          style={[styles.iconStyle, {backgroundColor: item.backgroundColor}]}
          name={item.iconName}
        />
      </TouchableOpacity>
    );
  };
  handleShowOption = () => {
    return this.state.isShow ? (
      <View style={styles.options}>
        {this.listOptionIcons.map((item, index) =>
          this.showOptionItem(item, index),
        )}
      </View>
    ) : (
      <View />
    );
  };
  renderDeletePopup = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showModal}>
        <View style={[styles.centeredView, styles.shadowBox]}>
          <AppText
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              textAlign: 'center',
              marginVertical: 20,
            }}
            i18nKey={'DeleteItem'}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableOpacity
              style={[styles.button, styles.buttonDelete]}
              onPress={() => {
                this.props.removeItem(this.props.data.name);
                this.setState({showModal: false});
              }}>
              <AppText
                style={{fontSize: 18, textAlign: 'center'}}
                i18nKey={'Accept'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => this.setState({showModal: false})}>
              <AppText
                style={{fontSize: 18, textAlign: 'center'}}
                i18nKey={'Cancel'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };
  render() {
    this.props.data?.saleOfPrice &&
      console.log('Log ----' + JSON.stringify(this.props.data));
    return (
      <TouchableOpacity onPress={() => this.handleDetailItem()}>
        {this.renderDeletePopup()}
        <View style={[styles.cardItem, styles.shadowBox]}>
          <View style={styles.itemInfo}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 18, color: '#aaa', width: '90%'}}>
                {this.props.data.category}
              </Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 15, width: '70%', fontWeight: 'bold'}}>
                {this.props.data.name}
              </Text>
              <Text style={{fontSize: 15, width: '50%', fontWeight: 'bold'}}>
                {this.props.language === 'vi'
                  ? this.props.data?.saleOfPrice
                    ? `${formatNumber(this.props.data?.saleOfPrice * 23000)}VNĐ`
                    : `${formatNumber(this.props.data?.prices * 23000)}VNĐ`
                  : this.props.data?.saleOfPrice
                  ? `${this.props.data?.saleOfPrice}USD`
                  : `${this.props.data?.prices}USD`}
              </Text>
            </View>
          </View>
          <View style={styles.itemImageContainer}>
            <Image
              style={[styles.imageItem, {width: '100%', height: 230}]}
              source={{uri: this.props.data.img}}
            />
            {this.props.data?.saleOfPrice && (
              <View
                style={{
                  position: 'absolute',
                  flexDirection: 'row',
                  bottom: 30,
                  right: 0,
                  zIndex: 9999,
                  transform: [{rotate: '-20deg'}],
                }}>
                <AppText
                  style={{
                    fontSize: 15,
                    color: 'red',
                  }}
                  i18nKey={'SaleOff'}></AppText>

                <Text
                  style={{
                    fontSize: 15,
                    color: 'red',
                  }}>
                  {' '}
                  {this.props.data?.percentSale}%
                </Text>
              </View>
            )}
          </View>
          {this.handleShowOption()}
        </View>
      </TouchableOpacity>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.UserReducer.user,
    language: state.LanguageReducer.language,
  };
};

export default connect(mapStateToProps, {removeItem, getListCar})(CardItem);

const styles = StyleSheet.create({
  options: {
    position: 'absolute',
    right: 0,
    top: 12,
    height: '100%',
    zIndex: 1000,
    justifyContent: 'space-evenly',
    padding: 12,
    borderRadius: 50,
  },
  showOption: {
    marginLeft: -70,
    width: '100%',
  },
  iconStyle: {
    fontSize: 20,
    color: '#fff',
    borderRadius: 50,
    padding: 15,
    width: 52,
    textAlign: 'center',
    alignSelf: 'center',
  },
  cardItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: '5%',
    width: '90%',
    height: 250,
    margin: 10,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  shadowBox: {
    shadowColor: '#bbb',
    shadowOffset: {width: -2, peak: 4},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 6,
  },
  imageItem: {
    resizeMode: 'center',
    alignSelf: 'center',
  },
  itemImageContainer: {
    marginTop: -60,
    borderRadius: 200,
    justifyContent: 'space-around',
  },
  itemInfo: {
    padding: 16,
    borderRadius: 10,
    marginTop: -20,
    zIndex: 10,
  },
  centeredView: {
    height: 180,
    width: '70%',
    top: '30%',
    backgroundColor: '#f9fafc',
    alignSelf: 'center',
    borderRadius: 10,
    padding: 20,
  },
  button: {
    padding: 12,
    borderRadius: 10,
    width: 100,
  },
  buttonDelete: {
    backgroundColor: '#ff9a00',
  },
  buttonClose: {
    backgroundColor: '#eee',
  },
});
