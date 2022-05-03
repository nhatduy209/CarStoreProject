import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Collapsible from 'react-native-collapsible';
import AppText from '../../i18/AppText';
import {connect} from 'react-redux';
import {changeLanguage} from '../../redux/action/change-language/ChangeLanguageAction';
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
      onPress={() => {
        this.setState({isNotShow: true});
        this.props.changeLanguage(this.props.language === 'en' ? 'vi' : 'en');
      }}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
      }}>
      <AppText style={{fontSize: 18}} i18nKey={'ChangeLanguage'} />
      <AppText style={{fontSize: 18}} i18nKey={'LanguageChange'} />
    </TouchableOpacity>
  );

  handleItem = () => {
    this.props.item?.name === 'Language'
      ? this.setState({isNotShow: false})
      : this.props.item?.clickEvent();
  };

  renderCollase = () => {
    if (this.props.item?.name === 'Language') {
      return (
        <Collapsible collapsed={this.state.isNotShow}>
          {this.changeLanguageOption()}
        </Collapsible>
      );
    }
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
            {!this.props.item ? (
              <Text style={{fontSize: 18, ...styles.text}}>
                {this.props.user?.data?.name}
              </Text>
            ) : (
              <AppText
                style={{fontSize: 18, ...styles.text}}
                i18nKey={this.props.item.name}
              />
            )}

            {this.props.item?.statusItem && (
              <AppText
                style={{color: '#bbbbbb'}}
                i18nKey={this.props.item.statusItem}
              />
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
        {this.renderCollase()}
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.UserReducer.user.data,
    language: state.LanguageReducer.language,
  };
}
export default connect(mapStateToProps, {changeLanguage})(SettingItemComponent);
const styles = StyleSheet.create({
  settingItemContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    width: '72%',
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
