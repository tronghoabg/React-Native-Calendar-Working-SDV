import React, { Component } from 'react'
import { notificationManager } from './notificationManager'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/AntDesign';
import Swipeout from 'react-native-swipeout'
import moment from 'moment';
import flastListData from './flatList';
// import AddModal from '../component/AddModal';
import {
	View,
	Text,
	StyleSheet,
	Button,
	TouchableOpacity,
	FlatList,
	Switch,
} from 'react-native'

class FlatListItem extends Component {
	constructor(props) {
		super(props)
		this.state = {
			activeRowKey: null,
			switchValue: false
		}
	}
	render() {
		const swipeSetting = {
			autoClose: false,
			onClose: (secId, rowId, direction) => {
				if (this.state.activeRowKey != null) {
					this.setState({ activeRowKey: null })
				}
			},
			onOpen: (secId, rowId, direction) => {
				this.setState({ activeRowKey: this.props.item.key })
			},
			right: [
				{
					onPress: () => {
						const deletingRow = this.state.activeRowKey
						flastListData.splice(this.props.index, 1)
						this.props.parentFlatList.refreshFlatList(deletingRow)
					},
					text: 'Delete', type: 'delete'
				}
			],
			rowId: this.props.index,
			sectionId: 1
		}
		return (
			<Swipeout {...swipeSetting}>
				<View style={styles.rowFlat}>
					<View>
						<Text style={styles.time}>{this.props.item.time}</Text>
						<Text style={styles.label}>{this.props.item.label}</Text>
					</View>
					<View>
						<Switch style={{ marginRight: 16 }}
							value={this.state.switchValue}
							onValueChange={(switchValue) => { this.setState({ switchValue }) }}
						/>
					</View>
				</View>
			</Swipeout>
		)
	}
}

export default class Alarm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			currentTime: '',
			alarmTime: '',
			isVisible: false,
			alarmTime: '',
			deletedRowKey: null
		}
		this.localNotify = null
		this.addAlarm = this.addAlarm.bind(this)
	}
	componentDidMount() {
		this.localNotify = notificationManager
		this.localNotify.configure(this.onRegister, this.onNotification, this.onOpenNotification)
	}

	componentWillUnmount() {
		this.clock = setInterval(() => {
			this.setCurrentTime()
		}, 1000)
		this.interval = setInterval(() => {
			this.checkAlarm()
		}, 1000)
	}

	checkAlarm = () => {
		if (this.state.currentTime == this.state.alarmTime + ':00') {
			this.onPressSendNotification()
		}
	}
	setCurrentTime = () => {
		this.setState({
			currentTime: new Date().toLocaleTimeString('en-US', { hour12: false })
		})
	}

	onRegister(token) {
		// console.log("[Notification] Registered: ", token)
	}

	onNotification(notify) {
		// console.log("[Notification] onNotification: ", notify)
	}

	onOpenNotification(notify) {
		// console.log("[Notification] onOpenNotification: ", notify)
		alert("Đã dừng báo thức")
	}

	onPressCancelNotification = () => {
		this.localNotify.cancelAllLocalNotification()

	}
	onPressSendNotification = () => {
		const options = {
			playSound: true,
			soundName: 'default',
			vibrate: true,
		}
		this.localNotify.showNotification(
			1,
			"Báo Thức",
			"Đã đến giờ thức dậy",
			{},
			options
		)
	}
	showDatePicker = () => {
		this.setState({
			isVisible: true
		})
	}

	handlePicker = (timeSelect) => {
		this.setState({
			isVisible: false,
			alarmTime: moment(timeSelect).format('HH:mm')
		})
	}
	addAlarm = () => {
		// this.refs.addModal.showAddModal();
	}
	refreshFlatList = (deletedKey) => {
		this.setState((prevState) => {
			return {
				deletedRowKey: deletedKey
			}
		}
		)
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.title}>Sửa</Text>
					
					<Icon name='plus' style={styles.icon} onPress={this.addAlarm} />
				</View>
				<View style={styles.main}>
					<FlatList data={flastListData}
						renderItem={({ item, index }) => {
							return (
								<FlatListItem item={item} index={index} parentFlatList={this}>
								</FlatListItem>
							);
						}}
					>
					</FlatList>
					
				</View>

			</View>

		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,

	},
	header: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#317ddf',
		borderBottomWidth: 1,
		borderBottomColor: '#aba9ae',
		alignItems: 'flex-end',
		justifyContent: 'space-between',
		width: '100%',
	},
	title: {
		fontSize: 18,
		color: 'white',
		marginLeft: 15,
		marginRight: 15,
		marginBottom: 5
	},
	icon: {
		fontSize: 22,
		color: 'white',
		marginLeft: 15,
		marginRight: 15,
		marginBottom: 5
	},
	main: {
		flex: 7,
	},
	time: {
		fontSize: 50,
		marginLeft: 16,
		marginTop: 16
	},
	label: {
		marginLeft: 20,
	},
	rowFlat: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderBottomWidth: 0.3
	},
	modal: {
		width: '50%',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'red'
	}
})