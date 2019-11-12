import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { DragDropGrid } from 'react-native-drag-drop-grid-library';
import Unsplash from 'unsplash-js';

const dimensions = Dimensions.get('window')
const width = dimensions.width * .9, height = dimensions.height * .8
const w1 = 100, h1 = 100

export default function App() {
  const [gridItems, setGridItems] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9])

  let mTop = {
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
  let mLeft = {
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

  // const unsplash = new Unsplash({ accessKey: 'c840d6aaf8c9985c3969fbb9d53349c39e98a01e389124691e5450e6d02472d3' })

  // unsplash.photos.getPhoto("mtNweauBsMQ")
  // .then(resp => resp.json())
  // .then(json => {
  //   console.log(json)
  // })

  // Image.getSize('https://images.unsplash.com/photo-1520247478381-4d32def223c1?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb', (width, height) => {
  //   console.log(width * .9, height * .8)
  // })

  // useEffect(() => {
  //   setGridItems(shuffleArray(gridItems))
  //   console.log('updated')
  // })

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
    console.log(order)
    return order
  }

  solved = () => {
    let same = true
    gridItems.forEach((item, index) => {
      if(item != index) same = false
    })
    return same
  }

  let arr = shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8])

  // C
  // ax - sum1
  // dx - sum2
  // di - sum3
  // cx - sum4
  // rsi - A

  // rbx, r11, rdx, rax

  // S
  // rdi - size
  // rsi - A
  // rdx - 
  // rcx - i
  // r8 - 
  // r9 - 

  // caller saved:
  // r10-r11

  // callee saved:
  // rbp
  // rbx
  // r12-r15

  return (
    <View style={[styles.container, solved() ? {backgroundColor: 'green'} : {backgroundColor: 'red'}]}>
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
        onDragStart={(key) => console.log('Some block is being dragged now!', key)}>
          {
            arr.map((val, index) => {
              return (
                <View key={val} style={[styles.block]}>
                  <Image style={[styles.photo, {marginTop: mTop[val]*h1, marginLeft: mLeft[val]*w1}]} source={{uri: 'https://images.unsplash.com/photo-1520247478381-4d32def223c1?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb'}}/>
                </View>
              )
            }
            )
          }
      </DragDropGrid>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  grid: {
    // width: '100%',
    // height: '90%',
    width: '100%',
    height: '60%',
    marginTop: '40%',
    // marginLeft: '5%',
    // borderWidth: 1,
    // borderColor: 'blue',
  },
  block: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    // borderWidth: 1,
    // borderColor: 'green',
    padding: 0,
  },
  photo: {
    width: width,
    height: height,
    padding: 0,
  }
})
