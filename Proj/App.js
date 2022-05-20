import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, ImageStore, Image } from 'react-native';
import { ImageBackground, StyleSheet, ImageButton, TouchableOpacity } from 'react-native';


import HomeScreen from './library/HomeScreen';
import Players from './library/Players';
import Server from './library/Server';
import World from './library/World';
import Settings from './library/Settings';

import './library/context_vars'

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
    backgroundColor: "#FFC0CB",
    padding: 20,
    textAlign: "center",
    marginRight: 50,
    marginLeft: 50,
    borderRadius: 30

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

const Stack = createStackNavigator();

export default class NavExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [],
      cry: true
    };
    this.cry2 = this.cry.bind(this);
  }

  cry() {
    this.setState({ cry2: true });
  }

  render() {
    return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Group>
              <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
              <Stack.Screen name="Players" component={Players} options={{ title: 'Player Info' }} />
              <Stack.Screen name="Server" component={Server} options={{ title: 'Server Info' }} />
              <Stack.Screen name="World" component={World} options={{ title: 'World Info' }} />
              <Stack.Screen name="Settings" component={Settings} options={{ title: 'Settings' }} />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
    );
  }
}
