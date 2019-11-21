/*eslint-disable */
import React, {Component} from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function LoginScreen(props) {

  return (
    <View>
      <LinearGradient style={styles.container}
      colors={["#7646FF", "#FFFFFF"]}>
        <Text style={styles.title}>Tilez</Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('LoginPopup')} style={styles.button}>
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('CreateAccountPopup')} style={styles.button}>
          <Text style={styles.text}>Sign Up</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
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
    marginBottom: 60,
    marginTop: 40,
    fontFamily: "Pacifico", 
    color: "white",
    textShadowColor: '#AAAAAA',
    textShadowOffset: {width: -8, height: 8},
    textShadowRadius: 1,
    
   }
})
