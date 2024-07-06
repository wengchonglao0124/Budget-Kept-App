import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }) {
    const [incomeColor, setIncomeColor] = useState("green");
    const [expenseColor, setExpenseColor] = useState("red");

    useEffect(() => {
        const getTheme = async () => {
            try {
                const storedIncomeColor = await AsyncStorage.getItem("incomeColor");
                const parsedIncomeColor = storedIncomeColor ? storedIncomeColor : "green"; // check null
                setIncomeColor(parsedIncomeColor);

                const storedExpenseColor = await AsyncStorage.getItem("expenseColor");
                const parsedExpenseColor = storedExpenseColor ? storedExpenseColor : "red"; // check null
                setExpenseColor(parsedExpenseColor);
            } catch (error) {
                console.error("Error loading theme:", error);
            }
        };
        getTheme();
    }, []);

    useEffect(() => {
        const storeTheme = async () => {
            try {
                await AsyncStorage.setItem("incomeColor", incomeColor);
                await AsyncStorage.setItem("expenseColor", expenseColor);
            } catch (error) {
                console.error("Error saving theme:", error);
            }
        };
        storeTheme();
    }, [incomeColor, expenseColor]);

    return (
        <ThemeContext.Provider value={{ incomeColor, setIncomeColor, expenseColor, setExpenseColor }}>
            {children}
        </ThemeContext.Provider>
    );
}