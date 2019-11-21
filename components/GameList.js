/*eslint-disable*/
import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import GameCard from './GameCard';

const game = {
  opponent: 'John B.',
  first: true,
  second: true,
  third: true,
  fourth: true,
  fifth: true,
  turn: 'THEIR TURN',
}


export default function GameList(props) {

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.back} onPress={() => props.navigation.navigate('HomeScreen')}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Active Games</Text>
      </View>
      <ScrollView>
        <GameCard data={game}></GameCard>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#E9E9E9',
  },
  header: {
    flexDirection: 'row',
    height: 120,
    width: '100%',
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  back: {
    width: '100%',
  },
  backText: {
    fontSize: 20,
    paddingLeft: 20,
    paddingTop: 20,
    color: '#A587FD',
  },
  headerText: {
    width: '86%',
    color: '#574980',
    textAlign: 'center',
    fontSize: 30,
    paddingRight: 72,
    paddingTop: 20,
  },
})
