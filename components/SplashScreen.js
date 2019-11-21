import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';


export default function SplashScreen(props) {

    return (
        <View>
            <LinearGradient style={styles.container}
                colors={["#7646FF", "#FFFFFF"]}>
                <Text style={{ fontSize: 100, padding: 10, fontFamily: "Hiragino Sans", color: "white" }}>Tilez</Text>
                <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('LoginScreen')}>
                    <Text style={styles.text}>Begin</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        paddingTop: Constants.statusBarHeight,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: "75%",
        alignItems: "center",
        paddingVertical: 15,
        marginVertical: 10,
        backgroundColor: "#FFF",
        borderRadius: 7,
    },
    text: {
        fontFamily: "ArialRoundedMTBold",
        color: "black",
        fontSize: 20,
    }
})