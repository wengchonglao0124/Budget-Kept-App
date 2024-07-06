import {StyleSheet} from "react-native";


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#FAF3E0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 60,
        borderRadius: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#4A7C59',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        color: '#333',
        marginBottom: 20,
    },
    featuresContainer: {
        marginBottom: 50,
    },
    feature: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default styles;