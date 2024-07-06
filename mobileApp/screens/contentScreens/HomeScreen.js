import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Alert, RefreshControl, ScrollView, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useAuthentication} from "../../context/authentication";
import {useCurrentBalance} from "../../services/financialAPIService";
import styles from '../../styles/home';
import {useFocusEffect} from "@react-navigation/native";
import {GlobalStyles} from "../../styles/global";


const HomeScreen = ({ navigation }) => {
    const [username, setUsername] = useState('User');
    const [balance, setBalance] = useState(0.00);
    const [refreshing, setRefreshing] = useState(false);
    const [lastUpdate, setLastUpdate] = useState(new Date());
    const { getAccessToken, verifyAccessToken } = useAuthentication();
    const { getCurrentBalance, loading, error } = useCurrentBalance();
    const globalStyles = GlobalStyles();

    const updateBalance = async () => {
        await verifyAccessToken();
        const token = await getAccessToken();

        if (token !== null) {
            const result = await getCurrentBalance(token);
            if (!result[0]) {
                Alert.alert("Error Message", result[1]);
            } else {
                setBalance(result[1]);
                setUsername(result[2]);
                setLastUpdate(new Date());
            }
        }
        setRefreshing(false);
    };

    useEffect(() => {
        setRefreshing(true);
        updateBalance();
    }, []);

    useFocusEffect(
        useCallback(() => {
            setRefreshing(true);
            updateBalance();
        }, [])
    );

    const handleRecordExpense = () => {
        navigation.navigate('TransactionDetails',
            {
                type: 'expense'
            });
    };

    const handleRecordIncome = () => {
        navigation.navigate('TransactionDetails', { type: 'income' });
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        updateBalance();
    }, []);

    const formatTime = (date) => {
        return date.toLocaleString();
    };

    const formatBalance = (balance) => {
        return balance.toFixed(2);
    };

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <LinearGradient
                colors={['#FAF3E0', '#D4AF37']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.card}
            >
                <Text style={styles.balanceTitle}>Balance</Text>
                <Text style={[styles.balance, { color: balance >= 0 ? globalStyles.income.color : globalStyles.expense.color }]}>
                    $ {formatBalance(balance)}
                </Text>
                <Text style={styles.lastUpdate}>Last Update: {formatTime(lastUpdate)}</Text>
                <Text style={styles.userName}>{username}</Text>
            </LinearGradient>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.expenseButton]} onPress={handleRecordExpense}>
                    <Ionicons name="remove" size={24} color="#FFF" />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.incomeButton]} onPress={handleRecordIncome}>
                    <Ionicons name="add" size={24} color="#FFF" />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default HomeScreen;