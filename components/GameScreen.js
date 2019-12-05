/*eslint-disable*/
import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { DragDropGrid } from 'react-native-drag-drop-grid-library';
import Unsplash from 'unsplash-js';
import Constants from 'expo-constants';
import { Timer } from 'react-native-stopwatch-timer';
import shake from '../assets/shake.png';
import * as FileSystem from 'expo-file-system';
import { AsyncStorage } from 'react-native';
import { Accelerometer } from 'expo-sensors';

const dimensions = Dimensions.get('window')
const screenWidth = dimensions.width, screenHeight = dimensions.height
const offset = screenWidth/3

export default function GameScreen(props) {
  const image = 'https://images.unsplash.com/photo-1464820453369-31d2c0b651af?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEwNDk0NH0';
  const id = props.navigation.state.params.id;
  const name = id.substring(0, id.indexOf('@'));

  const shuffleArray = array => {
    var currentIndex = array.length
    var temporaryValue, randomIndex
  
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--
  
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }
  
    return array
  }

  const [gridItems, setGridItems] = useState(shuffleArray([0, 2, 1, 3, 4, 5, 6, 7, 8]))
  const [active, setActive] = useState(false)
  const [timerStarted, setTimerStarted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [highScore, setHighScore] = useState(0);

  const [accData, setAccData] = useState({
    data: null,
    shake: false,
    lastUpdate: Date.now(),
    lastShake: Date.now(),
  })

  const mTop = {
    0: 0,
    1: 0,
    2: 0,
    3: -1,
    4: -1,
    5: -1,
    6: -2,
    7: -2,
    8: -2,
  }
  const mLeft = {
    0: 0,
    1: -1,
    2: -2,
    3: 0,
    4: -1,
    5: -2,
    6: 0,
    7: -1,
    8: -2,
  }

  useEffect(() => {
    // subscribe to accelerometer data when the component mounts
    (async () => {
      try {
        setHighScore(await AsyncStorage.getItem('highScore-' + name));
      } catch(e) {
        console.log(e);
      }
    })();
    const accelListener = (aD) => {
      let currTime = Date.now();
      if (accData.data !== null && (currTime - accData.lastUpdate > 100)) {
        let diffTime = (currTime - accData.lastUpdate);

        let { x, y, z } = accData.data;
        let speed = Math.abs(x + y + z - aD.x - aD.y - aD.z) / diffTime * 10000;

        if (speed > 75) {
          // we detected a shake
          console.log('shakin the device')
          console.log('before',gridItems)
          if (Date.now() - accData.lastShake > 10000)
            setAccData({
              ...accData,
              data: aD,
              lastUpdate: Date.now(),
              lastShake: Date.now(),
            })

            // rerender a random grid
            // setGridItems(shuffleArray(gridItems))
            props.navigation.navigate('HomeScreen');
            console.log('after',gridItems)
        }
        setAccData({
          ...accData,
          data: aD,
          lastUpdate: currTime
        })
      }

      setAccData({
        ...accData,
        data: aD
      });
    }
    Accelerometer.addListener(accelListener);

    // unsubscribe when the component unmounts
    return () => {
      Accelerometer.removeAllListeners();
    }
  })

  const checkHighScore = async (score) => {
    try {
      const value = await AsyncStorage.getItem('highScore-' + name);
        if (value !== null && value < score) {
          await AsyncStorage.setItem('highScore-' + name, score.toString());
        } else if (value === null) {
          await AsyncStorage.setItem('highScore-', + name, score.toString());
        }
    } catch (error) {
      // Error saving data
    }
  }

  const getGridItemsOrder = orderObj => {
    let order = orderObj['itemOrder'].map(item => item.key)
    // console.log(order)
    return order
  }

  const onTimerComplete = () => {
    setActive(false)
    setTimeLeft(0);
  }

  const tick = time => {
    if(time < timeLeft) {
      setTimeLeft(time)
    }
  }

  const tileRelease = itemOrder => {
    const order = getGridItemsOrder(itemOrder)
    setGridItems(order)
    if(isSolved(order)) {
      setActive(false)
    }
  }

  const isSolved = order => {
    let same = true
    order.forEach((item, index) => {
      if(item != index) same = false
    })
    return same
  }

  const clickStart = () => {
    setActive(true)
    setTimerStarted(true)
  }

  const getBottomHalf = () => {
    if(!timerStarted) {
      return (
        <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={() => clickStart()} style={styles.startButton}>
            <Text style={styles.startText}>Start Game</Text>
          </TouchableOpacity>
        </View>
      )
    }
    else if(timerStarted && active) {
      return (
        <View style={styles.bottomContainer}>
          <Image source={shake} style={styles.shake}/>
          <Text style={styles.shakeMessage}>Stuck? Shake your device to quit the game.</Text>
        </View>
      )
    }
    else if(timerStarted && !active && timeLeft > 0) {
      console.log('here');
      const score = timeLeft*100
      checkHighScore(score);
      let highScoreMsg = <Text style={styles.message2}>Your high score is still {highScore}.</Text>
      if(score > highScore) {
        highScoreMsg = <Text style={styles.message2}>New high score! {score}</Text>
      }
      return (
        <View style={styles.bottomContainer}>
          <Text style={styles.message1}>Nice!</Text>
          <Text style={styles.message2}>{timeLeft} x 100 = {score}</Text>
          {highScoreMsg}
        </View>
      )
    }
    return (
      <View style={styles.bottomContainer}>
        <Text style={styles.message1}>Oof.</Text>
        <Text style={styles.message2}>0.0 x 100 = 0</Text>
        <Text style={styles.message2}>Your high score is still {highScore}.</Text>
      </View>
    )
  }

  const getOpacity = () => {
    if(timerStarted && !active && timeLeft > 0) return 0.5
    else if(timerStarted && active) return 1
    return 0.1
  }

  const options = {
    container: {
      width: 170,
    },
    text: {
      fontSize: 48,
      color: '#855AFF',
      textAlign: 'center',
      fontFamily: 'ArialRoundedMTBold',
    }
  }

  console.disableYellowBox = true

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        {timerStarted && !active && timeLeft > 0 ?
          <Text style={styles.timeText}>{timeLeft}</Text>
          :
          <Timer
          start={active}
          totalDuration={30000}
          getTime={time => tick(time)}
          handleFinish={()=>onTimerComplete()}
          options={options}/>
        }
      </View>
      <DragDropGrid
        style={[styles.grid, {opacity: getOpacity()}]}
        ref={sortGrid => {
          this.sortGrid = sortGrid
        }}
        blockTransitionDuration={300}
        activeBlockCenteringDuration={200}
        itemsPerRow={3}
        dragActivationTreshold={10}
        onDragRelease={(itemOrder) => {tileRelease(itemOrder)}}
        onDragStart={(key) => {}}>
          {
            gridItems.map((val, index) => {
              return (
                <View key={val} style={styles.block}>
                  <Image style={[styles.photo, {marginTop: mTop[val]*offset, marginLeft: mLeft[val]*offset}]} source={{uri: image}}/>
                </View>
              )
            })
          }
      </DragDropGrid>
      {getBottomHalf()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  textContainer: {
    width: '100%',
    height: 150,
    paddingTop: Constants.statusBarHeight,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid: {
    width: '100%',
    height: '100%',
  },
  block: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff',
  },
  photo: {
    width: screenWidth,
    height: screenHeight,
  },
  bottomContainer: {
    width: '100%',
    height: 320,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 15,
  },
  shake: {
    width: 64,
    height: 64,
    marginTop: 30
  },
  shakeMessage: {
    color: '#574980',
    fontSize: 18,
    width: 240,
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'ArialRoundedMTBold',
  },
  timeText: {
    fontSize: 48,
    color: 'green',
    fontFamily: 'ArialRoundedMTBold',
  },
  startButton: {
    width: 300,
    alignItems: "center",
    paddingVertical: 15,
    marginVertical: 10,
    backgroundColor: "#855AFF",
    borderRadius: 20,
  },
  startText: {
    fontFamily: "ArialRoundedMTBold",
    color: "#fff",
    fontSize: 18,
  },
  message1: {
    fontSize: 32,
    color: '#574980',
    fontFamily: 'ArialRoundedMTBold',
    marginBottom:10,
  },
  message2: {
    fontSize: 24,
    color: '#574980',
    fontFamily: 'ArialRoundedMTBold',
    marginBottom:10,
  }
})
