import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Collapsible from 'react-native-collapsible';

import {connect} from 'react-redux';

const avatarUrlDefault =
  'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg';
class SettingItemComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNotShow: true,
    };
  }
  renderIcon = () => {
    return !this.props.item ? (
      <Image
        source={{
          uri: this.props.user?.data?.image ?? avatarUrlDefault,
        }}
        style={{
          height: 80,
          width: 80,
          borderRadius: 40,
        }}
      />
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
  changeLanguageOption = () => (
    <TouchableOpacity
      onPress={() => this.setState({isNotShow: true})}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
      }}>
      <Text style={{fontSize: 18}}>Change Language to </Text>
      <Text style={{fontSize: 18}}>Vietnamese</Text>
    </TouchableOpacity>
  );

  handleItem = () => {
    this.setState({isNotShow: false});
  };

  render() {
    return (
      <View>
        <View style={styles.settingItemContainer}>
          <View>{this.renderIcon()}</View>
          <View
            style={{
              flexDirection: !this.props.item ? 'column' : 'row',
              alignItems: 'center',
              width: '60%',
            }}>
            <Text style={{fontSize: 18, ...styles.text}}>
              {!this.props.item
                ? this.props.user?.data?.name
                : this.props.item.name}
            </Text>

            {this.props.item?.statusItem && (
              <Text style={{color: '#bbbbbb'}}>
                {this.props.item.statusItem}
              </Text>
            )}

            <Text style={{color: '#aaa', ...styles.text}}>
              {!this.props.item ? this.props.user.data.email : ''}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.moreIcon}
            onPress={
              this.props.item
                ? this.handleItem
                : () => this.props.navigation.navigate('ProfileScreen')
            }>
            <Icon name="angle-right" size={20} />
          </TouchableOpacity>
        </View>
        <Collapsible collapsed={this.state.isNotShow}>
          {this.changeLanguageOption()}
        </Collapsible>
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
    marginVertical: 10,
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    width: '80%',
    justifyContent: 'flex-end',
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
