import {NavigationContainer} from "@react-navigation/native";
import LoginScreen from "./accessScreens/LoginScreen";
import ForgotPasswordScreen from "./accessScreens/ForgotPasswordScreen";
import SignUpScreen from "./accessScreens/SignUpScreen";
import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import styles from '../styles/general';


const Stack = createStackNavigator();

export default function AccessScreen() {
    return (
        <NavigationContainer style={styles.container}>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}