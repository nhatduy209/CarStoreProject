import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';

class SettingItemComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log(this.props.user.data.email);
  }
  renderIcon = () => {
    return !this.props.item ? (
      <View
        style={[
          styles.iconBackground,
          {height: 80, width: 80, borderRadius: 50},
        ]}>
        <Image
          source={{uri: this.props.user.data.avatar}}
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
            {!this.props.item
              ? this.props.user.data.email
              : this.props.item.name}
          </Text>
          <Text style={{color: '#aaa', width: '60%'}}>
            {!this.props.item ? 'Personal Info' : 'something'}
          </Text>
        </View>
        <View style={styles.moreIcon}>
          <Icon name="angle-right" size={20} />
        </View>
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
