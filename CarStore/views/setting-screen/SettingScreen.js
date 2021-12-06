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
      name: 'PurchaseHistory',
      isAccount: false,
      color: '#00b159',
      clickEvent: () => this.props.navigation.navigate('PurchaseHistoryScreen'),
    },
    {
      iconName: 'globe',
      name: 'Language',
      isAccount: false,
      statusItem: 'CurrentLanguage',
      color: '#ff7400',
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
          <AppText
            style={{fontSize: 40, paddingBottom: 40, fontWeight: '700'}}
            i18nKey={'Setting'}
          />
          {/* list item */}
          <View>
            <AppText style={styles.groupItemTitle} i18nKey={'Account'} />
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
