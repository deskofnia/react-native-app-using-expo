import React, { useState, useEffect, useRef } from 'react';
import { View, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

export default function CameraExample() {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const [isCameraReady, setIsCameraReady] = useState(false);
    const cameraRef = useRef<Camera | null>(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleCameraReady = () => {
        setIsCameraReady(true);
    };

    const takePicture = async () => {
        if (cameraRef.current && isCameraReady) {
            const photo = await cameraRef.current.takePictureAsync();
            await MediaLibrary.saveToLibraryAsync(photo.uri);
            alert('Photo saved to gallery!');
        }
    };

    const switchCamera = () => {
        setCameraType(
            cameraType === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
        );
    };

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <Camera
                style={styles.camera}
                type={cameraType}
                ref={cameraRef}
                onCameraReady={handleCameraReady}
            >
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={switchCamera}>
                        <Text style={styles.text}> Flip </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={takePicture}>
                        <Text style={styles.text}> Snap </Text>
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        margin: 10,
    },
    text: {
        fontSize: 18,
        color: 'black',
    },
});
