import { View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import {useAuthentication} from "../context/authentication";
import AccessScreen from "./AccessScreen";
import styles from '../styles/general';
import ContentScreen from "./ContentScreen";


// Keep the splash screen visible while fetching resources
SplashScreen.preventAutoHideAsync();

export default function MainScreen() {
    const [appIsReady, setAppIsReady] = useState(false);
    const { isSignedIn } = useAuthentication();

    useEffect(() => {
        async function prepare() {
            try {
                // Pre-load fonts, make any API calls you need to do here
                await Font.loadAsync(Entypo.font);
                await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (e) {
                console.warn(e);
            } finally {
                // Tell the application to render
                setAppIsReady(true);
            }
        }
        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    return (
        <View style={styles.container} onLayout={onLayoutRootView}>
            {isSignedIn ? (
                <ContentScreen />
            ) : (
                <AccessScreen />
            )}
        </View>
    );
}