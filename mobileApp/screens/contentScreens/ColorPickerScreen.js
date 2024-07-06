import React, {useEffect, useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {useTheme} from "../../context/theme";
import {GlobalStyles} from "../../styles/global";
import styles from '../../styles/colorPicker';


const ColorPickerScreen = () => {
    const [inColor, setInColor] = useState('green');
    const [exColor, setExColor] = useState('red');
    const { setIncomeColor, setExpenseColor } = useTheme();
    const globalStyles = GlobalStyles();

    const colorOptions = ['red', 'green', '#FF5733', '#33FF57', '#3357FF', '#FFD700', '#FF69B4'];

    const renderColorOption = (color, setColor, selectedColor) => (
        <TouchableOpacity
            key={color}
            style={[styles.colorCircle, { backgroundColor: color }, selectedColor === color && styles.selectedColorCircle]}
            onPress={() => setColor(color)}
        />
    );

    useEffect(() => {
        setInColor(globalStyles.income.color);
        setExColor(globalStyles.expense.color);
    }, []);

    useEffect(() => {
        if (inColor) {
            setIncomeColor(inColor);
        }
        if (exColor) {
            setExpenseColor(exColor);
        }
    }, [inColor, exColor]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Colors</Text>
            <View style={styles.separator} />
            <View style={styles.section}>

                <View style={[styles.selectedColorDisplay, { backgroundColor: inColor }]}>
                    <Text style={styles.selectedColorText}>Income Color</Text>
                </View>

                <View style={styles.colorOptionsContainer}>
                    {colorOptions.map(color => renderColorOption(color, setInColor, inColor))}
                </View>
                <Text style={[styles.exampleAmount, { color: inColor }]}>$ 100.00</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.section}>

                <View style={[styles.selectedColorDisplay, { backgroundColor: exColor }]}>
                    <Text style={styles.selectedColorText}>Expense Color</Text>
                </View>

                <View style={styles.colorOptionsContainer}>
                    {colorOptions.map(color => renderColorOption(color, setExColor, exColor))}
                </View>
                <Text style={[styles.exampleAmount, { color: exColor }]}>$ -100.00</Text>
            </View>
            <View style={styles.separator} />
        </View>
    );
};

export default ColorPickerScreen;
