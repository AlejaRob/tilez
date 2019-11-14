import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


export default function LoginScreen(props) {
  // const [gridItems, setGridItems] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9])

  // useEffect(() => {
  //   setGridItems(shuffleArray(gridItems))
  //   console.log('updated')
  // })

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 40, fontWeight: 'bold'}}>Tilez</Text>
      <Text style={{fontSize: 40}}>LoginScreen</Text>
      <Button title='Login' onPress={() => props.navigation.navigate('LoginPopup')}/>
      <Button title='Create Account' onPress={() => props.navigation.navigate('CreateAccountPopup')}/>
    </View>
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
