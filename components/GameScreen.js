import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Button } from 'react-native';
import { DragDropGrid } from 'react-native-drag-drop-grid-library';
import Unsplash from 'unsplash-js';
import Constants from 'expo-constants';
import GameTimer from './GameTimer';
import shake from '../assets/shake.png';

const dimensions = Dimensions.get('window')
const screenWidth = dimensions.width, screenHeight = dimensions.height
const offset = screenWidth/3

export default function GameScreen(props) {
  const [gridItems, setGridItems] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8])
  const [gameActive, setGameActive] = useState(true)

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

  // my unsplash info, we have max 50 requests/hour
  // const unsplash = new Unsplash({ accessKey: 'c840d6aaf8c9985c3969fbb9d53349c39e98a01e389124691e5450e6d02472d3' })
  // unsplash API: https://github.com/unsplash/unsplash-js

  // this is the photo i've been using to get it working, its url is below - just saving it so we don't have to send a request each time
  // unsplash.photos.getPhoto("Xk0jQPZseMk")
  // .then(resp => resp.json())
  // .then(json => {
  //   console.log(json)
  // })

  // new image: https://images.unsplash.com/photo-1568486504489-9e70d75313b8?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb


  shuffleArray = array => {
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

  getGridItemsOrder = orderObj => {
    let order = orderObj['itemOrder'].map(item => item.key)
    // console.log(order)
    return order
  }

  solved = () => {
    let same = true
    gridItems.forEach((item, index) => {
      if(item != index) same = false
    })
    // if(same) setGameActive(false)
    return same
  }

  // let arr = shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8])
  let arr = [1, 0, 2, 3, 4, 5, 6, 7, 8]

  timerComplete = () => {
    setGameActive(false)
  }

  tick = time => {
    if(!gameActive) console.log(time)
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <GameTimer active={gameActive && !solved()} onTick={tick} onTimerComplete={timerComplete}/>
      </View>
      {gameActive ?
      <DragDropGrid
        style={styles.grid}
        ref={sortGrid => {
          this.sortGrid = sortGrid
        }}
        blockTransitionDuration={300}
        activeBlockCenteringDuration={200}
        itemsPerRow={3}
        dragActivationTreshold={10}
        onDragRelease={(itemOrder) => {setGridItems(getGridItemsOrder(itemOrder))}}   
        onDragStart={(key) => {}}>
          {
            arr.map((val, index) => {
              return (
                <View key={val} style={[styles.block, , solved() && gameActive ? {borderColor: 'green'} : {borderColor: '#fff'}]}>
                  <Image style={[styles.photo, {marginTop: mTop[val]*offset, marginLeft: mLeft[val]*offset}]} source={require('../assets/strawberries.jpeg')}/>
                </View>
              )
            }
            )
          }
      </DragDropGrid>
      :
      <Text style={{fontSize: 40}}>No active game</Text>
      }
      <View style={styles.bottomContainer}>
        <Button style={styles.start} disabled={gameActive} title='Start game' onPress={() => setGameActive(true)}/>
        <Image source={shake} style={styles.shake}/>
        <Text style={styles.shakeMessage}>Stuck? Shake your device to scramble the image.</Text>
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
    backgroundColor: '#E9E9E9',
  },
  textContainer: {
    width: '100%',
    height: 150,
    paddingTop: Constants.statusBarHeight,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  grid: {
    width: '100%',
    height: '100%',
    marginTop: '10%',
  },
  block: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderWidth: 2,
  },
  photo: {
    width: screenWidth,
    height: screenHeight,
  },
  bottomContainer: {
    width: '100%',
    height: 300,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  start: {
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
    marginTop: 10
  }
})
