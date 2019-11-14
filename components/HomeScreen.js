import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


export default function HomeScreen(props) {
  // const [gridItems, setGridItems] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9])

  // useEffect(() => {
  //   setGridItems(shuffleArray(gridItems))
  //   console.log('updated')
  // })

  return (
    <View>
      <LinearGradient style={styles.container}
        colors={["#7646FF", "#FFFFFF"]}>
        <Text style={{ fontSize: 100, padding: 10, fontFamily: "Hiragino Sans", color: "white" }}>Tilez</Text>
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: "75%",
    alignItems: "center",
    paddingVertical: 15,
    marginVertical: 10,
    backgroundColor: "#FFF",
    borderRadius: 7,
  },
  text: {
    fontFamily: "ArialRoundedMTBold",
    color: "black",
    fontSize: 20,
  }
})
