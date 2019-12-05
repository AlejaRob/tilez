/*eslint-disable*/
import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { AsyncStorage } from 'react-native';


export default function ProfileScreen(props) {
    const id = props.navigation.state.params.id;
    const name = id.substring(0, id.indexOf('@'));

    // state var to hold the profilePic URI
    const [profilePic, setProfilePic] = useState(null);
    const [highScore, setHighScore] = useState(0);

    // try to grab the picture when the component mounts
    useEffect(() => {
        
        (async () => {
            await retrieveData()
            try {
                const picInfo = await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'profile/' + name + '-profile-pic.jpg');
                if (picInfo.exists) {
                    // pic exists -> display it
                    setProfilePic(picInfo.uri);
                } else {
                    // pic doesn't exist -> shouldn't ever get here
                    console.log('pic doesn\'t exist');
                }
            } catch (e) {
                // something went wrong
                console.log(e);
            }
        })()
    })

    const retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('highScore-' + name);
          if (value !== null) {
            // We have data!!
            setHighScore(value);
            console.log(value);
          } else {
            await AsyncStorage.setItem('highScore-' + name, '0');
          }
        } catch (error) {
            console.log(error);
        }
    };

    return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.back} onPress={() => props.navigation.navigate('HomeScreen', {name: name})}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Profile</Text>
      </View>
      <View style={styles.content}>
        <Image style={styles.profImage} source={profilePic ? {uri: profilePic} : require('../assets/guy.png')}></Image>
        <Text style={styles.nameText}>{name}'s High Score</Text>
        <Text style={styles.score}>{highScore}</Text>
        <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('TakeProfilePic', {name: name})}>
          <Text style={styles.buttonText}>Take Profile Picture</Text>
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
    alignItems: 'center',
    backgroundColor: '#E9E9E9',
  },
  header: {
    flexDirection: 'row',
    height: 100,
    width: '100%',
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  back: {
    width: '18%',
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
    paddingRight: 84,
    paddingTop: 20,
  },
  topContainer: {
    paddingVertical: 20,
    width: "100%",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#FFF"
  },
  content: {
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#FFF',
      marginTop: 2,
      paddingBottom: 380,
  },
  profImage: {
      marginVertical: 40,
      width: 206,
      height: 220,

  },
  nameText: {
    color: '#574980',
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
  },
  score: {
      fontSize: 30,
      color: '#7646FF',
      paddingTop: 10,
  },
  button: {
    width: 300,
    height: 60,
    alignItems: "center",
    paddingVertical: 15,
    marginVertical: 10,
    backgroundColor: "#7646FF",
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 26,
    color: '#FFF',
  },
})