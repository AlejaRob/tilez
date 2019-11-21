/*eslint-disable */

import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';


export default function HomeScreen(props) {
  // const [gridItems, setGridItems] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9])

  return (
    <View>
      <LinearGradient style={styles.container}
        colors={["#7646FF", "#FFFFFF"]}>
        <Text style={styles.title}>Tilez</Text>
        <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('GameList')}>
          <Text style={styles.text}>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('FriendsList')}>
          <Text style={styles.text}>Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('LoginScreen')}>
          <Text style={styles.text}>Log Out</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingTop: Constants.statusBarHeight,
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    width: 300,
    alignItems: "center",
    paddingVertical: 15,
    marginVertical: 10,
    backgroundColor: "#FFF",
    borderRadius: 20,
  },
  text: {
    fontFamily: "ArialRoundedMTBold",
    color: "#574980",
    fontSize: 22,
  },
  title: { 
    fontSize: 144, 
    padding: 10, 
    fontFamily: "Pacifico", 
    color: "white",
    textShadowColor: '#AAAAAA',
    textShadowOffset: {width: -8, height: 8},
    textShadowRadius: 1,
    
   }
})
