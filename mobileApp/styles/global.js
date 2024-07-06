import { StyleSheet } from "react-native";
import { useTheme } from "../context/theme";


export function GlobalStyles() {
    const { incomeColor, expenseColor } = useTheme();

    const styles = StyleSheet.create({
        income: {
            color: incomeColor,
        },
        expense: {
            color: expenseColor,
        },
    });

    return styles;
}