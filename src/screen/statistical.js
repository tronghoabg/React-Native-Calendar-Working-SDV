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
    
        var dataRow = [
                       [' Tháng 1',1,1,2,3,,5,6],
                       [' Tháng 2',1,1,2,3,,5,6],
                       [' Tháng 3',1,1,2,3,,5,6],
                       [' Tháng 4',1,1,2,3,,5,6],
                       [' Tháng 5',1,1,2,3,,5,6],
                       [' Tháng 6',1,1,2,3,,5,6],
                       [' Tháng 7',1,1,2,3,,5,6],
                       [' Tháng 8',1,1,2,3,,5,6],
                       [' Tháng 9',1,1,2,3,,5,6],
                       [' Tháng 10',1,1,2,3,,5,6],
                       [' Tháng 11',1,1,2,3,,5,6],
                       [' Tháng 12',1,1,2,3,,5,6]]

                     
        var ArrRows = dataRow.map((row) => {
                var element = row.map((col, count) => {
                    let checkStyle = {}
                    if(count ==0){
                        checkStyle = styles.phanTu1
                    }else{
                        checkStyle = styles.phanTu
                    }
                return( <View style={checkStyle}><Text style={styles.textContent}>{col}</Text></View>)
                })
                return(<View style={styles.rows}>{element}</View>)
        })
       
        return(
            <View style={styles.container}>
            <View style={styles.header}>
            <Text style={styles.title}>Thống kê</Text>
            </View>

            <View style={styles.main}>
            <View style={{flex: 4}}></View>
            <View style={{
                flex: 1,
                borderWidth: 0.3,
                borderTopRightRadius: 40,
                justifyContent: 'center',
                backgroundColor: '#eb600b'
            }}><Text style={{
                fontSize: 20,
                color: 'white'
                }}> Thống kê theo tháng</Text></View>
            <View style={{flex: 12, borderBottomEndRadius: 10}}>
            <View style={styles.rows}>
            <View style={{flex: 2, borderWidth: 0.3, alignItems: 'center', justifyContent: 'center'}}><Text style={styles.textContent}>Kíp</Text></View>
            <View style={{flex: 2, borderWidth: 0.3, alignItems: 'center', justifyContent: 'center'}}><Text style={styles.textContent}>Kíp A</Text></View>
            <View style={{flex: 2, borderWidth: 0.3, alignItems: 'center', justifyContent: 'center'}}><Text style={styles.textContent}>Kíp B</Text></View>
            <View style={{flex: 2, borderWidth: 0.3, alignItems: 'center', justifyContent: 'center'}}><Text style={styles.textContent}>Kíp C</Text></View>
            </View>
            <View style={styles.rows}>
            <View style={styles.phanTu1}><Text style={styles.textContent}>Tháng</Text></View>
            <View style={styles.phanTu}><Text style={styles.textContent}>day off</Text></View>
            <View style={styles.phanTu}><Text style={styles.textContent}>holiday</Text></View>
            <View style={styles.phanTu}><Text style={styles.textContent}>holiday</Text></View>
            <View style={styles.phanTu}><Text style={styles.textContent}>holiday</Text></View>
            <View style={styles.phanTu}><Text style={styles.textContent}>holiday</Text></View>
            <View style={styles.phanTu}><Text style={styles.textContent}>holiday</Text></View>
            </View>
            {ArrRows}
            </View>
            <View style={{flex: 10}}>
            <View style={{flex: 1}}></View>    
            <View style={{
                flex: 1,
                borderWidth: 0.3,
                borderTopRightRadius: 40,
                justifyContent: 'center',
                backgroundColor: '#eb600b'
            }}><Text style={{
                fontSize: 20,
                color: 'white'
                }}> Cả Năm</Text></View>
                <View style={{flex: 8}}>
                <View style={styles.rows}>
            <View style={{flex: 2, borderWidth: 0.3, alignItems: 'center', justifyContent: 'center'}}><Text style={styles.textContent}>Kíp</Text></View>
            <View style={{flex: 2, borderWidth: 0.3, alignItems: 'center', justifyContent: 'center'}}><Text style={styles.textContent}>Kíp A</Text></View>
            <View style={{flex: 2, borderWidth: 0.3, alignItems: 'center', justifyContent: 'center'}}><Text style={styles.textContent}>Kíp B</Text></View>
            <View style={{flex: 2, borderWidth: 0.3, alignItems: 'center', justifyContent: 'center'}}><Text style={styles.textContent}>Kíp C</Text></View>
            </View>
            <View style={styles.rows}>
            <View style={{flex: 2, borderWidth: 0.3, alignItems: 'center', justifyContent: 'center'}}><Text style={styles.textContent}>Day off</Text></View>
            <View style={{flex: 2, borderWidth: 0.3, alignItems: 'center', justifyContent: 'center'}}><Text style={styles.textContent}>30</Text></View>
            <View style={{flex: 2, borderWidth: 0.3, alignItems: 'center', justifyContent: 'center'}}><Text style={styles.textContent}>28</Text></View>
            <View style={{flex: 2, borderWidth: 0.3, alignItems: 'center', justifyContent: 'center'}}><Text style={styles.textContent}>29</Text></View>  
            </View>
            <View style={styles.rows}>
            <View style={{flex: 2, borderWidth: 0.3, alignItems: 'center', justifyContent: 'center'}}><Text style={styles.textContent}>Holiday</Text></View>
            <View style={{flex: 2, borderWidth: 0.3, alignItems: 'center', justifyContent: 'center'}}><Text style={styles.textContent}>2</Text></View>
            <View style={{flex: 2, borderWidth: 0.3, alignItems: 'center', justifyContent: 'center'}}><Text style={styles.textContent}>3</Text></View>
            <View style={{flex: 2, borderWidth: 0.3, alignItems: 'center', justifyContent: 'center'}}><Text style={styles.textContent}>3</Text></View>  
            </View>
            <View style={{flex: 6}}></View> 
                    </View>    

            </View>
                </View>
             </View>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    },
    main: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 2,
        marginRight: 2
    },
    rows: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'flex-start'
    },
    phanTu: {
        flex: 1,
        borderWidth: 0.3,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center'
    },
    phanTu1: {
        flex: 2,
        borderWidth: 0.3,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    textContent: {
        fontSize: 15,

    }
})