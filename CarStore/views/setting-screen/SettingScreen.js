import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import HeaderComponent from '../headerComponent';
import SettingItemComponent from './SettingItemComponent';

export default class SettingScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  renderSettingItem = (item, index) => {
    return <SettingItemComponent key={index} item={item} />;
  };
  listItem = [
    {
      iconName: 'globe',
      name: 'Language',
      isAccount: false,
      color: '#ff7400',
    },
    {
      iconName: 'bell',
      name: 'Notifications',
      isAccount: false,
      color: '#189ad3',
    },
    {
      iconName: 'comment',
      name: 'Help',
      isAccount: false,
      color: '#005b96',
    },
  ];
  render() {
    return (
      <View>
        <HeaderComponent navigation={this.props.navigation} />
        <View style={styles.settingContainer}>
          <Text style={{fontSize: 40, paddingBottom: 40, fontWeight: '700'}}>
            Settings
          </Text>
          {/* list item */}
          <View>
            <Text style={styles.groupItemTitle}>Account</Text>
            <SettingItemComponent />
            <Text style={styles.groupItemTitle}>Account</Text>
            {this.listItem.map((item, index) =>
              this.renderSettingItem(item, index),
            )}
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  settingContainer: {
    height: '100%',
    paddingHorizontal: 30,
    marginTop: 120,
  },
  groupItemTitle: {
    fontSize: 24,
    marginBottom: 20,
  },
});
