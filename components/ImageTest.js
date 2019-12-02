import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system';

export default function ImageTest(props) {
    const [profilePic, setProfilePic] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const picInfo = await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'profile/profile-pic.jpg');
                if (picInfo.exists) {
                    setProfilePic(picInfo.uri);
                } else {
                    console.log('pic doesn\'t exist');
                }
            } catch (e) {
                console.log(e);
            }
        })()
    })
    if (profilePic === null) {
        return <Text onPress={() => props.navigation.navigate('HomeScreen')}>Go Back</Text>
    } else {
        return (
            <View style={styles.container}>
                <Image source={{ uri: profilePic }} style={styles.pic} />
                <TouchableOpacity onPress={() => props.navigation.navigate('TakeProfilePic')} style={styles.button}>
                    <Text 
                        style={styles.buttonText}
                        
                    >
                        Retake
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.navigation.navigate('HomeScreen')} style={styles.button}>
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