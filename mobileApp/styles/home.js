import {StyleSheet} from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    card: {
        width: '90%',
        padding: 30,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        marginBottom: 30,
        position: 'relative', // Required for absolute positioning of username
    },
    balanceTitle: {
        fontSize: 16,
        marginBottom: 5,
    },
    balance: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    lastUpdate: {
        fontSize: 12,
        color: 'gray',
        marginBottom: 30,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
        marginTop: 20,
    },
    button: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
    },
    expenseButton: {
        backgroundColor: 'red',
        opacity: 0.6,
    },
    incomeButton: {
        backgroundColor: 'green',
        opacity: 0.6,
    },
});

export default styles;