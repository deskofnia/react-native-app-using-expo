import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';
import { ThemedText } from './ThemedText';

export default function LocationExample() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Get the current location
  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    const currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);
  };

  useEffect(() => {
    // Watch for location changes
    const watchLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 10000,
          distanceInterval: 10,
        },
        (newLocation) => {
          setLocation(newLocation);
        }
      );
    };

    watchLocation();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Get Current Location" onPress={getLocation} />
      {errorMsg ? <Text>{errorMsg}</Text> : null}
      {location ? (
        <>
          <ThemedText>
            Latitude: {location.coords.latitude}
          </ThemedText>
          <ThemedText>
            Longitude: {location.coords.longitude}
          </ThemedText>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
