import React from 'react';
import { View, Text, Alert, TouchableOpacity, FlatList } from 'react-native';
import { useAuthentication } from "../../context/authentication";
import * as SecureStore from "expo-secure-store";
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/settings';


const settingsOptions = [
    { id: 'about', title: 'About', icon: 'information-circle' },
    { id: 'color', title: 'Color Scheme', icon: 'color-palette-sharp' },
    { id: 'logout', title: 'Logout', icon: 'log-out' },
];

const SettingsScreen = ({ navigation }) => {
    const { verifyAccessToken } = useAuthentication();

    const handleOptionPress = (id) => {
        if (id === 'logout') {
            Alert.alert(
                "Logout",
                "Are you sure you want to logout?",
                [
                    { text: "Cancel", style: "cancel" },
                    { text: "Logout", style: "destructive", onPress: () => handleLogout() }
                ]
            );
        } else if (id === 'about') {
            navigation.navigate('About');
        }
        else if (id === 'color') {
            navigation.navigate('Color');
        }
    };

    const handleLogout = async () => {
        Alert.alert("Logged Out", "You have been logged out.");
        await SecureStore.deleteItemAsync("accessToken");
        verifyAccessToken();
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => handleOptionPress(item.id)}>
            <Ionicons name={item.icon} size={24} color="#4A7C59" style={styles.icon} />
            <Text style={styles.title}>{item.title}</Text>
            <Ionicons name="chevron-forward" size={24} color="#ccc" style={styles.chevron} />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={settingsOptions}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

export default SettingsScreen;