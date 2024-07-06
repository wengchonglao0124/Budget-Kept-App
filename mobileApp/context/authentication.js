import { createContext, useState, useEffect, useContext } from "react";
import * as SecureStore from 'expo-secure-store';
import useServerURL from "../configurations/serverAddressConfig";
import {Alert} from "react-native";


let API_URL = useServerURL();
const AuthenticationContext = createContext();

export const useAuthentication = () => useContext(AuthenticationContext);

export function AuthenticationProvider({ children }) {
    const [isSignedIn, setIsSignedIn] = useState(false);

    const getAccessToken = async () => {
        try {
            return await SecureStore.getItemAsync("accessToken");
        } catch (error) {
            console.error("Error loading access token:", error);
        }
    };

    const verifyAccessToken = async () => {
        try {
            let token = await getAccessToken();

            if (token !== null) {
                const response = await fetch(`${API_URL}/verify-token`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                })
                const responseData = await response.json();
                if (!response.ok) {
                    setIsSignedIn(false);
                    Alert.alert("Logged Out", responseData.message + ". Please login again.");
                    await SecureStore.deleteItemAsync("accessToken");
                } else {
                    setIsSignedIn(true);
                }
                console.log(responseData.message);
            }
            else {
                setIsSignedIn(false);
            }
        } catch (error) {
            console.error("Error verifying access token:", error);
            setIsSignedIn(false);
            await SecureStore.deleteItemAsync("accessToken");
        }
    };

    useEffect(() => {
        verifyAccessToken();

    }, [isSignedIn]);

    return (
        <AuthenticationContext.Provider value={{ isSignedIn, setIsSignedIn, getAccessToken, verifyAccessToken }}>
            {children}
        </AuthenticationContext.Provider>
    );
}