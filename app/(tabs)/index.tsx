import React from 'react';
import { Image, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AppInfo from '../../components/AppInfo';
import BatteryInfo from '../../components/BatteryInfo';
import ImagePickerExample from '../../components/ImagePickerExample';
import LocationExample from '../../components/LocationExample';
import CalendarExample from '../../components/CalendarExample';
import CameraExample from '../../components/CameraExample';
import ContactsExample from '../../components/ContactsExample';
import FingerprintExample from '../../components/FingerprintExample';
import IntentLauncherExample from '../../components/IntentLauncherExample';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: App Information</ThemedText>
        <AppInfo />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Battery Information</ThemedText>
        <BatteryInfo />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Image Picker</ThemedText>
        <ImagePickerExample />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 4: Location</ThemedText>
        <LocationExample />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 5: Calendar</ThemedText>
        <CalendarExample />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 6: Camera</ThemedText>
        <CameraExample />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 7: Contacts</ThemedText>
        <ContactsExample />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 8: Fingerprint</ThemedText>
        <FingerprintExample />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 9: Intent Launcher</ThemedText>
        <IntentLauncherExample />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
