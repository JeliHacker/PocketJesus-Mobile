import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Button, useWindowDimensions, Animated } from 'react-native';
import quotes from './data/quotes.json';
import * as Font from 'expo-font';

async function loadFonts() {
    await Font.loadAsync({
        'TimesNewRoman': require('./assets/fonts/TimesNewRoman.ttf'),
    });
}

// const FadeInView = (props) => {
//     const [fadeAnim] = useState(new Animated.Value(0))  // Initial value for opacity: 0

//     React.useEffect(() => {
//         Animated.timing(
//             fadeAnim,
//             {
//                 toValue: 1,
//                 duration: 1000,
//             }
//         ).start();
//     }, [])

//     return (
//         <Animated.View                 // Special animatable View
//             style={{
//                 ...props.style,
//                 opacity: fadeAnim,         // Bind opacity to animated value
//             }}
//         >
//             {props.children}
//         </Animated.View>
//     );
// }

function MainPage() {
    const [isLoadingComplete, setLoadingComplete] = useState(false);

    useEffect(() => {
        loadFonts().then(() => setLoadingComplete(true));
    }, []);

    const [data, setData] = useState(quotes);
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
                style={styles.imageBackground}
            >
                <View style={styles.quoteContainer}>
                    {/* <FadeInView> */}
                    <Text style={styles.verse}>Verse: {currentQuote.Verse}</Text>
                    <Text style={styles.quote}>{currentQuote.Text}</Text>
                    {/* </FadeInView> */}
                </View>
                <View style={styles.nextButton}>
                    <Button
                        onPress={getRandomQuote}
                        title="Next"
                        accessibilityLabel="Press this button to get a random quote"
                        style={{ alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}
                    />
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quoteContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 20,
        top: "8%",
        position: 'absolute',
        width: '95%',
        height: '41%'
    },
    quote: {
        alignContent: 'center',
        padding: 10,
        borderRadius: 10,
        // fontSize: currentQuote.Text.length > 20 ? 18 : 20,
        fontSize: 20,
        marginHorizontal: 10,
        fontFamily: "TimesNewRoman"
    },
    verse: {
        alignContent: 'center',
        padding: 10,
        borderRadius: 10,
        fontSize: 30,
        marginHorizontal: 10,
        fontFamily: "TimesNewRoman"
    },
    nextButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        bottom: "20%",
        position: 'absolute'
    }
});

export default MainPage;
