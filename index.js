import { registerRootComponent } from 'expo';
import App from './App';
import PushNotification from 'react-native-push-notification'
import NavigationService from './src/util/Navigator';

PushNotification.configure({
  onNotification: function (notification) {

    switch (notification.data.type) {
      // case 'Payment':

      //   const data = {
      //     id_order: parseInt(notification.data.id_order),
      //     flag: parseInt(notification.data.flag),
      //   }


      //   NavigationService.navigate('DetailOrderScreen', data);
        
      //   break;

      case 'Chatting':
        const datas = {
          type: notification.data.type,
          id_order: notification.data.id_order,
          trx_id: notification.data.trx_id,
          chat_content: notification.data.message,
          nama_mitra: notification.data.nama_mitra,
          nama_user: notification.data.nama_customer,
          token_receiver: notification.data.token_receiver,
          token_sender: notification.data.token_sender,
          flag: notification.data.flag,
        }
        // console.log(notification.data)
        NavigationService.navigate('ChattingScreen', datas);

        break;
    
      default:
        break;
    }
    
    // console.log('LOCAL NOTIFICATIONs ==>', notification)
    // NavigationService.navigate('ChattingScreen', data);
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
