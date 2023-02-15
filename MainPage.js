import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Button, useWindowDimensions, Animated, Image } from 'react-native';
import quotes from './data/quotes.json';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Asset } from 'expo-asset';

const background1 = require('./assets/background1.png')

async function loadAssets() {
    await Promise.all([
        Font.loadAsync({
            'times-new-roman': require('./assets/fonts/TimesNewRoman.ttf'),
        }),
        Asset.loadAsync(background1)
    ]);
}

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();


const FadeInView = (props) => {
    const [fadeAnim, setFadeAnim] = useState(new Animated.Value(0))  // Initial value for opacity: 0

    React.useEffect(() => {
        fadeAnim.setValue(0)
        setTimeout(() => {
            Animated.timing(
                fadeAnim,
                {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true
                }
            ).start();
        }, 500);
    }, [fadeAnim])

    return (
        <Animated.View                 // Special animatable View
            style={{
                ...props.style,
                opacity: fadeAnim,         // Bind opacity to animated value
            }}
        >
            {props.children}
        </Animated.View>
    );
}

function MainPage() {
    const [fadeAnim, setFadeAnim] = useState(new Animated.Value(0))  // Initial value for opacity: 0
    const [isLoadingComplete, setLoadingComplete] = useState(false);
    const [data, setData] = useState(quotes);
    const [currentQuote, setCurrentQuote] = useState({});

    useEffect(() => {
        async function loadResourcesAsync() {
            try {
                await SplashScreen.preventAutoHideAsync();
                await loadAssets();
                setData(quotes);
                const randomIndex = Math.floor(Math.random() * data.length);
                setCurrentQuote(data[randomIndex]);

            } catch (e) {
                console.warn(e);
            } finally {
                setLoadingComplete(true);
                await SplashScreen.hideAsync();
            }
        }

        loadResourcesAsync();
    }, [data.length]);

    if (!isLoadingComplete) {
        return <Text>Loading...</Text>;
    }


    const getRandomQuote = () => {
        const randomIndex = Math.floor(Math.random() * data.length);
        setCurrentQuote(data[randomIndex]);
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={background1}
                resizeMode="cover"
                style={styles.imageBackground}
            >
                <FadeInView fadeAnim={fadeAnim} style={styles.quoteContainer}>
                    <Text style={styles.verse}>Verse: {currentQuote.Verse}</Text>
                    <Text style={styles.quote}>{currentQuote.Text}</Text>
                </FadeInView>
                <FadeInView style={styles.nextButton}>
                    <Button
                        onPress={getRandomQuote}
                        title="Next"
                        accessibilityLabel="Press this button to get a random quote"
                        style={{ alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}
                        setFadeAnim={setFadeAnim}
                    />
                </FadeInView>
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
        fontFamily: "times-new-roman"
    },
    verse: {
        alignContent: 'center',
        padding: 10,
        borderRadius: 10,
        fontSize: 30,
        marginHorizontal: 10,
        fontFamily: "times-new-roman"
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
