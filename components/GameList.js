import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Constants from 'expo-constants';

const DATA = [
  {
    id: "1",
    name: 'John D.',
  },
  {
    id: '2',
    name: 'Ben H.',
  },
  {
    id: '3',
    name: 'Tom L.',
  },
];

function GameListing(props) {
  return (
    <TouchableOpacity style={styles.game} onPress={() => props.goToGame({opponent: props.name})}>
      <Text style={{ fontSize: 28 }}>{props.name}</Text>
    </TouchableOpacity>
  )
}


export default function HomeScreen(props) {
  // const [gridItems, setGridItems] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9])

  // useEffect(() => {
  //   setGridItems(shuffleArray(gridItems))
  //   console.log('updated')
  // })

  function goToGame(object) {
    props.navigation.navigate('GameScreen', object);
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity style={{ fontSize: 40, flex: 1 }} onPress={() => props.navigation.navigate('HomeScreen')}>
          <Text>Back</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 25 }}>Games</Text>
        <View style={{ flex: 1 }} />
      </View>
      <FlatList
        style={{ width: "100%" }}
        data={DATA}
        renderItem={({ item }) => <GameListing name={item.name} goToGame={goToGame}/>}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    paddingTop: Constants.statusBarHeight,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#eee",
  },
  topContainer: {
    paddingVertical: 20,
    width: "100%",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#FFF"
  },
  game: {
    marginTop: 5,
    backgroundColor: "#FFF",
    paddingLeft: 10,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: "flex-start",
    alignItems: 'center',
    width: "100%",
  }
})
