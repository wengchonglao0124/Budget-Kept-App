import React, {useCallback, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image, Alert, RefreshControl} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useTransactions } from '../../services/financialAPIService';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useAuthentication} from "../../context/authentication";
import styles from '../../styles/records';
import {GlobalStyles} from "../../styles/global";


const RecordsScreen = ({ navigation }) => {
    const [transactions, setTransactions] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const { getAccessToken, verifyAccessToken } = useAuthentication();
    const { getTransactionRecords, loading, error } = useTransactions();
    const globalStyles = GlobalStyles();

    const fetchTransactions = async () => {
        await verifyAccessToken();
        const token = await getAccessToken();

        if (token !== null) {
            const result = await getTransactionRecords(token);
            if (!result[0]) {
                Alert.alert("Error Message", result[1]);
            } else {
                setTransactions(result[1]);
            }
        }
        setRefreshing(false);
    };

    useFocusEffect(
        React.useCallback(() => {
            setRefreshing(true);
            fetchTransactions();
        }, [])
    );

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchTransactions();
    }, []);

    const renderTransaction = ({ item }) => (
        <TouchableOpacity
            style={styles.transactionContainer}
            onPress={() => navigation.navigate('TransactionDetails', { ...item })}
        >
            <Ionicons
                name={item.type === 'income' ? 'arrow-down-circle' : 'arrow-up-circle'}
                size={24}
                color={item.type === 'income' ? 'green' : 'red'}
                style={styles.transactionIcon}
            />
            <View style={styles.transactionDetails}>
                <Text style={styles.transactionCategory}>{item.category}</Text>
                <Text style={styles.transactionDate}>{new Date(item.date).toLocaleDateString()}</Text>
            </View>
            <Text style={[styles.transactionAmount, { color: item.type === 'income' ? globalStyles.income.color : globalStyles.expense.color }]}>
                $ {item.type === 'income' ? '' : '-'}{item.amount}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {transactions.length === 0 ? (
                <View style={styles.noRecordContainer}>
                    <Image source={require('../../assets/transaction.png')} style={styles.noRecordImage} />
                    <Text style={styles.noRecordText}>No transactions recorded.</Text>
                    <TouchableOpacity style={styles.recordButton} onPress={() => navigation.navigate('TransactionDetails')}>
                        <Ionicons name="add" size={24} color="#FFF" />
                        <Text style={styles.recordButtonText}>Add a transaction</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList
                    data={transactions}
                    renderItem={renderTransaction}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.transactionList}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                />
            )}
        </View>
    );
};

export default RecordsScreen;


