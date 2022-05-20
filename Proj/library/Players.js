import React, { Component } from 'react';
import { Button, View, Text, TextInput, ImageBackground, StyleSheet, Image, TouchableOpacity, TextStyle } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import { Picker } from '@react-native-picker/picker';
import './context_vars'

const styles = StyleSheet.create({
	backgroundImage: {
		flex: 1,
	},
	container: {
		flex: 1,
	},
	image: {
		flex: 1,
		justifyContent: "center"
	},
	button: {
		alignItems: "center",
		// backgroundColor: "#FFC0CB",
		textAlign: "center",
		justifyContent: 'center',
		height: 40,
		width: 120,
		marginRight: 5,
		marginLeft: 5

	},
	countContainer: {
		alignItems: "center",
		padding: 10
	},
	text: {
		color: "white",
		fontSize: 42,
		lineHeight: 84,
		fontWeight: "bold",
		textAlign: "center",
		backgroundColor: "#000000c0"
	},
}
);

export default class Players extends Component {
	constructor(props) {
		super(props);
		this.state = {
			url: 'http://10.42.10.171:3001',
			formContentType: "application/x-www-form-urlencoded;charset=UTF-8",
			players: [],
			selectedPlayer: '',
			info: [],
			ping: '',
			lastSeen: '',
			kills: '',
			deaths: '',
			kicked: '',
			registered: '',
			op: '',
			banned: '',
		};
	}

	getFromAPI = (op, stateVar, params = {}, method = 'GET',) => {
		if (method != '')
			params.method = method;
		fetch(this.state.url + '/' + op, params)
			.then((response) => response.text())
			.then((responseText) => {
				let obj = {};
				obj[stateVar] = responseText;
				this.setState(obj);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	getPlayers = () => {
		fetch(this.state.url + '/players', { method: 'GET' })
			.then((response) => response.text())
			.then((responseText) => {
				let tmp = [];
				let obj = JSON.parse(responseText);
				obj.forEach(row => {
					tmp.push(row);
				});
				this.setState({ players: tmp });
			})
			.catch((error) => {
				console.error(error);
			});
	}



	selectPlayer = (player) => {

		this.setState({
			selectedPlayer: player,
			ping: '',
			lastSeen: '',
			kills: '',
			deaths: '',
			kicked: '',
			registered: '',
			op: '',
			banned: '',
		});
		this.getFromAPI('ping/' + player, 'ping');
		this.getFromAPI('lastSeen/' + player, 'lastSeen');
		this.getFromAPI('kills/' + player, 'kills');
		this.getFromAPI('deaths/' + player, 'deaths');
		this.getFromAPI('registered/' + player, 'registered');
		this.getFromAPI('op/' + player, 'op');
		this.getFromAPI('banned/' + player, 'banned');
		this.getFromAPI('kicked/' + player, 'kicked');
	}

	genPlayerLabels = () => {
		let arr = [];
		this.state.players.forEach(player => {
			arr.push(<Picker.Item label={player} value={player} key={player} style={{ backgroundColor: DisplayMode.Color, color: DisplayMode.borderColor }} />);
		});
		return arr;
	}

	genPlayerInfo() {
		return (
			<Table borderStyle={{ borderWidth: 1, borderColor: DisplayMode.borderColor }}>
				<Rows
					data={[["Name", this.state.selectedPlayer], ["Server OP", this.state.op], ["Banned", this.state.banned], ["Times Kicked", this.state.kicked], ["Ping", this.state.ping], ["Last Seen", this.state.lastSeen], ["K/D Ratio", this.state.kills + "/" + this.state.deaths], ["Registered", this.state.registered]]}
					textStyle={{ fontSize: 12, textAlign: 'center', color: DisplayMode.textColor, backgroundColor: '#FFC0CB' }}
				/>
			</Table>)
	}

	dropdown() {
		return <View style={{ borderWidth: 1, borderColor: DisplayMode.borderColor }}>
			<Picker
				dropdownIconColor={DisplayMode.borderColor}
				dropdownIconRippleColor={DisplayMode.borderColor}
				selectedValue={this.state.selectedPlayer}
				itemStyle={{ color: DisplayMode.borderColor }}
				onValueChange={(itemValue, itemIndex) => this.selectPlayer(itemValue)}>
				{this.genPlayerLabels()}
			</Picker>
		</View>
	}

	refresh = () => {
		this.selectPlayer(this.state.selectedPlayer);
		this.getPlayers();
	}

	componentDidMount() {
		//Code here is called on component startup
		this.props.navigation.addListener('focus', () => {
            this.setState({});
        });
		this.getPlayers();
	}

	componentDidUpdate() {
		//Code here is called every frame
	}

	componentWillUnmount() {
		//Code here is called on component exit
	}

	render() {
		return (
			<View style={{ padding: 0, backgroundColor: DisplayMode.Color }}>
				<ImageBackground source={DisplayMode.backgroundImage} resizeMode="cover" style={{ width: '100%', height: '100%' }} >
					<View style={{ padding: 10 }}>
						<View style={{ flexDirection: "row", padding: 10, justifyContent: 'center', marginHorizontal: 0 }}>
							<TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Settings')}>
								<ImageBackground source={DisplayMode.tileImage} resizeMode={'contain'} style={styles.button}>
									<Text style={{
										textAlign: "center",
										color: DisplayMode.tileColor,
										fontFamily: "Minecraft",
										fontSize: 16
									}} adjustsFontSizeToFit numberOfLines={1}>Settings</Text>
								</ImageBackground>
							</TouchableOpacity>
							<Text></Text>
							<TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Home')}>
								<ImageBackground source={DisplayMode.tileImage} resizeMode={'contain'} style={styles.button}>
									<Text style={{
										textAlign: "center",
										color: DisplayMode.tileColor,
										fontFamily: "Minecraft",
										fontSize: 16
									}} adjustsFontSizeToFit numberOfLines={1}>Home</Text>
								</ImageBackground>
							</TouchableOpacity>
							<Text></Text>

							<TouchableOpacity style={styles.button} onPress={() => this.refresh()}>
								<ImageBackground source={DisplayMode.tileImage} resizeMode={'contain'} style={styles.button}>
									<Text style={{
										textAlign: "center",
										color: DisplayMode.tileColor,
										fontFamily: "Minecraft",
										fontSize: 16
									}} adjustsFontSizeToFit numberOfLines={1}>Refresh</Text>
								</ImageBackground>
							</TouchableOpacity>
							<Text></Text>

						</View>
						{this.dropdown()}
						{this.genPlayerInfo()}
						<View style={{ padding: 20 }} />
					</View>
				</ImageBackground>
			</View>
		);
	}
}

