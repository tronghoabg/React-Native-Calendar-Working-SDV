import React, {Component} from 'react'
import {
View,
Text,
Image
} from 'react-native'
import Calendar from './src/screen/calendar'
import Statistical from './src/screen/statistical'
import Alarm from './src/screen/alarm'
import Setting from './src/screen/setting'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';;
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';;





const Tab = createBottomTabNavigator();

 // gio dang xem cach them icon
 // gio doi mau icon selction kieu gi nhi b
export default class App extends Component {
  render(){
  return (
    
    
  <NavigationContainer>
  <Tab.Navigator>
      <Tab.Screen name="Lịch" component={Calendar} options ={{
         tabBarLabel: 'Lịch',
          tabBarIcon : ({color, size}) => (
            <Icon name="calendar" color={color} size={size} />
          )
         }}  />
      <Tab.Screen name="Thống Kê" component={Statistical} options ={{
         tabBarLabel: 'Thống Kê',
          tabBarIcon : ({color, size}) => (
            <Icon name="barschart" color={color} size={size} />
          )
         }}   />
      <Tab.Screen name="Báo Thức" component={Alarm} options ={{
         tabBarLabel: 'Báo Thức',
          tabBarIcon : ({color, size}) => (
            <MaterialIcons name="alarm" color={color} size={size} />
          )
         }}  />
      <Tab.Screen name="Cài Đặt" component={Setting} options ={{
         tabBarLabel: 'Thêm',
         tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="more-horiz" color={color} size={size} />
        ),
        
         }}  />
    </Tab.Navigator>
  </NavigationContainer>
  );
}
}

