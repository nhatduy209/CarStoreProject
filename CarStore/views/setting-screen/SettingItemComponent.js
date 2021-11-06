import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';

const avatarUrlDefault =
  'https://cdn-icons.flaticon.com/png/512/3899/premium/3899618.png?token=exp=1633858815~hmac=a43363f78b47cd09622836ef7277fbfb';
class SettingItemComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  renderIcon = () => {
    return !this.props.item ? (
      <View
        style={[
          styles.iconBackground,
          {height: 80, width: 80, borderRadius: 50},
        ]}>
        <Image
          source={{
            uri: this.props.user
              ? this.props.user.data.avatar
              : avatarUrlDefault,
          }}
          style={{
            height: 70,
            width: 70,
            resizeMode: 'center',
            borderRadius: 500,
          }}
        />
      </View>
    ) : (
      <View style={styles.iconBackground}>
        <Icon
          name={this.props.item.iconName}
          size={20}
          color={this.props.item.color}
        />
      </View>
    );
  };
  render() {
    return (
      <View style={styles.settingItemContainer}>
        <View>{this.renderIcon()}</View>
        <View
          style={{
            flexDirection: !this.props.item ? 'column' : 'row',
            alignItems: 'center',
            width: '60%',
          }}>
          <Text style={{fontSize: 18, width: '70%'}}>
            {!this.props.item ? 'di đĩ' : this.props.item.name}
          </Text>
          <Text style={{color: '#aaa', width: '60%'}}>
            {!this.props.item ? 'Personal Info' : 'something'}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.moreIcon}
          onPress={() => this.props.navigation.navigate('ProfileScreen')}>
          <Icon name="angle-right" size={20} />
        </TouchableOpacity>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.UserReducer.user.data,
  };
}
export default connect(mapStateToProps, {})(SettingItemComponent);
const styles = StyleSheet.create({
  settingItemContainer: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  moreIcon: {
    backgroundColor: '#ccc',
    borderRadius: 10,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBackground: {
    height: 50,
    width: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
  },
});
