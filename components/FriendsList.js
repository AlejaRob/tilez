import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import Ionicons from 'react-native-vector-icons/Ionicons'

const DATA = [
  {
    id: "1",
    name: 'John Denver',
  },
  {
    id: '2',
    name: 'Red Herring',
  },
  {
    id: '3',
    name: 'Tom Hiddleston',
  },
];

function Item({ name }) {
  return (
    <View style={styles.friend}>
      <Text style={{ fontSize: 20 }}>{name}</Text>
      <TouchableOpacity style={styles.newGame}>
        <Text style={{ color: "#7646FF", fontSize: 14 }}>New Game</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function HomeScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity style={{ flex: 1, paddingLeft: 10 }} onPress={() => props.navigation.navigate('HomeScreen')}>
          <Ionicons name="ios-arrow-round-back" color="#7646FF" size={40}/>
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
      <View style={{
        width: '100%',
        height: 60,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#FFF"
      }}>
        <TouchableOpacity style={styles.addFriend}>
          <Ionicons name="ios-add" color="#7646FF" size={22}></Ionicons>
          <Text style={{ paddingLeft: 5, color: "#7646FF", fontSize: 14 }}>Add Friend</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: "#eee",
  },
  topContainer: {
    paddingTop: Constants.statusBarHeight,
    width: "100%",
    height: 120,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#FFF"
  },
  friend: {
    marginTop: 5,
    backgroundColor: "#FFF",
    paddingHorizontal: 10,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    width: "100%",
  },
  newGame: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#7646FF",
    justifyContent: 'center',
    alignItems: 'center',
  },
  addFriend: {
    paddingHorizontal: 10,
    // height: 40,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#7646FF",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
})
