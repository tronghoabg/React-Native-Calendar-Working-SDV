
import PushNotification from 'react-native-push-notification'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import {Platform} from 'react-native'

 class NotificationManager{


	configure = (onRegister, onNotification,onOpenNotification ) => {
		PushNotification.configure({
			onRegister: function(token) {
				onRegister(token)
				// console.log("[NotificationManager] onRegister token:", token);
			},
			onNotification: function(notification) {
				// console.log("[NotificationManager] onNotification:", notification);
				if (Platform.OS === 'ios'){
					if(notification.data.openedInForeground){
						notification.userInteraction = true
					}
				}else{
					notification.userInteraction = true
				}

				if(notification.userInteraction){
					onOpenNotification(notification)
				}else{
					onNotification(notification)
				}
				// process the notification
			
				// required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
				if (Platform.OS === 'ios') {
					if (!notification.data.openedInForeground) { 
						notification.finish('backgroundFetchResultNoData')
					}
				}else{
				notification.finish('backgroundFetchResultNoData');
					}
			  },
		})


	}
	
	
	_buildAndroidNotification = (id, title, message, data = {}, options ={}) => {
		return {
			id: id,
			autoCancel: true,
			largeIcon: options.largeIcon || "ic_laucher",
			smallIcon: options.smallIcon	|| "ic_laucher",
			bigText: message || '',
			subText: title || '',
			vibrate: options.vibrate || false,
			vibration: options.vibration || 300,
            priority: options.priority || "high",
            importance: options.importance || "high",
			data: data

		}
	}

	_buildIOSNotification = (id, title, message, data ={}, options ={}) => {
		return {
			alertAction: options.alertAction || "view",
			category: options.category || "",
			userInfo: {
				id: id,
				item: data
			}
		}
	}
	
	showNotification = (id, title, message, data ={} , options = {}) => {
		PushNotification.localNotification({
			/* Android Only Properties */
			...this._buildAndroidNotification(id, title,message,data,options),
			/* IOS Only Properties */
			...this._buildIOSNotification(id, title,message,data,options),
			/* Android And IOS Properties */
			title: title || "",
			message: message || "",
			playSound: options.playSound || false,
			soundName: options.soundName || 'default',
			userInteraction: false // If the notification was opend by the user from the notification area not
		})
	}

	cancelAllLocalNotification = () => {
		if (Platform.OS === 'ios'){
			PushNotificationIOS.removeAllDeliveredNotifications()
		}else{
			PushNotification.cancelAllLocalNotifications()
		}
	}

	unregister = () => {
		PushNotification.unregister
	}

}
export const notificationManager = new NotificationManager()
