import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {_retrieveData} from '../../common/Utils';
import {TOKEN_DEVICE} from '../../config/StorageKey';
import {logout} from '../../redux/action/login-action/LoginAction';
import AppText from '../../i18/AppText';
import LottieView from 'lottie-react-native';
const avatarUrlDefault =
  'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg';
class DrawerContent extends React.Component {
  constructor(props) {
    super(props);
  }

  // handle navigate home
  onHomePress = () => {
    this.props.navigation.navigate('HomeScreenStack');
  };
  onStoreInfoPress = () => {
    this.props.navigation.navigate('StoreInfoScreen');
  };
  onManagePress = () => {
    this.props.navigation.navigate('ManageItemScreenStack', {
      isManagementScreen: true,
    });
  };
  onSettingPress = () => {
    this.props.navigation.navigate('SettingScreenStack');
  };

  onMessagePress = () => {
    this.props.navigation.navigate('MessageScreenStack');
  };

  logout = async () => {
    const getToken = await _retrieveData(TOKEN_DEVICE);
    this.props.logout(this.props?.user.email, getToken);
  };

  onMessagePress = () => {
    this.props.navigation.navigate('ConvesationScreen');
  };

  listDrawerItems = [
    {
      iconName: require('../../config/lotties/home-icon.json'),
      textContent: 'Home',
      handlePress: this.onHomePress,
    },
    {
      iconName: require('../../config/lotties/car-icon.json'),
      textContent: 'Product',
      handlePress: this.onManagePress,
    },
    {
      iconName: require('../../config/lotties/store-icon.json'),
      textContent: 'StoreInfo',
      handlePress: this.onStoreInfoPress,
    },
    {
      iconName: require('../../config/lotties/setting-icon.json'),
      textContent: 'Setting',
      handlePress: this.onSettingPress,
    },
    {
      iconName: require('../../config/lotties/home-icon.json'),
      textContent: 'Statistic',
      handlePress: this.onStatisticPress,
    },
    {
      iconName: require('../../config/lotties/message-icon.json'),
      textContent: 'Message',
      handlePress: this.onMessagePress,
    },
    {
      iconName: require('../../config/lotties/logout-icon.json'),
      textContent: 'Logout',
      handlePress: this.logout,
    },
  ];
  cloneListDrawerItems = () => {
    if (this.props.user?.role !== 'admin') {
      return this.listDrawerItems.filter(
        item =>
          item.textContent !== 'Statistic' && item.textContent !== 'Product',
      );
    }
    return this.listDrawerItems;
  };
  renderDrawerItem(item, index) {
    return (
      <TouchableOpacity key={index} onPress={item.handlePress}>
        <View style={styles.itemDrawer}>
          <View style={styles.iconStyle}>
            {/* <Icon size={20} name={item.iconName} color={'#bae1ff'} /> */}
            <View style={styles.lotties}>
              <LottieView autoPlay loop source={item.iconName} />
            </View>
          </View>
          <AppText style={styles.itemText} i18nKey={item.textContent} />
        </View>
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <View
        style={{
          height: '100%',
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          backgroundColor: 'rgb(32,45,70)',
        }}>
        <Image
          source={{uri: this.props.user?.image ?? avatarUrlDefault}}
          style={{
            width: 120,
            height: 120,
            marginTop: '10%',
            marginBottom: 12,
            borderRadius: 60,
            alignSelf: 'center',
          }}
        />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '10%',
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>
            {this.props.user?.name ?? 'Add your name'}
          </Text>
          <Text style={{color: '#fff'}}>
            {this.props.user?.email ?? 'mail@gmail.com'}
          </Text>
        </View>
        {/* list item in drawer  */}
        <View>
          {/* each item  */}
          {this.cloneListDrawerItems().map((item, index) =>
            this.renderDrawerItem(item, index),
          )}
        </View>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.UserReducer.user?.data?.data,
  };
}
export default connect(mapStateToProps, {logout})(DrawerContent);
const styles = StyleSheet.create({
  headerStyle: {
    height: 200,
    borderBottomColor: '#bbbbbb',
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    color: '#bae1ff',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lotties: {
    backgroundColor: 'transparent',
    height: 35,
    width: 35,
  },
  itemDrawer: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    alignSelf: 'center',
    margin: 10,
    fontSize: 16,
    color: '#bae1ff',
    fontWeight: 'bold',
    textAlign: 'left',
    width: '70%',
  },
  choosenScreen: {
    backgroundColor: '#fff',
    marginRight: 50,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  },
});
