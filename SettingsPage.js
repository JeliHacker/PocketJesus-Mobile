import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ExpandableListView } from 'react-native-expandable-listview';
import StatusBarBackground from './StatusBarBackground'

const CONTENT = [
    {
        id: "1",
        categoryName: "About",
        subCategory: [
            {
                id: "2",
                name: "About Pocket Jesus"
            }
        ]
    }
]

function SettingsPage() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                {/* <ExpandableListView
                data={CONTENT}
                chevronColor="black"
            /> */}

                <View style={styles.titleView}>
                    <Text style={styles.title}>
                        Pocket Jesus
                    </Text>
                </View>
                <View
                    style={{
                        borderBottomColor: 'black',
                        // borderBottomWidth: StyleSheet.hairlineWidth,
                        borderBottomWidth: 1.5
                    }}
                />
                <View>
                    <Text>Translation: </Text>

                </View>

                <Text>
                    Pocket Jesus is a mobile app that keeps Jesus's sayings in your pocket.
                    Get a daily notification with a random saying, or browse bible verses straight from your phone.
                </Text>

                <Text style={styles.aboutText}>
                    This app will always be free. I will never run ads on Pocket Jesus.
                    That being said, if you would like to support my work you can Venmo me @Eli-Gooch-2 :)
                </Text>

                <Text>Eli Gooch 2023</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    titleView: {
        alignItems: 'center'
    },
    title: {
        fontSize: 36
    },
    aboutText: {
        fontSize: 20
    }
})

export default SettingsPage;