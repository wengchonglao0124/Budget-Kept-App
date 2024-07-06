import {StyleSheet} from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        marginTop: 20,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        marginHorizontal: 20,
        marginBottom: 15,
        borderRadius: 10,
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
    },
    icon: {
        marginRight: 20,
    },
    title: {
        fontSize: 18,
        color: '#333',
        flex: 1,
    },
    chevron: {
        marginLeft: 'auto',
    },
});

export default styles;