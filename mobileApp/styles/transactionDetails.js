import {StyleSheet} from "react-native";


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#FAF3E0',
    },
    readOnlyContainer: {
        marginBottom: 20,
    },
    readOnlyLabel: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    readOnlyValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#555',
        marginBottom: 10,
    },
    typeSwitchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    typeSwitchButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingVertical: 10,
        borderRadius: 10,
        marginHorizontal: 5,
        backgroundColor: '#F0F0F0',
    },
    typeSwitchButtonActive: {
        backgroundColor: '#D4AF37',
    },
    typeSwitchText: {
        fontSize: 16,
        marginLeft: 5,
    },
    typeSwitchTextActive: {
        color: '#FFF',
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        backgroundColor: '#FFF',
    },
    categoryContainer: {
        marginBottom: 20,
    },
    categoryLabel: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
    },
    dateText: {
        fontSize: 16,
        color: '#333',
    },
    descriptionInput: {
        height: 100,
        marginTop: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#4A7C59',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        flex: 1,
        margin: 5,
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
    },
    cancelButton: {
        backgroundColor: 'red',
    },
    updateButton: {
        backgroundColor: 'rgba(77,186,219,0.98)',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});


const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        color: 'black',
        paddingRight: 30,
        backgroundColor: '#FFF',
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: '#ccc',
        borderRadius: 5,
        color: 'black',
        paddingRight: 30,
        backgroundColor: '#FFF',
    },
});

export {styles, pickerSelectStyles};