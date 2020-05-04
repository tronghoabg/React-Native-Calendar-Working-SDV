import React, {Component} from 'react'

import{
View,
Text,
StyleSheet,
Button,
TouchableOpacity,
StatusBar
} from 'react-native'
import Icon from 'react-native-elements'
export default class Calendar extends Component{

  constructor(props){
    super(props)
    this.state = {
      activeDate: new Date(),
      daySelection: 'Ngày ' + new Date().getDate() + ' Tháng ' + Number(new Date().getMonth() + 1)  + ' Năm ' + new Date().getFullYear(),
    }
      this.weekDays = []
      this.months =[]
  }

handlerChange(n){
  
        this.setState(() => {
          this.state.activeDate.setMonth(
            this.state.activeDate.getMonth() + n
          )
          return this.state;
        });
}
hangdlerSelection(day){
        this.setState({
          daySelection: 'Ngày ' + day + ' ' + this.months[this.state.activeDate.getMonth()] + ' Năm ' + this.state.activeDate.getFullYear()
        })
}
generateMatrix = () => {
  var matrix = [];
  matrix[0] = this.weekDays

  
}


render(){


var year = this.state.activeDate.getFullYear();
var month = this.state.activeDate.getMonth(); 
var firstDay = new Date(year, month, 1).getDay() - 1;
var nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
this.months =['THÁNG 1','THÁNG 2','THÁNG 3','THÁNG 4','THÁNG 5','THÁNG 6','THÁNG 7','THÁNG 8','THÁNG 9','THÁNG 10','THÁNG 11','Tháng 12']
this.weekDays = ['Thứ 2','Thứ 3','Thứ 4','Thứ 5','Thứ 6','Thứ 7','CN']
var maxDays = nDays[month];



if(firstDay < 0){
  firstDay = 6
}

if (month == 1) { // February
  if (year % 4 == 0) {
    maxDays += 1;
  }
}

var kipIsMonth = []
var counti = 0
for(let i=0; i<12; i++){
  if(i == 1){
    kipIsMonth.push(counti)
    counti+=29
  }else{
  kipIsMonth.push(counti)
  counti+=nDays[i]
  }
}
var arrayWeekDay =[]
    for(var i=0; i<7; i++ ){
    arrayWeekDay.push(<View style={styles.rowWeekDay}><Text style={{fontSize: 10}}>{this.weekDays[i]}</Text></View>)
    }
// holyday
// ngày 1 tháng 1	Thứ tư	Tết Dương Lịch
// ngày 23 tháng 1 đến ngày 29 tháng 1	Thứ năm đến Thứ tư	Tết Nguyên Đán
// ngày 2 tháng 4	Thứ năm	Giỗ Tổ Hùng Vương
// ngày 30 tháng 4	Thứ năm	Ngày Thống nhất đất nước
// ngày 1 tháng 5	Thứ sáu	Ngày Quốc tế Lao động
// ngày 2 tháng 9	Thứ tư	Ngày Quốc khánh
var holidays = [
{
  day: [1],
  month: 1,
  describe: 'Tết dương lịch'  
},
{
  day: [24,25,26,27,28],
  month: 1,
  describe: 'Tết Nguyên Đán'
},{
  day: [2],
  month: 4,
  describe: 'Giỗ Tổ Hùng Vương'  
},{
  day: [30],
  month: 4,
  describe: 'Thống nhất đất nước'  
},{
  day: [1],
  month: 5,
  describe: 'Quốc tế Lao động'  
},{
  day: [2],
  month: 9,
  describe: 'Ngày Quốc khánh'  
},
]  
var holidayNumbers = []
var index = 0
for(let element of holidays){
  for(let inelement of element.day){
    holidayNumbers.push(+inelement + kipIsMonth[element.month - 1])

    index+=1
  }
}

//xử lý logic các kip đi làm
var logicKipA = ['Ngày','Ngày','Nghỉ','Nghỉ','Đêm','Đêm','Đêm','Đêm','Nghỉ','Nghỉ','Ngày','Ngày']
var logicKipB = ['Nghỉ','Nghỉ','Ngày','Ngày','Ngày','Ngày','Nghỉ','Nghỉ','Đêm','Đêm','Đêm','Đêm']
var logicKipC = ['Đêm','Đêm','Đêm','Đêm','Nghỉ','Nghỉ','Ngày','Ngày','Ngày','Ngày','Nghỉ','Nghỉ']
var kipA =[]
var kipB =[]
var kipC =[]
var count = 0
for(let i=0; i<366;i++){

  kipA.push([logicKipA[count]])
  kipB.push([logicKipB[count]])
  kipC.push([logicKipC[count]])
  count += 1
  if(count==12){
    count = 0
  }
    for(let number of holidayNumbers){
      if(number == i+1){
        kipA[i] = '' 
        kipB[i] = '' 
        kipC[i] = '' 
        count-=1
      }
    }

}

//.....
var matrix =[]
var counter = 1
for(let row =0;row < 6; row ++){
    matrix[row] =[]
      for(let col=0; col<7; col++){
        matrix[row][col] = -1
        if(row == 0 && col >=firstDay){
          matrix[row][col] = counter++
        }else if(row > 0 && counter <= maxDays){
          matrix[row][col] = counter++
        }
      }
}
var arrayDays = matrix.map((row, rowindex) => {
  var arrayDay = row.map((col, colindex) => {

    let kipStyleA = {}
    let kipStyleB = {}
    let kipStyleC = {}

    if(col != -1 && kipA[kipIsMonth[month] +col -1] == 'Nghỉ'){
      kipStyleA = styles.caNghi
    }else if(col != -1 && kipA[kipIsMonth[month] +col -1] == 'Ngày'){
      kipStyleA = styles.caNgay
    }else if(col != -1 && kipA[kipIsMonth[month] +col -1] == 'Đêm'){
      kipStyleA = styles.caDem
    }else if(col != -1 && kipA[kipIsMonth[month] +col -1] == ''){
      kipStyleA = styles.holiday
    }

    if(col != -1 && kipB[kipIsMonth[month] +col -1] == 'Nghỉ'){
      kipStyleB = styles.caNghi
    }else if(col != -1 && kipB[kipIsMonth[month] +col -1] == 'Ngày'){
      kipStyleB = styles.caNgay
    }else if(col != -1 && kipB[kipIsMonth[month] +col -1] == 'Đêm'){
      kipStyleB = styles.caDem
    }else if(col != -1 && kipB[kipIsMonth[month] +col -1] == ''){
      kipStyleB = styles.holiday
    }


    if(col != -1 && kipC[kipIsMonth[month] +col -1] == 'Nghỉ'){
      kipStyleC = styles.caNghi
    }else if(col != -1 && kipC[kipIsMonth[month] +col -1] == 'Ngày'){
      kipStyleC = styles.caNgay
    }else if(col != -1 && kipC[kipIsMonth[month] +col -1] == 'Đêm'){
      kipStyleC = styles.caDem
    }else if(col != -1 && kipC[kipIsMonth[month] +col -1] == ''){
      kipStyleC = styles.holiday
    }


    return (
    <View style={styles.contentDay}>
    <TouchableOpacity style={{
        flex: 3,
        alignItems: 'flex-start',
        justifyContent: 'center',
        alignSelf: 'stretch',
        backgroundColor: col + 'nMonth' + month == this.state.activeDate.getDate() + 'nMonth' + new Date().getMonth() ? '#ffeb3b': 'white',
        }}
       onPress={() => this.hangdlerSelection(col)}>
       <Text style={{
        marginLeft: 4,
        fontSize: 18,
        fontWeight: 'bold',
        color: col + 'nMonth' + month == this.state.activeDate.getDate() + 'nMonth' + new Date().getMonth() ? 'red': 'black',
        }}>
        {col != -1 ? col : ''}
        </Text>
    </TouchableOpacity>
  
      <View style={kipStyleA}>
      <Text style={{
              marginLeft: 2 ,
              fontSize: 10,
              justifyContent: 'center',
              alignItems: 'center'
      }}>
        {col != -1 ? 'A: ' + kipA[kipIsMonth[month] +col -1] : ''}
      </Text>
      </View>
      <View style={kipStyleB}>
      <Text style={{
              marginLeft: 2 ,
              fontSize: 10,
              justifyContent: 'center',
              alignItems: 'center'
      }}>
        {col != -1 ? 'B: ' + kipB[kipIsMonth[month] +col -1] : ''}
      </Text>
      </View>
      <View style={kipStyleC}>
      <Text style={{
              marginLeft: 2 ,
              fontSize: 10,
              justifyContent: 'center',
              alignItems: 'center'
      }}>
        {col != -1 ? 'C: ' + kipC[kipIsMonth[month] +col -1] : ''}
      </Text>
      </View>
      </View>
    )
  })
  return <View style={styles.rowDays}>{arrayDay}</View>

})

    return(
      
          <View style={styles.container}>
          <StatusBar backgroundColor="#317ddf" barStyle="light-content" />
           <View style={styles.header}>
           <Text style={styles.headerText}>Lịch làm việc</Text>
            </View>
            <View style={styles.lblMonth}>
            <TouchableOpacity onPress={() => this.handlerChange(-1)}>
            <Text>Back</Text>
            </TouchableOpacity>  
            <Text style={{fontSize: 20, color: '#317ddf' }}>{this.months[month]+' NĂM '+year}</Text>
            <TouchableOpacity onPress={() => this.handlerChange(+1)}>
            <Text>Next</Text>
            </TouchableOpacity>          
            </View>
            <View style={styles.weekDay}>
                {arrayWeekDay}
            </View>
            <View style={styles.calendar}>{arrayDays}</View>
            <View style={styles.event}>
              <Text>{this.state.daySelection}</Text>
            </View>
        </View>
    )
    }
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#2196f3',
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
    headerText: {color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        borderRadius: 10
    },
    lblMonth:{
        flex: 2,
        flexDirection:'row',
        backgroundColor: 'white',
        marginLeft: 2,
        marginRight: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    weekDay:{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#e1fdff',
        borderColor: '#aba9ae',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 2,
        marginRight: 2
    },
    rowWeekDay:{
        flex: 1,
        borderWidth: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    calendar:{
        flex: 25,
        backgroundColor: 'white',
        marginLeft: 2,
        marginRight: 2
    },
    event: {
        flex: 8,
        backgroundColor: '#fcfdd4',
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: 'black',
        marginLeft: 2,
        marginRight: 2

    },
    rowDays:{
      flex: 1,
      flexDirection: 'row',
      alignItems:'center',
    },
    Days:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 0.3,
      alignSelf: 'stretch'
    },
    contentDay: {
      flex: 1,
      borderWidth: 0.8,
      borderColor: '#0D47A1'
    },
    kips: {
      flex: 1,
      borderWidth: 0.3,
      borderRadius: 4
    },
    caNgay: {
      flex: 1,
      borderWidth: 0.3,
      borderRadius: 4,
      backgroundColor: '#aed581',
      justifyContent: 'center'
    },
    caDem: {
      flex: 1,
      borderWidth: 0.3,
      borderRadius: 4,
      backgroundColor: '#4fc3f7',
      justifyContent: 'center'
    },
    caNghi: {
      flex: 1,
      borderWidth: 0.3,
      borderRadius: 4,
      backgroundColor: '#e57373',
      justifyContent: 'center'
    },
    holiday: {
      flex: 1,
      borderWidth: 0.3,
      borderRadius: 4,
      backgroundColor: '#ba68c8',
      justifyContent: 'center'
    },
    
});


