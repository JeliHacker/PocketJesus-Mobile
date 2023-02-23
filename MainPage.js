import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Animated, TouchableOpacity, Share } from 'react-native';
import quotes from './data/quotes.json';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Asset } from 'expo-asset';
import { AntDesign, Ionicons } from '@expo/vector-icons';

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
    };

    var shareMessage = `"${currentQuote["Text"]}" -${currentQuote["Verse"]}`

    const onShare = async () => {
        try {
            const result = await Share.share({
                // message: term.definition,
                message: shareMessage
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={background1}
                resizeMode="cover"
                style={styles.imageBackground}
            >
                <View style={styles.quoteContainer}>
                    <Animated.Text style={[styles.verse, { opacity: fadeAnim }]}>
                        {currentQuote.Verse}
                    </Animated.Text>
                    <Animated.Text style={[styles.quote, { opacity: fadeAnim }]}>
                        {currentQuote.Text}
                    </Animated.Text>

                </View>
                <View style={styles.panelContainer}>

                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={onShare}
                        style={styles.nextContainer}
                    >
                        <Ionicons name="share-outline" size={48} color="white" />
                    </TouchableOpacity>


                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={getRandomQuote}
                        // style={[styles.nextContainer, { flex: 2 }]}
                        style={styles.nextContainer}
                    >
                        <AntDesign name="caretright" size={48} color="white" />
                    </TouchableOpacity>

                    {/* <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={getRandomQuote}
                        style={styles.nextContainer}
                    >
                        <Text style={styles.nextButton}>Next</Text>
                    </TouchableOpacity> */}
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
        fontSize: 22,
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
    panelContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: '#ffffff',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'space-between',
        bottom: "1%",
        position: 'absolute',
        width: "90%"
    },
    nextContainer: {
        flex: 1,
        flexDirection: 'row',
        // backgroundColor: 'rgba(0, 255, 0, 0.5)',
        color: '#ffffff',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        bottom: "1%",
    },
    nextButton: {
        fontSize: 50,
        color: '#ffffff'
    }
});

export default MainPage;
