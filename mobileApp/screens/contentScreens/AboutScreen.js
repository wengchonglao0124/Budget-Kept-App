import React from 'react';
import { View, Text, Image, ScrollView, Button } from 'react-native';
import styles from '../../styles/about';


const AboutScreen = ({navigation}) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={require('../../assets/icon.png')} style={styles.logo} />
            <Text style={styles.title}>About This App</Text>
            <Text style={styles.description}>
                Welcome to Budget Kept, your personal finance management app.
                This application helps you to keep track of your income and expenses
                effortlessly. With Budget Kept, you can:
            </Text>
            <View style={styles.featuresContainer}>
                <Text style={styles.feature}>- Record your income and expenses</Text>
                <Text style={styles.feature}>- View detailed transaction history</Text>
                <Text style={styles.feature}>- Categorise your transactions</Text>
                <Text style={styles.feature}>- Monitor your financial health</Text>
            </View>
            <Text style={styles.description}>
                Our goal is to provide you with an easy-to-use tool that helps you manage
                your finances effectively. Thank you for choosing Budget Kept!
            </Text>

            <Button
                title="View Open Source Licenses"
                onPress={() => navigation.navigate('Licenses')}
            />
        </ScrollView>
    );
};

export default AboutScreen;
