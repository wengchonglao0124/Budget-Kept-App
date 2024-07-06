import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Ionicons} from "@expo/vector-icons";
import HomeScreen from "./HomeScreen";
import RecordsScreen from "./RecordsScreen";
import SettingsScreen from "./SettingsScreen";
import React from "react";


const Tab = createBottomTabNavigator();

export default function TabScreen() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === "Home") {
                        iconName = "home";
                    } else if (route.name === "Records") {
                        iconName = "list";
                    } else if (route.name === "Settings") {
                        iconName = "settings";
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                headerStyle: {
                    backgroundColor: 'rgba(250,243,224,0.41)',
                },
                tabBarActiveTintColor: '#4A7C59',
                tabBarInactiveTintColor: 'rgba(37,37,37,0.25)',
                tabBarStyle: {
                    backgroundColor: 'rgba(250,243,224,0.41)',
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{headerTitle: "My Treasury"}}/>
            <Tab.Screen name="Records" component={RecordsScreen} options={{headerTitle: "Transactions"}}/>
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
}