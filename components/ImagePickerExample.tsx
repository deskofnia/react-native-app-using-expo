import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerExample() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Pick an image from the gallery
    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    // Take a photo using the camera
    const takePhoto = async () => {
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    // Remove the selected image
    const removeImage = () => {
        setSelectedImage(null);
    };

    return (
        <View style={styles.container}>
            <Button title="Pick an Image from Gallery" onPress={pickImage} />
            <Button title="Take a Photo" onPress={takePhoto} />
            {selectedImage && (
                <View style={styles.imageContainer}>
                    <Image source={{ uri: selectedImage }} style={styles.image} />
                    <TouchableOpacity style={styles.removeButton} onPress={removeImage}>
                        <Text style={styles.removeButtonText}>X</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        position: 'relative',
        marginTop: 20,
    },
    image: {
        width: 200,
        height: 200,
    },
    removeButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'red',
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    removeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
