import React, { useState } from 'react';
import { View, Button, StyleSheet, Text, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { ThemedText } from './ThemedText';

export default function FingerprintExample() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleAuthentication = async () => {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        if (!hasHardware) {
            Alert.alert('Error', 'Your device does not support fingerprint authentication.');
            return;
        }

        const isEnrolled = await LocalAuthentication.isEnrolledAsync();
        if (!isEnrolled) {
            Alert.alert('Error', 'No fingerprints are enrolled on this device.');
            return;
        }

        const result = await LocalAuthentication.authenticateAsync();
        if (result.success) {
            setIsAuthenticated(true);
            Alert.alert('Success', 'Authenticated successfully!');
        } else {
            Alert.alert('Error', 'Authentication failed.');
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Authenticate with Fingerprint" onPress={handleAuthentication} />
            {isAuthenticated && <ThemedText style={styles.successText}>Authenticated!</ThemedText>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    successText: {
        marginTop: 20,
        fontSize: 18,
        color: 'green',
    },
});
