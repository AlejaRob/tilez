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
import { Asset } from 'expo-asset';
import Unsplash from 'unsplash-js';


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

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}



export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      image: "",
    };
  }

  async _loadAssetsAsync() {
    let imageString;
    const unsplash = new Unsplash({ accessKey: "f1b76d8d38686c4741bd7c0133b3b7793c9b1db3efc70073bfd59df01feaa7e5" });
    await unsplash.photos.getPhoto("iMdsjoiftZo")
      .then(r => r.json())
      .then(json => {
        imageString = json.urls.regular; // this is the string that is the http link
        this.state.image = imageString;
      });

    console.log('image: ' + this.state.image);
    const imageAssets = cacheImages([imageString,
      require('./assets/strawberries.jpeg'),
    ]);

    await Promise.all([...imageAssets]);
  }

  async componentWillMount() {
    await Font.loadAsync({
      'Pacifico': require('./assets/fonts/Pacifico-Regular.ttf'),
      'ArialRoundedMTBold': require('./assets/fonts/arlrdbd.ttf'),
    });

    this._loadAssetsAsync();

    this.setState({ fontLoaded: true });
  }
  
  render() {
      if (this.state.fontLoaded) {
        return <AppContainer screenProps={{firebase: firebase, image: this.state.image}}/>
      }
      else {
        return <View></View>
      }
  }
}
