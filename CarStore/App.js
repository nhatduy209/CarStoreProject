import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Root} from './routes/Root';
import {Provider} from 'react-redux';
import store from './redux/Store';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </Provider>
    );
  }
}
