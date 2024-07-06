import {StyleSheet} from "react-native";


const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#FAF3E0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#4A7C59',
    },
    licenseContainer: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#FFF',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
    },
    licenseName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    licenseText: {
        fontSize: 14,
        color: '#666',
    },
});

export default styles;