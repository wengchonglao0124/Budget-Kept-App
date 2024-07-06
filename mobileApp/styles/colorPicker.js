import {StyleSheet} from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FAF3E0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    separator: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 10,
    },
    section: {
        marginBottom: 40,
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    colorOptionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    colorCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginHorizontal: 5,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    selectedColorCircle: {
        borderColor: '#000',
    },
    exampleAmount: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    selectedColorsContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    selectedColorDisplay: {
        width: '80%',
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
    },
    selectedColorText: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default styles;