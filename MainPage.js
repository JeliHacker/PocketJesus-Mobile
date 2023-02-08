import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import quotes from './data/quotes.json';



function MainPage() {

    const [data, setData] = useState([]);
    const [firstItem, setFirstItem] = useState([]);

    useEffect(() => {
        setData(quotes);
        setFirstItem(quotes[0])
    }, [])

    return (
        <View style={styles.container}>
            <ImageBackground source={require("./assets/background1.png")} resizeMode="cover" style={styles.image}>
                <Text>Index: {firstItem.Index}</Text>
                <Text>Verse: {firstItem.Verse}</Text>
                <Text>Text: {firstItem.Text}</Text>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        resizeMode: 'contain'
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    }
})

export default MainPage;