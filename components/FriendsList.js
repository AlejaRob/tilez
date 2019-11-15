import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Constants from 'expo-constants'

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

function Item({name}) {
  return (
    <View style={styles.friend}>
      <Text style={{ fontSize: 28 }}>{name}</Text>
    </View>
  );
}

export default function HomeScreen(props) {
  // const [gridItems, setGridItems] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9])

  // useEffect(() => {
  //   setGridItems(shuffleArray(gridItems))
  //   console.log('updated')
  // })

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity style={{ fontSize: 40, flex: 1 }} onPress={() => props.navigation.navigate('HomeScreen')}>
          <Text>Back</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 25 }}>Friends</Text>
        <View style={{ flex: 1 }} />
      </View>
      <FlatList
        style={{ width: "100%" }}
        data={DATA}
        renderItem={({ item }) => <Item name={item.name} />}
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
    justifyContent: 'flex-start',
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
  friend: {
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
