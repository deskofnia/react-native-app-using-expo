import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Text, FlatList, Alert } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function ContactsExample() {
    const [contacts, setContacts] = useState<Contacts.Contact[]>([]);

    console.log("contacts====", JSON.stringify(contacts, null, 2));

    useEffect(() => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails],
                });
                setContacts(data);
            } else {
                Alert.alert('Permission Denied', 'Contacts permission is required to use this feature.');
            }
        })();
    }, []);

    const renderItem = ({ item }: { item: Contacts.Contact }) => (
        <View style={styles.contactItem}>
            <Text style={styles.contactName}>{item.name}</Text>
            {item.phoneNumbers && item.phoneNumbers.map((phone, index) => (
                <Text key={index} style={styles.contactDetails}>{phone.number}</Text>
            ))}
            {item.emails && item.emails.map((email, index) => (
                <Text key={index} style={styles.contactDetails}>{email.email}</Text>
            ))}
        </View>
    );

    return (
        <View style={styles.container}>
            <Button title="Load Contacts" onPress={() => { }} />
            <FlatList
                data={contacts}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    contactItem: {
        marginBottom: 20,
    },
    contactName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    contactDetails: {
        fontSize: 16,
    },
});
