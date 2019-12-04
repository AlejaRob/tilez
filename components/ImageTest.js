/* eslint-disable*/
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system';

export default function ImageTest(props) {
    const name = props.navigation.state.params.name;
    // state var to hold the profilePic URI
    const [profilePic, setProfilePic] = useState(null);

    // try to grab the picture when the component mounts
    useEffect(() => {
        (async () => {
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
    if (profilePic === null) {
        // no profile pic, just display a link back to home
        // shouldn't ever be here
        return <Text onPress={() => props.navigation.navigate('HomeScreen')}>Go Back</Text>
    } else {
        // picture exists, allow users to accept it or retake it
        return (
            <View style={styles.container}>
                <Image source={{ uri: profilePic }} style={styles.pic} />
                <TouchableOpacity onPress={() => props.navigation.navigate('TakeProfilePic', {name: name})} style={styles.button}>
                    <Text 
                        style={styles.buttonText}
                        
                    >
                        Retake
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.navigation.navigate('HomeScreen', {name: name})} style={styles.button}>
                    <Text 
                        style={styles.buttonText}
                    >
                        Confirm Profile
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

}

// styles
const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "ArialRoundedMTBold",
    },
    pic: {
        width: 300,
        height: 300,
    },
    button: {
        width: 300,
        paddingVertical: 15,
        marginVertical: 10,
        backgroundColor: "#7646FF",
        borderRadius: 7,
        alignItems: 'center',
    },
    buttonText: {
        color: "#FFF",
        fontSize: 18,
    },
})