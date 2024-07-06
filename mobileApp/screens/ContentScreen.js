import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import styles from "../styles/general";
import TabScreen from "./contentScreens/TabScreen";
import TransactionDetailsScreen from "./contentScreens/TransactionDetailsScreen";
import AboutScreen from "./contentScreens/AboutScreen";
import LicenseScreen from "./contentScreens/LicenseScreen";
import ColorPickerScreen from "./contentScreens/ColorPickerScreen";
import {ThemeProvider} from "../context/theme";


const Stack = createStackNavigator();

export default function ContentScreen() {
    return (
        <NavigationContainer style={styles.container}>
            <ThemeProvider>
                <Stack.Navigator initialRouteName="Tab" screenOptions={{
                headerBackTitle: 'Back',
                headerTintColor: '#000',
            }}>
                    <Stack.Screen name="Tab" component={TabScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="TransactionDetails" component={TransactionDetailsScreen} options={{ title: 'Add Transaction' }} />
                    <Stack.Screen name="About" component={AboutScreen} options={{ title: 'About This App' }} />
                    <Stack.Screen name="Licenses" component={LicenseScreen} options={{ title: 'Open Source Licenses' }} />
                    <Stack.Screen name="Color" component={ColorPickerScreen} options={{ title: 'Color Scheme' }} />
                </Stack.Navigator>
            </ThemeProvider>
        </NavigationContainer>
    );
}