import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Alert, Platform } from 'react-native';
import * as Calendar from 'expo-calendar';
import { ThemedText } from './ThemedText';

export default function CalendarExample() {
    const [calendars, setCalendars] = useState<Calendar.Calendar[]>([]);
    const [events, setEvents] = useState<Calendar.Event[]>([]);

    // console.log("calendars===>>>>", calendars);
    // console.log("events===>>>>", events);

    // console.log(JSON.stringify(calendars, null, 2));
    console.log(JSON.stringify(events, null, 2));


    useEffect(() => {
        (async () => {
            const { status } = await Calendar.requestCalendarPermissionsAsync();
            if (status === 'granted') {
                const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
                setCalendars(calendars);
            } else {
                Alert.alert('Permission Denied', 'Calendar permission is required to use this feature.');
            }
        })();
    }, []);

    // Function to create a new calendar
    const createCalendar = async () => {
        const defaultCalendarSource: Calendar.Source =
            Platform.OS === 'ios'
                ? (await Calendar.getDefaultCalendarAsync()).source
                : { isLocalAccount: true, name: 'Expo Calendar', type: 'local' };

        const newCalendarID = await Calendar.createCalendarAsync({
            title: 'Expo Calendar',
            color: 'blue',
            entityType: Calendar.EntityTypes.EVENT,
            sourceId: 'id' in defaultCalendarSource ? defaultCalendarSource.id : undefined,
            source: defaultCalendarSource,
            name: 'internalCalendarName',
            ownerAccount: 'personal',
            accessLevel: Calendar.CalendarAccessLevel.OWNER,
        });

        Alert.alert('Calendar Created', `New calendar ID: ${newCalendarID}`);
    };

    // Function to create a new event in the first calendar
    const createEvent = async () => {
        const eventDetails = {
            title: 'Expo Event',
            startDate: new Date(),
            endDate: new Date(new Date().getTime() + 60 * 60 * 1000),
            timeZone: 'GMT',
            location: 'Expo Location',
        };

        const eventId = await Calendar.createEventAsync(calendars[0].id, eventDetails);
        Alert.alert('Event Created', `New event ID: ${eventId}`);
    };

    // Function to get events from the first calendar
    const getEvents = async () => {
        const events = await Calendar.getEventsAsync(
            [calendars[0].id],
            new Date(new Date().setDate(new Date().getDate() - 1)),
            new Date(new Date().setDate(new Date().getDate() + 1))
        );
        setEvents(events);
    };

    // Function to delete an event
    const deleteEvent = async (eventId: string) => {
        try {
            await Calendar.deleteEventAsync(eventId);
            Alert.alert('Event Deleted', `Event ID: ${eventId} has been deleted.`);
            // Refresh the events list
            getEvents();
        } catch (error) {
            Alert.alert('Error', 'Failed to delete the event.');
        }
    };

    // Function to get all calendars
    const getAllCalendars = async () => {
        try {
            const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
            setCalendars(calendars);
            Alert.alert('Calendars Fetched', `Fetched ${calendars.length} calendars.`);
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch calendars.');
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Create Calendar" onPress={createCalendar} />
            <Button title="Create Event" onPress={createEvent} />
            <Button title="Get Events" onPress={getEvents} />
            <Button title="Get All Calendars" onPress={getAllCalendars} />
            {events.length > 0 && (
                <View style={styles.eventsContainer}>
                    {events.map((event) => (
                        <View key={event.id} style={styles.eventItem}>
                            <ThemedText style={styles.eventText}>
                                {event.title} - {new Date(event.startDate).toLocaleString()}
                            </ThemedText>
                            <Button title="X" onPress={() => deleteEvent(event.id)} />
                        </View>
                    ))}
                </View>
            )}
            {calendars.length > 0 && (
                <View style={styles.calendarsContainer}>
                    {calendars.map((calendar) => (
                        <ThemedText key={calendar.id} style={styles.calendarText}>
                            {calendar.title}
                        </ThemedText>
                    ))}
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
    calendarsContainer: {
        marginTop: 20,
    },
    calendarText: {
        fontSize: 16,
        marginBottom: 10,
    },
    eventsContainer: {
        marginTop: 20,
    },
    eventText: {
        fontSize: 16,
        marginBottom: 10,
    },
    eventItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
});
