import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Button, useWindowDimensions, Animated, Image } from 'react-native';
import quotes from './data/quotes.json';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Asset } from 'expo-asset';

async function loadFonts() {
    await Promise.all([
        Font.loadAsync({
            'times-new-roman': require('./assets/fonts/TimesNewRoman.ttf'),
        }),
        Asset.loadAsync(background1)
    ]);
}

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();


const background1 = require('./assets/background1.png')

const FadeInView = (props) => {
    const [fadeAnim, setFadeAnim] = useState(new Animated.Value(0))  // Initial value for opacity: 0

    React.useEffect(() => {
        fadeAnim.setValue(0)
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true
            }
        ).start();
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
    // const [fontsLoaded, setFontsLoaded] = useState(false);
    const [data, setData] = useState(quotes);
    const [currentQuote, setCurrentQuote] = useState({});
    const [imageLoaded, setImageLoaded] = useState(false);


    useEffect(() => {
        async function loadResourcesAsync() {
            try {
                await SplashScreen.preventAutoHideAsync();
                await loadFonts();
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

    // useEffect(() => {
    //     async function loadFonts() {
    //         await Font.loadAsync({
    //             'times-new-roman': require('./assets/fonts/TimesNewRoman.ttf')
    //         });
    //         setFontsLoaded(true);
    //     }

    //     loadFonts();
    // }, []);

    // if (!fontsLoaded) {
    //     return <Text>Loading fonts...</Text>;
    // }

    // const [data, setData] = useState(quotes);
    // const [currentQuote, setCurrentQuote] = useState({});

    // useEffect(() => {
    //     setData(quotes);
    //     const randomIndex = Math.floor(Math.random() * data.length);
    //     setCurrentQuote(data[randomIndex]);
    // }, []);

    const getRandomQuote = () => {
        const randomIndex = Math.floor(Math.random() * data.length);
        setCurrentQuote(data[randomIndex]);
    };

    // const [isLoadingComplete, setLoadingComplete] = useState(false);

    // const [fontsLoaded, setFontsLoaded] = useState(false);

    // const [imageLoaded, setImageLoaded] = useState(false);

    // useEffect(() => {
    //     async function loadFonts() {
    //         await Font.loadAsync({
    //             'times-new-roman': require('./assets/fonts/TimesNewRoman.ttf')
    //         });
    //         setFontsLoaded(true);
    //     }

    //     loadFonts();
    // }, []);

    // if (!fontsLoaded || !imageLoaded) {
    //     return <Text>Loading...</Text>;
    // }

    // const [data, setData] = useState(quotes);
    // const [currentQuote, setCurrentQuote] = useState({});

    // useEffect(() => {
    //     setData(quotes);
    //     const randomIndex = Math.floor(Math.random() * data.length);
    //     setCurrentQuote(data[randomIndex]);
    // }, []);

    // const getRandomQuote = () => {
    //     const randomIndex = Math.floor(Math.random() * data.length);
    //     setCurrentQuote(data[randomIndex]);
    // };

    // const onLayoutRootView = useCallback(async () => {
    //     if (isLoadingComplete) {
    //         // This tells the splash screen to hide immediately! If we call this after
    //         // `setAppIsReady`, then we may see a blank screen while the app is
    //         // loading its initial state and rendering its first pixels. So instead,
    //         // we hide the splash screen once we know the root view has already
    //         // performed layout.
    //         await SplashScreen.hideAsync();
    //     }
    // }, [isLoadingComplete]);

    return (
        <View style={styles.container}>
            <ImageBackground
                source={background1}
                resizeMode="cover"
                style={styles.imageBackground}
            // onLoad={() => setImageLoaded(true)}
            >
                {/* <View style={styles.quoteContainer}> */}
                <FadeInView fadeAnim={fadeAnim} style={styles.quoteContainer}>
                    <Text style={styles.verse}>Verse: {currentQuote.Verse}</Text>
                    <Text style={styles.quote}>{currentQuote.Text}</Text>
                </FadeInView>
                {/* </View> */}
                <View style={styles.nextButton}>
                    <FadeInView>
                        <Button
                            onPress={getRandomQuote}
                            title="Next"
                            accessibilityLabel="Press this button to get a random quote"
                            style={{ alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}
                            setFadeAnim={setFadeAnim}
                        />
                    </FadeInView>
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
