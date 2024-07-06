import {Dimensions, StyleSheet} from "react-native";


const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FAF3E0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 40,
        color: '#4A7C59',
    },
    input: {
        width: width * 0.9,
        height: 40,
        borderColor: '#D4AF37',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: '#FFF',
    },
    passwordContainer: {
        width: width * 0.9,
        justifyContent: 'center',
    },
    icon: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    button: {
        width: width * 0.9,
        marginBottom: 20,
        backgroundColor: '#D4AF37',
    },
    buttonDisable: {
        width: width * 0.9,
        marginBottom: 20,
        backgroundColor: 'rgba(212,175,55,0.25)',
    },
    buttonText: {
        color: '#FFF',
    },
    link: {
        color: '#4A7C59',
        textAlign: 'center',
        marginTop: 10,
    },
    error: {
        color: '#c13269',
        textAlign: 'center',
        marginBottom: 10,
    },
    success: {
        color: 'rgba(146,219,77,0.98)',
        textAlign: 'center',
        marginBottom: 10,
    },
    pinContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width * 0.9,
        marginBottom: 20,
    },
    pinInput: {
        width: '15%',
        height: 50,
        borderColor: '#D4AF37',
        borderWidth: 1,
        borderRadius: 5,
        textAlign: 'center',
        fontSize: 24,
        backgroundColor: '#FFF',
    },
    timer: {
        fontSize: 18,
        color: '#4A7C59',
        marginBottom: 20,
    },
});

export default styles;