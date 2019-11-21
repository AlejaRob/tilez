import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Timer } from 'react-native-stopwatch-timer';


export default function GameTimer(props) {

  const options = {
    container: {
      width: 170,
    },
    text: {
      fontSize: 48,
      color: '#855AFF',
      textAlign: 'center',
    }
  }

  return (
    <Timer
      msecs
      start={props.active}
      totalDuration={30000}
      getTime={(time) => props.onTick(time)}
      handleFinish={()=>props.onTimerComplete()}
      options={options}/>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
