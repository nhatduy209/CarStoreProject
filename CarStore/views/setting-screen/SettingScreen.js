import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import HeaderComponent from '../headerComponent';
import SettingItemComponent from './SettingItemComponent';
import AppText from '../../i18/AppText';
import {ScrollView} from 'react-native-gesture-handler';
export default class SettingScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  renderSettingItem = (item, index) => {
    return <SettingItemComponent key={index} item={item} />;
  };
  listItem = [
    {
      iconName: 'clipboard',
      name: 'Purchase History',
      isAccount: false,
      color: '#00b159',
      clickEvent: () => this.props.navigation.navigate('PurchaseHistoryScreen'),
    },
    {
      iconName: 'globe',
      name: 'Language',
      isAccount: false,
      statusItem: 'English',
      color: '#ff7400',
    },
    {
      iconName: 'bell',
      name: 'Notifications',
      statusItem: 'turn off',
      isAccount: false,
      color: '#189ad3',
      clickEvent: () => console.log('Notification'),
    },
    {
      iconName: 'comment',
      name: 'Help',
      isAccount: false,
      color: '#005b96',
      clickEvent: () => console.log('help'),
    },
  ];
  render() {
    return (
      <ScrollView>
        <HeaderComponent navigation={this.props.navigation} />
        <View style={styles.settingContainer}>
          <Text style={{fontSize: 40, paddingBottom: 40, fontWeight: '700'}}>
            Settings
          </Text>
          {/* list item */}
          <View>
            <Text style={styles.groupItemTitle}>Account</Text>
            <SettingItemComponent
              subItem={-1}
              navigation={this.props.navigation}
            />
            {/* <Text style={styles.groupItemTitle}>Settings</Text> */}
            <AppText style={styles.groupItemTitle} i18nKey={'Settings'} />
            {this.listItem.map((item, index) =>
              this.renderSettingItem(item, index),
            )}
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  settingContainer: {
    height: '100%',
    paddingHorizontal: 30,
    marginTop: 80,
  },
  groupItemTitle: {
    fontSize: 24,
    marginBottom: 20,
  },
});
