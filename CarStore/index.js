/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';
import {_storeData} from './common/Utils';
import {TOKEN_DEVICE} from './config/StorageKey';
AppRegistry.registerComponent(appName, () => App);

// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log('TOKEN:', token);
    _storeData(TOKEN_DEVICE, token.token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);

    PushNotification.localNotification({
      channelId: notification.channelId,
      message: notification.message,
      title: notification.title,
    });
    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },
});

PushNotification.createChannel(
  {
    channelId: 'CarStore', // (required)
    channelName: 'My channel', // (required)
    channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    importance: 4,
  },
  created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

PushNotification.getChannels(function (channel_ids) {
  console.log(channel_ids); // ['channel_id_1']
});
