import {StyleSheet} from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    transactionContainer: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 10,
        marginVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
    },
    transactionIcon: {
        marginRight: 15,
    },
    transactionDetails: {
        flex: 1,
    },
    transactionAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 20,
    },
    transactionCategory: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    transactionDate: {
        fontSize: 14,
        color: '#999',
    },
    noRecordContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noRecordImage: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    noRecordText: {
        fontSize: 18,
        color: '#999',
        marginBottom: 20,
    },
    recordButton: {
        flexDirection: 'row',
        backgroundColor: '#4A7C59',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    recordButtonText: {
        color: '#FFF',
        fontSize: 16,
        marginLeft: 10,
    },
    transactionList: {
        paddingBottom: 20,
    },
});

export default styles;