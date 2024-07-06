import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView, TextInput, Alert} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';
import AmountInput from '../../components/AmountInput';
import {styles, pickerSelectStyles} from '../../styles/transactionDetails';
import {
    useAddTransactionRecord,
    useRemoveTransactionRecord,
    useUpdateTransactionRecord
} from "../../services/financialAPIService";
import {useAuthentication} from "../../context/authentication";


const categories = ['Uncategorized', 'Food', 'Drink', 'Transport', 'Utilities', 'Entertainment', 'Shopping', 'Healthcare', 'Other'];

const TransactionDetailsScreen = ({ route, navigation }) => {
    const { id, type, amount, category, date, description } = route.params || {};
    const [transactionId, setTransactionId] = useState(id || '');
    const [transactionType, setTransactionType] = useState(type === 'income' ? 'income' : 'expense');
    const [transactionAmount, setTransactionAmount] = useState(amount ? amount : 0);
    const [transactionCategory, setTransactionCategory] = useState(category || categories[0]);
    const [transactionDate, setTransactionDate] = useState(date ? new Date(date) : new Date());
    const [transactionDescription, setTransactionDescription] = useState(description || '');
    const { getAccessToken, verifyAccessToken } = useAuthentication();
    const { addTransactionRecord } = useAddTransactionRecord();
    const { updateTransactionRecord } = useUpdateTransactionRecord();
    const { removeTransactionRecord } = useRemoveTransactionRecord();

    useEffect(() => {
        if (route.params) {
            setTransactionId(id || '');
            setTransactionType(type === 'income' ? 'income' : 'expense');
            setTransactionAmount(amount ? amount : 0);
            setTransactionCategory(category || categories[0]);
            setTransactionDate(date ? new Date(date) : new Date());
            setTransactionDescription(description || '');
        }
    }, [route.params]);

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || transactionDate;
        setTransactionDate(currentDate);
    };

    const handleAdd = async () => {
        const newTransaction = {
            id: transactionId,
            type: transactionType,
            amount: parseFloat(transactionAmount.toFixed(2)),
            category: transactionCategory,
            date: transactionDate.toISOString(),
            description: transactionDescription,
        };

        await verifyAccessToken();
        const token = await getAccessToken();

        if (token !== null) {
            const result = await addTransactionRecord(token, newTransaction);
            if (!result[0]) {
                Alert.alert("Error Message", result[1]);
            } else {
                Alert.alert("Success Message", result[1]);
                navigation.goBack();
            }
        }
    };

    const confirmUpdate = () => {
        Alert.alert(
            "Update Transaction",
            "Are you sure you want to update this record?",
            [
                { text: "Cancel", style: "cancel"},
                { text: "Confirm", style: "default", onPress: () => handleUpdate() }
            ]
        );
    }

    const handleUpdate = async () => {
        const newTransaction = {
            transactionId: transactionId,
            type: transactionType,
            amount: parseFloat(transactionAmount.toFixed(2)),
            category: transactionCategory,
            date: transactionDate.toISOString(),
            description: transactionDescription,
        };

        await verifyAccessToken();
        const token = await getAccessToken();

        if (token !== null) {
            const result = await updateTransactionRecord(token, newTransaction);
            if (!result[0]) {
                Alert.alert("Error Message", result[1]);
            } else {
                Alert.alert("Success Message", result[1]);
            }
        }
    };

    const confirmDelete = () => {
        Alert.alert(
            "Remove Transaction",
            "Are you sure you want to remove this record?",
            [
                { text: "Cancel", style: "cancel"},
                { text: "Delete", style: "destructive", onPress: () => handleDelete() }
            ]
        );
    }

    const handleDelete = async () => {
        await verifyAccessToken();
        const token = await getAccessToken();

        if (token !== null) {
            const result = await removeTransactionRecord(token, transactionId);
            if (!result[0]) {
                Alert.alert("Error Message", result[1]);
            } else {
                Alert.alert("Success Message", result[1]);
                navigation.goBack();
            }
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {transactionId ? (
                <View style={styles.readOnlyContainer}>
                    <Text style={styles.readOnlyLabel}>Transaction ID:</Text>
                    <Text style={styles.readOnlyValue}>{transactionId}</Text>
                </View>
            ) : null}

            <View style={styles.typeSwitchContainer}>
                <TouchableOpacity
                    style={[styles.typeSwitchButton, transactionType === 'expense' && styles.typeSwitchButtonActive]}
                    onPress={() => setTransactionType('expense')}
                >
                    <Ionicons name="remove" size={24} color={transactionType === 'expense' ? '#FFF' : '#000'} />
                    <Text style={[styles.typeSwitchText, transactionType === 'expense' && styles.typeSwitchTextActive]}>Expense</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.typeSwitchButton, transactionType === 'income' && styles.typeSwitchButtonActive]}
                    onPress={() => setTransactionType('income')}
                >
                    <Ionicons name="add" size={24} color={transactionType === 'income' ? '#FFF' : '#000'} />
                    <Text style={[styles.typeSwitchText, transactionType === 'income' && styles.typeSwitchTextActive]}>Income</Text>
                </TouchableOpacity>
            </View>

            <AmountInput
                value={transactionAmount}
                onChange={setTransactionAmount}
                type={transactionType}
                disableAutoFocus={transactionId !== ''}
            />

            <View style={styles.categoryContainer}>
                <Text style={styles.categoryLabel}>Category:</Text>
                <RNPickerSelect
                    onValueChange={(value) => setTransactionCategory(value)}
                    items={categories.map((cat) => ({ label: cat, value: cat }))}
                    style={pickerSelectStyles}
                    value={transactionCategory}
                />
            </View>

            <DateTimePicker
                value={transactionDate}
                mode="date"
                display="default"
                onChange={handleDateChange}
            />

            <TextInput
                style={[styles.input, styles.descriptionInput]}
                placeholder="Description"
                value={transactionDescription}
                onChangeText={setTransactionDescription}
                multiline
            />

            {transactionId ? (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.updateButton]}
                        onPress={confirmUpdate}
                    >
                        <Text style={styles.buttonText}>Update</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.cancelButton]}
                        onPress={confirmDelete}
                    >
                        <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                </View>

            ) : (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, !transactionAmount && styles.buttonDisabled]}
                        onPress={handleAdd}
                        disabled={!transactionAmount}
                    >
                        <Text style={styles.buttonText}>Add</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.cancelButton]}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>
    );
};

export default TransactionDetailsScreen;