/*eslint-disable*/
import React, {Component} from 'react';
import { Text, StyleSheet, View, Dimensions } from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);

export default function GameCard(props) {

    
    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.opponent}>{props.data.opponent}</Text>
                <View style={styles.chart}>
                    <View style={props.data.first ? styles.done1 : styles.undone}></View>
                    <View style={props.data.second ? styles.done2 : styles.undone}></View>
                    <View style={props.data.third ? styles.done3 : styles.undone}></View>
                    <View style={props.data.fourth ? styles.done4 : styles.undone}></View>
                    <View style={props.data.fifth ? styles.done5 : styles.undone}></View>
                </View>
            </View>
            <Text style={styles.turn}>{props.data.turn}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 112,
        width: screenWidth,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'white',
        marginTop: 10,
    },
    opponent: {
        paddingHorizontal: 20,
        fontSize: 24,
    },
    chart: {
        paddingLeft: 50,
        flexDirection: 'row',
    },
    undone: {
        width: 30,
        height: 30,
        marginHorizontal: 4,
        backgroundColor: '#E9E9E9',
    },
    done1: {
        width: 30,
        height: 30,
        marginHorizontal: 4,
        backgroundColor: '#DED4FB',
    },
    done2: {
        width: 30,
        height: 30,
        marginHorizontal: 4,
        backgroundColor: '#CEBDFC',
    },
    done3: {
        width: 30,
        height: 30,
        marginHorizontal: 4,
        backgroundColor: '#A587FD',
    },
    done4: {
        width: 30,
        height: 30,
        marginHorizontal: 4,
        backgroundColor: '#855AFF',
    },
    done5: {
        width: 30,
        height: 30,
        marginHorizontal: 4,
        backgroundColor: '#7646FF',
    },
    turn: {
        paddingHorizontal: 20,
        paddingTop: 10,
        fontSize: 24,
        color: '#574980',

    },
});

    