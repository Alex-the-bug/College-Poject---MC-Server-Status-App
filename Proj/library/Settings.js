import React, { Component } from 'react';
import { Text, TextInput, View, Image, Button, ImageBackground, TouchableOpacity, StyleSheet, TextStyle } from 'react-native';
import './context_vars'

const image = require("../assets/overworld.png");
const image2 = require("../assets/end.png");
const image3 = require("../assets/nether.jpg");
const image4 = require("../assets/dirt.jpg");
const image5 = require("../assets/egg.png");

const tile = require("../assets/stone.png");
const tile2 = require("../assets/endstone.png");
const tile3 = require("../assets/obsidian.png");
const tile4 = require("../assets/sand.png");
const tile5 = require("../assets/lantern.png");


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
		height: 60,
		width: 180
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

export default class Settings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			info: [],
			cry: true
		};
	};


	/*	if( == image ) {
		this.changeBackground = {
	
		}
	} else {
		this.ImageBackground.source = { image };
	}
	return this.state 		}
	*/


	changeDisplayMode() {
		DisplayMode.themeID = (DisplayMode.themeID + 1) % 5;

		switch (DisplayMode.themeID) {
			case 0:
				DisplayMode.Color = 'white';
				DisplayMode.borderColor = 'black';
				DisplayMode.textColor = 'black';
				DisplayMode.backgroundImage = image;
				DisplayMode.tileImage = tile;
				DisplayMode.tileColor = 'black';
				break;
			case 1:
				DisplayMode.Color = 'black';
				DisplayMode.borderColor = 'white';
				DisplayMode.textColor = 'white';
				DisplayMode.backgroundImage = image2;
				DisplayMode.tileImage = tile2;
				DisplayMode.tileColor = 'black';
				break;
			case 2:
				DisplayMode.Color = 'purple';
				DisplayMode.borderColor = 'white';
				DisplayMode.textColor = 'white';
				DisplayMode.backgroundImage = image3;
				DisplayMode.tileImage = tile3;
				DisplayMode.tileColor = 'white';
				break;
			case 3:
				DisplayMode.Color = 'brown';
				DisplayMode.borderColor = 'white';
				DisplayMode.textColor = 'white';
				DisplayMode.backgroundImage = image4;
				DisplayMode.tileImage = tile4;
				DisplayMode.tileColor = 'black';
				break;
			case 4:
				DisplayMode.Color = '#fffc99';
				DisplayMode.borderColor = 'black';
				DisplayMode.textColor = 'black';
				DisplayMode.backgroundImage = image5;
				DisplayMode.tileImage = tile5;
				DisplayMode.tileColor = 'black';
				break;
		}
		this.setState({ DisplayMode: DisplayMode });
	}
	render() {
		return (
			<View style={{alignItems: "center", backgroundcolor: "DisplayMode.Color" }}>
				<ImageBackground source={DisplayMode.backgroundImage} resizeMode="cover" style={{ width: '100%', height: '100%' }} >
					<View style={{ padding: 0, alignItems: 'center', flexDirection: "column" }}>
						<View style={{ padding: 25 }} />
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
						<TouchableOpacity style={styles.button} onPress={() => this.changeDisplayMode()}>
							<ImageBackground source={DisplayMode.tileImage} resizeMode={'contain'} style={styles.button}>
								<Text style={{
									textAlign: "center",
									color: DisplayMode.tileColor,
									fontFamily: "Minecraft",
									fontSize: 16
								}} adjustsFontSizeToFit numberOfLines={1}>Change Theme</Text>

							</ImageBackground>
						</TouchableOpacity>
						<Text></Text>
					</View>


					<Text style={{ textAlign: 'center', color: DisplayMode.textColor, fontFamily: "Minecraft"}}>
						{'\n'}
						An app developed by:{'\n'} {'\n'}
						Shawn Li{'\n'}
						Sasha Kazharskaya{'\n'}
						George Kokalas{'\n'}
						Alexander Famous{'\n'}
					</Text>

				</ImageBackground>
			</View >
		);
	}
}
