import React, {useState, useEffect, useRef} from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import {GlobalStyles} from "../styles/global";


const AmountInput = ({ value, onChange, type, disableAutoFocus }) => {
    const [digits, setDigits] = useState([]);
    const amountInputRef = useRef(null);
    const globalStyles = GlobalStyles();

    useEffect(() => {
        if (!disableAutoFocus) {
            amountInputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        const initialDigits = value ? (value * 100).toFixed(0).split('').map(Number) : [];
        setDigits(initialDigits);
    }, [value]);

    const handleInputChange = (text) => {
        const numericText = text.replace(/[^0-9]/g, '');
        const newDigits = numericText.split('').map(Number);

        setDigits(newDigits);

        if (newDigits.length === 0) {
            onChange(0);
        } else {
            const amount = parseFloat((parseInt(newDigits.join(''), 10) / 100).toFixed(2));
            onChange(amount);
        }
    };

    const handleKeyPress = ({ nativeEvent: { key } }) => {
        if (key === 'Backspace') {
            setDigits(prev => prev.slice(0, -1));
        } else if (!isNaN(key)) {
            setDigits(prev => [...prev, Number(key)]);
        }
    };

    useEffect(() => {
        const numericText = digits.join('');
        const amount = parseFloat((parseInt(numericText, 10) / 100).toFixed(2));
        onChange(amount);
    }, [digits]);

    const formattedValue = type === 'income'
        ? `$ ${parseFloat(digits.join('') / 100).toFixed(2)}`
        : `$ -${parseFloat(digits.join('') / 100).toFixed(2)}`;

    return (
        <View style={styles.amountContainer}>
            <TextInput
                ref={amountInputRef}
                style={[styles.amountInput, { color: type === 'income' ? globalStyles.income.color : globalStyles.expense.color }]}
                value={formattedValue}
                onChangeText={handleInputChange}
                onKeyPress={handleKeyPress}
                keyboardType="numeric"
                maxLength={10}
            />
        </View>
    );
};

export default AmountInput;


const styles = StyleSheet.create({
    amountContainer: {
        marginBottom: 20,
    },
    amountInput: {
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});