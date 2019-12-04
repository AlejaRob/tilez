/*eslint-disable*/
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import t from 'tcomb-form-native';

const Form = t.form.Form;

export default function CreateAccountPopup(props) {
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
        width: 300,
      },
    },
    controlLabel: {
      normal: {
        color: '#574980',
        fontWeight: 100,
        fontSize: 18,
        marginBottom: 7,
        fontWeight: '600',
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

  const handleSignUp = () => {
    const value = this._form.getValue();
    const email = value["email"];
    const pwd = value["password"];

    firebase.auth().createUserWithEmailAndPassword(email, pwd)
      .then(() => {
        props.navigation.navigate('HomeScreen', {id: email});
      })
      .catch(e => {
        console.log(e);
      })
    console.log('value: ', value);
  }

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Tilez</Text>
        <Text style={styles.expText}>Create a new account.</Text>
        <Form
          ref={c => this._form = c}
          type={User}
          options={options}
        />
        <TouchableOpacity onPress={handleSignUp} style={styles.button}>
            <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
        <Text onPress={() => props.navigation.navigate('LoginPopup')} style={styles.linkText}>Already have an account? Sign in here.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: "ArialRoundedMTBold",
  },
  button: {
    width: 300,
    paddingVertical: 15,
    marginVertical: 10,
    backgroundColor: "#7646FF",
    borderRadius: 7,
    alignItems: 'center',
  },
  expText: {
    color: "#574980",
    fontSize: 16,
    width: '80%',
    marginBottom: 6,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
  linkText: {
    color: "#574980",
    fontSize: 16,
    marginTop: 4,
  },
  title: { 
    fontSize: 144, 
    padding: 10, 
    marginBottom: 0,
    fontFamily: "Pacifico", 
    color: "#7646FF",
   }
})
