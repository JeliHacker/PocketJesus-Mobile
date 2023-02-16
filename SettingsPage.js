import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ExpandableListView } from 'react-native-expandable-listview';

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
    const [showAbout, setShowAbout] = useState(false);

    const toggleAbout = () => {
        setShowAbout(!showAbout);
    };

    const aboutContent = showAbout ? (
        <View style={{ padding: 20 }}>
            <Text style={{ marginBottom: 10 }}>About Pocket Jesus</Text>
            <Text>Some information about the app</Text>
        </View>
    ) : null;

    return (
        <ExpandableListView
            data={CONTENT}
            chevronColor="black"
        />


    );
}

export default SettingsPage;
