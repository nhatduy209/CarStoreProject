import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';

const avatarUrlDefault =
  'https://cdn-icons.flaticon.com/png/512/3899/premium/3899618.png?token=exp=1633858815~hmac=a43363f78b47cd09622836ef7277fbfb';
class DrawerContent extends React.Component {
  constructor(props) {
    super(props);
  }

  // handle navigate home
  onHomePress = () => {
    this.props.navigation.navigate('HomeScreenStack');
  };
  onStoreInfoPress = () => {
    this.props.navigation.navigate('StoreScreenStack');
  };
  onStatisticPress = () => {
    this.props.navigation.navigate('StatisticScreen');
  };
  onManagePress = () => {
    this.props.navigation.navigate('ManageItemScreenStack', {
      isManagementScreen: true,
    });
  };
  onSettingPress = () => {
    this.props.navigation.navigate('SettingScreenStack');
  };
  listDrawerItems = [
    {
      iconName: 'home',
      textContent: 'Home',
      handlePress: this.onHomePress,
    },
    {
      iconName: 'car',
      textContent: 'Product',
      handlePress: this.onManagePress,
    },
    {
      iconName: 'book',
      textContent: 'Policy',
      handlePress: this.onHomePress,
    },
    {
      iconName: 'phone',
      textContent: 'Store Info',
      handlePress: this.onStoreInfoPress,
    },
    {
      iconName: 'gear',
      textContent: 'Setting',
      handlePress: this.onSettingPress,
    },
    {
      iconName: 'snapchat',
      textContent: 'Statistic',
      handlePress: this.onStatisticPress,
    },
    {
      iconName: 'check',
      textContent: 'Log out',
      handlePress: this.onHomePress,
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
            <Icon size={20} name={item.iconName} color={'#bae1ff'} />
          </View>
          <Text style={styles.itemText}>{item.textContent}</Text>
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
        <View
          style={{
            height: 120,
            width: 120,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '10%',
            backgroundColor: '#ccc',
            borderRadius: 60,
          }}>
          <Image
            source={{uri: this.props.user?.image ?? avatarUrlDefault}}
            style={{
              resizeMode: 'center',
              width: 100,
              height: 100,
              borderRadius: 500,
            }}
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '10%',
          }}>
          <Text style={{fontSize: 25, fontWeight: 'bold', color: '#fff'}}>
            {this.props.user?.userName ?? 'di hong cu te'}
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
export default connect(mapStateToProps, {})(DrawerContent);
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
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#bae1ff',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#444',
  },
  itemDrawer: {
    paddingHorizontal: 40,
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
    width: '50%',
  },
  choosenScreen: {
    backgroundColor: '#fff',
    marginRight: 50,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  },
});
