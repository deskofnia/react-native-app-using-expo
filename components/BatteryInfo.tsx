import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import * as Battery from 'expo-battery';
import { ThemedText } from './ThemedText';

export default function BatteryInfo() {
    const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
    const [batteryState, setBatteryState] = useState<Battery.BatteryState | null>(null);
    const [powerMode, setPowerMode] = useState<boolean | null>(null);

    useEffect(() => {
        // Get initial battery information
        const getBatteryInfo = async () => {
            const level = await Battery.getBatteryLevelAsync();
            const state = await Battery.getBatteryStateAsync();
            const mode = await Battery.isLowPowerModeEnabledAsync();
            setBatteryLevel(level);
            setBatteryState(state);
            setPowerMode(mode);
        };

        getBatteryInfo();

        // Add listeners for battery level, state, and power mode changes
        const batteryLevelListener = Battery.addBatteryLevelListener(({ batteryLevel }) => {
            setBatteryLevel(batteryLevel);
        });

        const batteryStateListener = Battery.addBatteryStateListener(({ batteryState }) => {
            setBatteryState(batteryState);
        });

        const powerModeListener = Battery.addLowPowerModeListener(({ lowPowerMode }) => {
            setPowerMode(lowPowerMode);
        });

        // Clean up listeners on component unmount
        return () => {
            batteryLevelListener.remove();
            batteryStateListener.remove();
            powerModeListener.remove();
        };
    }, []);

    // Get a string representation of the battery state
    const getBatteryStateString = (state: Battery.BatteryState | null) => {
        switch (state) {
            case Battery.BatteryState.CHARGING:
                return 'Charging';
            case Battery.BatteryState.FULL:
                return 'Full';
            case Battery.BatteryState.UNPLUGGED:
                return 'Unplugged';
            default:
                return 'Unknown';
        }
    };

    return (
        <View style={styles.container}>
            <ThemedText style={styles.text}>Battery Level: {batteryLevel !== null ? `${(batteryLevel * 100).toFixed(0)}%` : 'N/A'}</ThemedText>
            <ThemedText style={styles.text}>Battery State: {getBatteryStateString(batteryState)}</ThemedText>
            <ThemedText style={styles.text}>Low Power Mode: {powerMode !== null ? (powerMode ? 'Enabled' : 'Disabled') : 'N/A'}</ThemedText>
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
