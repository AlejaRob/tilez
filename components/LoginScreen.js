import React, {Component} from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import t from 'tcomb-form-native';
const Form = t.form.Form;

export default function LoginScreen(props) {
  // const [gridItems, setGridItems] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9])

  // useEffect(() => {
  //   setGridItems(shuffleArray(gridItems))
  //   console.log('updated')
  // })
  const firebase = props.screenProps.firebase;

  const User = t.struct({
    email: t.String,
    password: t.String
  });

  const formStyles = {
    ...Form.stylesheet,
    formGroup: {
      normal: {
        marginBottom: 10,
      },
    },
    controlLabel: {
      normal: {
        color: 'blue',
        fontSize: 18,
        marginBottom: 7,
        fontWeight: '600'
      },
      // the style applied when a validation error occours
      error: {
        color: 'red',
        fontSize: 18,
        marginBottom: 7,
        fontWeight: '600'
      }
    }
  }

  const options = {
    fields: {
      email: {
        error: "Please supply a valid email"
      },
      password: {
        error: "Please supply a valid password"
      }
    },
    stylesheet: formStyles
  }

  const handleSignIn = () => {
    const value = this._form.getValue();
    const email = value["email"];
    const pwd = value["password"];

    firebase.auth().createUserWithEmailAndPassword(email, pwd)
      .then(() => {
        props.navigation.navigate('LoginPopup');
      })
      .catch(e => {
        console.log(e);
      })
    console.log('value: ', value);
  }
  //() => props.navigation.navigate('LoginPopup')
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 40, fontWeight: 'bold'}}>Tilez</Text>
      <Text style={{fontSize: 40}}>Login or Signup!</Text>
      <Form
        ref={c => this._form = c}
        type={User}
        options={options}
      />
      <Button title='Login' onPress={handleSignIn}/>
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
