/*eslint-disable */
import React from 'react';
import { useState, useEffect, Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import * as Font from 'expo-font';
import ProfileScreen from './components/ProfileScreen';
import HomeScreen from './components/HomeScreen';
import GameScreen from './components/GameScreen';
import LoginScreen from './components/LoginScreen';
import LoginPopup from './components/LoginPopup';
import CreateAccountPopup from './components/CreateAccountPopup';
import TakeProfilePic from './components/TakeProfilePic';
import ImageTest from './components/ImageTest';
import firebase from './firebase.js';


const RootStack = createStackNavigator(
  {
    LoginScreen: LoginScreen,
    LoginPopup: LoginPopup,
    CreateAccountPopup: CreateAccountPopup,
    HomeScreen: HomeScreen,
    GameScreen: GameScreen,
    TakeProfilePic: TakeProfilePic,
    ImageTest: ImageTest,
    ProfileScreen: ProfileScreen,
  },
  {
    initialRouteName: 'LoginScreen',
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
