import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';

export default function TakeProfilePic(props) {
    const [hasCamPerm, setHasCamPerm] = useState(false);
    const [camType, setCamType] = useState(Camera.Constants.Type.front);
    const [cam, setCam] = useState(null);

    useEffect(() => {
        if (!hasCamPerm) {
            (async () => {
                const { status } = await Permissions.askAsync(Permissions.CAMERA);
                setHasCamPerm(status === 'granted');
            })();
        } 
    });

    const takePic = async () => {
        if (cam !== null) {
            let photo = await cam.takePictureAsync();
            try {
                
                console.log(photo.uri);
                await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'profile/');
                await FileSystem.copyAsync({
                    from: photo.uri,
                    to: FileSystem.documentDirectory + "profile/profile-pic.jpg",
                });
                let dir = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory + 'profile/');
                
                console.log(dir);
                props.navigation.navigate('ImageTest');
            } catch (e) {
                try {
                    await FileSystem.deleteAsync(FileSystem.documentDirectory + 'profile/profile-pic.jpg');
                    await FileSystem.copyAsync({
                        from: photo.uri,
                        to: FileSystem.documentDirectory + "profile/profile-pic.jpg",
                    });
                    let dir = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory + 'profile/');
                    props.navigation.navigate('HomeScreen');
                    console.log(dir);
                    props.navigation.navigate('ImageTest');
                } catch (e) {
                    console.log(e);
                }  
            }
        }
    }

    if (hasCamPerm === null) {
        return <View />
    } else if (!hasCamPerm) {
        return <View><Text>No Camera Permission</Text></View>
    } else {
        console.log(hasCamPerm)
        return (
            <View style={styles.container}>
                <Camera 
                    style={styles.pic} //flex:1
                    type={camType}
                    ref={ref => {
                        setCam(ref);
                    }}
                >
                </Camera>
                <TouchableOpacity onPress={takePic} style={styles.button}>
                    <Text 
                        style={styles.buttonText}
                    >
                        Take Profile
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setCamType(t => {
                            if (t === Camera.Constants.Type.front) {
                                return Camera.Constants.Type.back;
                            } else {
                                return Camera.Constants.Type.front;
                            }
                        })
                    }}
                    style={styles.button}
                >
                    <Text 
                        style={styles.buttonText}
                    >
                        Flip Camera
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={takePic} 
                    style={styles.button}
                    onPress={() => props.navigation.navigate('HomeScreen')}
                >
                    <Text 
                        style={styles.buttonText}
                    >
                        Back to Home
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