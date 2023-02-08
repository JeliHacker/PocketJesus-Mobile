import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Button } from 'react-native';
import quotes from './data/quotes.json';

function MainPage() {
    const [data, setData] = useState([]);
    const [currentQuote, setCurrentQuote] = useState({});

    useEffect(() => {
        setData(quotes);
        const randomIndex = Math.floor(Math.random() * data.length);
        setCurrentQuote(data[randomIndex]);
    }, []);

    const getRandomQuote = () => {
        const randomIndex = Math.floor(Math.random() * data.length);
        setCurrentQuote(data[randomIndex]);
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('./assets/background1.png')}
                resizeMode="cover"
                style={styles.image}
            >
                <View style={styles.quoteContainer}>
                    <Text style={styles.quote}>Verse: {currentQuote.Verse}</Text>
                    <Text>{currentQuote.Text}</Text>
                </View>
                <Button
                    onPress={getRandomQuote}
                    title="Next"
                    accessibilityLabel="Press this button to get a random quote"
                />
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    quoteContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        alignItems: 'center',
    },
    quote: {
        alignContent: 'center',
        padding: 10,
        borderRadius: 10,
        fontSize: 20,
    },
});

export default MainPage;
