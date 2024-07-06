import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import licenses from '../../assets/licenses.json';
import styles from '../../styles/license';


const LicenseScreen = () => {
    const [licenseData, setLicenseData] = useState([]);

    useEffect(() => {
        // Parse the license data from the JSON file
        const parsedLicenses = Object.entries(licenses).map(([key, value]) => ({
            name: key,
            ...value,
        }));
        setLicenseData(parsedLicenses);
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Open Source Licenses</Text>
            {licenseData.map((license, index) => (
                <View key={index} style={styles.licenseContainer}>
                    <Text style={styles.licenseName}>{license.name}</Text>
                    <Text style={styles.licenseText}>{license.licenses}</Text>
                    <Text style={styles.licenseText}>{license.repository}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

export default LicenseScreen;
