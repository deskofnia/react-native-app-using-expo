import React from 'react';
import { View, StyleSheet } from 'react-native';
import * as Application from 'expo-application';
import { ThemedText } from './ThemedText';

export default function AppInfo() {
    return (
        <View style={styles.container}>
            {/* Display the application name */}
            <ThemedText style={styles.text}>App Name: {Application?.applicationName}</ThemedText>
            {/* Display the application version */}
            <ThemedText style={styles.text}>App Version: {Application?.nativeApplicationVersion}</ThemedText>
            {/* Display the build version */}
            <ThemedText style={styles.text}>Build Version: {Application?.nativeBuildVersion}</ThemedText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
    },
});
