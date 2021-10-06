import React from 'react';
import CurvedNavBar from 'rn-curved-navigation-bar';

export default class TabBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }
  componentDidMount() {
    console.log('prop', this.props);
  }
  componentDidUpdate(prevState) {
    if (prevState.page !== this.state.page) {
      if (this.state.page === 1) {
        this.props.prop.navigate('HomeScreen');
      }
    }
  }
  render() {
    return (
      <CurvedNavBar
        mainOffSetAndroid={60}
        icons={['air-horn', 'alarm', 'android-auto', 'auto-fix', 'bell-ring']}
        navColor={'#482ff7'}
        cb={id => {
          this.setState({page: id});
        }} //change the parent's state of page
      />
    );
  }
}
