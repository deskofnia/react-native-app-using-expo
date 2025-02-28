import React from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import * as IntentLauncher from 'expo-intent-launcher';

export default function IntentLauncherExample() {
    const openSettings = () => {
        try {
            IntentLauncher.startActivityAsync(IntentLauncher.ActivityAction.SETTINGS);
        } catch (error) {
            Alert.alert('Error', 'Failed to open settings.');
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Open Settings" onPress={openSettings} />
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
});
