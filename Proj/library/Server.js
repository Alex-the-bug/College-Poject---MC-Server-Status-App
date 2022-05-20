import React, { Component } from 'react';
import { Button, View, Text, TextInput, ImageBackground, StyleSheet, Image, TouchableOpacity, TextStyle } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
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
	}
}
);


export default class Server extends Component {
	constructor(props) {
		super(props);
		this.state = {
			url: 'http://10.42.10.171:3001',
			formContentType: "application/x-www-form-urlencoded;charset=UTF-8",
			date: '',
			cpu: '',
			ram: '',
			disk: '',
			players: '',
			address: ''
		};
	}

	getServerStats = () => {
		fetch(this.state.url + '/serverStats', { method: 'GET' })
			.then((response) => response.text())
			.then((responseText) => {
				let obj = JSON.parse(responseText);
				// console.error(responseText);
				this.setState({ cpu: obj.cpu_usage });
				this.setState({ ram: obj.ram_usage });
				this.setState({ disk: obj.free_disk_space });
				this.setState({ players: obj.players_online });
				this.setState({ address: obj.web_address });
				this.setState({ date: obj.date });
			})
			.catch((error) => {
				console.error(error);
			});
	}

	WorldInfo() {
		return (
			<Table borderStyle={{ borderWidth: 1, borderColor: DisplayMode.borderColor }}>
				<Rows
					data={[["CPU usage (%)", this.state.cpu], ["RAM usage (MB)", this.state.ram], ["Free disk space (MB)", this.state.disk], ["Players Online", this.state.players], ["Server Address", this.state.address]]}
					textStyle={{ fontSize: 12, textAlign: 'center', color: DisplayMode.textColor, backgroundColor: '#FFC0CB' }}
				/>
			</Table>)
	}

	componentDidMount() {
		//Code here is called on component startup
		this.props.navigation.addListener('focus', () => {
            this.setState({});
        });
		this.refresh();
	}

	componentDidUpdate() {
		//Code here is called every frame
	}

	componentWillUnmount() {
		//Code here is called on component exit
	}

	refresh = () => {
		this.getServerStats();
	}

	render() {
		return (
			<View style={{ padding: 0 }}>
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
						<Text>{'\n'}</Text>
						{this.WorldInfo()}
						<Text>{'\n'}</Text>
						<Text style={{ color: DisplayMode.borderColor }}>As of {this.state.date}</Text>
					</View>
				</ImageBackground>
			</View >
		);
	}
}
