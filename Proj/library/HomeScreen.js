import React, { Component } from 'react';
import { View, Text, Button, ImageStore, Image } from 'react-native';
import { ImageBackground, StyleSheet, ImageButton, TouchableOpacity } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import * as Font from 'expo-font';
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
        height: 60,
        width: 180
    },
    button2: {
        alignItems: "center",
        // backgroundColor: "#FFC0CB",
        textAlign: "center",
        justifyContent: 'center',
        height: 90,
        width: 270
    },
    countContainer: {
        alignItems: "center",
        justifyContent: 'center',
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


export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontsLoaded: false
        };
    }

    async _loadFontsAsync() {
        await Font.loadAsync({
            'Minecraft': require('../assets/font/Mine.ttf'),
        });
        this.setState({ fontsLoaded: true });
    }

    handleRefresh() {
        this.setState({});
    };

    componentDidMount() {
        this._loadFontsAsync();
        this.props.navigation.addListener('focus', () => {
            this.handleRefresh();
        });
    }

    render() {
        if (!this.state.fontsLoaded) {
            return <View />;
        }

        return (
            <View style={styles.container}>

                <ImageBackground source={DisplayMode.backgroundImage} resizeMode="cover" style={{ width: '100%', height: '100%' }} >
                    <Text style={{
                        textAlign: "center",
                        color: DisplayMode.textColor,
                        fontFamily: "Minecraft",
                        fontSize: 32,
                    }}>Minecraft Server Status App</Text>
                    <Text style={{
                        textAlign: "center",
                        color: DisplayMode.textColor,
                        fontFamily: "Minecraft",
                        fontSize: 16,
                    }}>Ethical Gaming Group</Text>
                    <View style={{ flexDirection: "row", padding: 20, justifyContent: 'space-between', marginHorizontal: 50 }} />

                    <View style={{ padding: 0, alignItems: 'center', flexDirection: "column" }}>

                        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Settings')}>
                            <ImageBackground source={DisplayMode.tileImage} resizeMode={'contain'} style={styles.button}>
                                <Text style={{
                                    textAlign: "center",
                                    color: DisplayMode.tileColor,
                                    fontFamily: "Minecraft",
                                    fontSize: 48,
                                }} adjustsFontSizeToFit numberOfLines={1}>Settings</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                        <Text />
                        <TouchableOpacity style={styles.button2} onPress={() => this.props.navigation.navigate('Players')}>
                            <ImageBackground source={DisplayMode.tileImage} resizeMode={'stretch'} style={styles.button2}>
                                <Text style={{
                                    textAlign: "center",
                                    color: DisplayMode.tileColor,
                                    fontFamily: "Minecraft",
                                    fontSize: 48,
                                }} adjustsFontSizeToFit numberOfLines={1}>Players</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                        <Text />
                        <TouchableOpacity style={styles.button2} onPress={() => this.props.navigation.navigate('World')} >
                            <ImageBackground source={DisplayMode.tileImage} resizeMode={'contain'} style={styles.button2}>
                                <Text style={{
                                    textAlign: "center",
                                    color: DisplayMode.tileColor,
                                    fontFamily: "Minecraft",
                                    fontSize: 48,
                                }} adjustsFontSizeToFit numberOfLines={1}>World</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                        <Text />
                        <TouchableOpacity style={styles.button2} onPress={() => this.props.navigation.navigate('Server')}>
                            <ImageBackground source={DisplayMode.tileImage} resizeMode={'contain'} style={styles.button2}>
                                <Text style={{
                                    textAlign: "center",
                                    color: DisplayMode.tileColor,
                                    fontFamily: "Minecraft",
                                    fontSize: 48,
                                }} adjustsFontSizeToFit numberOfLines={1}>Server</Text>
                            </ImageBackground>
                        </TouchableOpacity>

                    </View>


                </ImageBackground>

            </View>
        );
    }
}