import { registerRootComponent } from 'expo';
import App from './App';
import PushNotification from 'react-native-push-notification'

PushNotification.configure({
  onNotification: function (notification) {
      console.log('LOCAL NOTIFICATION ==>', notification)
  },

  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios'
})

PushNotification.createChannel(
  {
      channelId: "not1",
      channelName: "Channel", 
  },
  (created) => console.log(`createChannel returned '${created}'`) 
);

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
