import React, { useEffect } from 'react';
import { View } from 'react-native';

export default function GoBack(props) {
    useEffect(() => {
        
    })
    props.navigation.navigate('GameScreen');
    return(
        <View />
    )
}