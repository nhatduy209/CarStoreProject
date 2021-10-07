import React from 'react';
import CurvedNavbar from 'rn-curved-navigation-bar';

export default class TabBarContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScreen: '',
    };
  }
  render() {
    return (
      <CurvedNavbar
        mainOffSetAndroid={60}
        icons={['air-horn', 'alarm', 'android-auto', 'auto-fix', 'bell-ring']}
        navColor={'#482ff7'}
        cb={() => {
          this.props.navigation.navigate('AllItemsScreen');
        }} //change the parent's state of page
      />
    );
  }
}
