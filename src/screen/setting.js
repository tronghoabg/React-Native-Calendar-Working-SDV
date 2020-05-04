import React, {Component} from 'react'

import{
View,
Text,
StyleSheet,
Button,
TouchableOpacity,
Image
} from 'react-native'

import Icon from 'react-native-elements'
import imgUri from '../icon/calendar.png'
export default class Alarm extends Component{
    render(){
        return(

            <View style={styles.container}>
            <View style={styles.header}>
            <Text style={styles.title}>More...</Text>
            </View>
            
             </View>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    header:{
        height: '15%',
        width: '100%',
        backgroundColor: '#317ddf',
        borderBottomWidth:1,
        borderBottomColor: '#aba9ae',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
    },
    title: {
        fontSize: 30,
        color: 'white',
        marginLeft: 15,
        fontWeight: 'bold'
    }
})