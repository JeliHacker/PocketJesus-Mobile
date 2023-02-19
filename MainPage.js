import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Button, Animated, Image } from 'react-native';
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

function MainPage() {
    const [isLoadingComplete, setLoadingComplete] = useState(false);
    const [data, setData] = useState(quotes);
    const [currentQuote, setCurrentQuote] = useState({});
    const [fadeAnim, setFadeAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        async function loadResourcesAsync() {
            try {
                await SplashScreen.preventAutoHideAsync();
                await loadAssets();
                setData(quotes);
                const randomIndex = Math.floor(Math.random() * data.length);
                setCurrentQuote(data[randomIndex]);
                setTimeout(() => {
                    Animated.timing(
                        fadeAnim,
                        {
                            toValue: 1,
                            duration: 1000,
                            useNativeDriver: true,
                        }
                    ).start();
                }, 500)

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
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start(() => {

            const randomIndex = Math.floor(Math.random() * data.length);
            setCurrentQuote(data[randomIndex]);
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        });
        console.log(currentQuote)
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={background1}
                resizeMode="cover"
                style={styles.imageBackground}
            >
                <View style={styles.quoteContainer}>
                    <Animated.Text style={[styles.verse, { opacity: fadeAnim }]}>
                        Verse: {currentQuote.Verse}
                    </Animated.Text>
                    <Animated.Text style={[styles.quote, { opacity: fadeAnim }]}>
                        {currentQuote.Text}
                    </Animated.Text>

                </View>
                <View style={styles.nextButton}>
                    <Button
                        onPress={getRandomQuote}
                        title="Next"
                        accessibilityLabel="Press this button to get a random quote"
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
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
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
        fontFamily: "times-new-roman",
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
