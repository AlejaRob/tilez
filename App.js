/*eslint-disable */
import React from 'react';
import { useState, useEffect, Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ImageEditor } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import * as Font from 'expo-font';
import SplashScreen from './components/SplashScreen';
import HomeScreen from './components/HomeScreen';
import GameScreen from './components/GameScreen';
import LoginScreen from './components/LoginScreen';
import LoginPopup from './components/LoginPopup';
import CreateAccountPopup from './components/CreateAccountPopup';
import FriendsList from './components/FriendsList';
import GameList from './components/GameList';
import TakeProfilePic from './components/TakeProfilePic';
import ImageTest from './components/ImageTest';
import firebase from './firebase.js';

// a few things to fix/add:
// - need to get dimensions right on tiles so the images fit together well
// - will improve styling of it
// - add a timer (like 30 seconds maybe)
// - lock puzzle after time expires/you solve it
// - the first time it loads on iOS simulator the grid is up at the top of the screen,
//   then when you click it centers. this doesn't happen on my phone though
// - firebase stuff
// - sign in - Sammy
// - menus etc.
// - shake to shuffle tiles


const RootStack = createStackNavigator(
  {
    LoginScreen: LoginScreen,
    LoginPopup: LoginPopup,
    CreateAccountPopup: CreateAccountPopup,
    HomeScreen: HomeScreen,
    GameScreen: GameScreen,
    FriendsList: FriendsList,
    GameList: GameList,
    TakeProfilePic: TakeProfilePic,
    ImageTest: ImageTest,
  },
  {
    initialRouteName: 'GameScreen', // LoginScreen
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
)
const AppContainer = createAppContainer(RootStack)


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
    };
  }

  async componentWillMount() {
    await Font.loadAsync({
      'Pacifico': require('./assets/fonts/Pacifico-Regular.ttf'),
      'ArialRoundedMTBold': require('./assets/fonts/arlrdbd.ttf'),
    });

    this.setState({ fontLoaded: true });
  }
  
  render() {
      if (this.state.fontLoaded) {
        return <AppContainer screenProps={{firebase: firebase}}/>
      }
      else {
        return <View></View>
      }
  }
}
