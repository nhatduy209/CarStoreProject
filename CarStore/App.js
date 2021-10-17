import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Root} from './routes/Root';
import {Provider} from 'react-redux';
import {store, persistor} from './redux/Store';
import {PersistGate} from 'redux-persist/integration/react';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Root />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    );
  }
}
