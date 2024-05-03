import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, FlatList, TouchableOpacity, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import EditEventById from './editEvent';
import DeleteConfirmationModal from './confirmModal';
import getEvents from '../../service/getEvents';
import AddNewEventModal from './addNewEvent';
import deleteEventById from '../../service/deletedEvent';


export default function ListEventModal({ visible, onClose }) {
    const [events, setEvents] = useState([]);
    const [addEventModalVisible, setAddEventModalVisible] = useState(false);
    const [editEventByIdVisible, setEditEventByIdVisible] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const data = await getEvents();
            const filterData = data.filter(event => !event.deleted_date)
            setEvents(filterData);
        } catch (error) {
            console.error('Error al obtener los eventos:', error);
        }
    };

    const handleEditEventByIdPress = (eventId) => {
        setSelectedEventId(eventId);
        setEditEventByIdVisible(true);
    };

    const handleDeleteConfirmation = (eventId, eventName) => {
        setSelectedEvent({ id: eventId, name: eventName });
        setDeleteModalVisible(true);
    };

    const handleDeleteEvent = () => {
         deleteEventById(selectedEvent.id)
            .then(() => {
                fetchEvents(); // Recargar los eventos después de eliminar
                setDeleteModalVisible(false);
            })
            .catch((error) => console.error('Error al eliminar:', error)); 
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => onClose()}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity>
                    <Text style={[styles.modalTitle, { textAlign: 'center' }]}>Lista de Eventos</Text>
                    <TouchableOpacity style={[styles.buttonAdd, { alignSelf: 'center' }]} onPress={() => setAddEventModalVisible(true)}>
                        <Text style={[styles.buttonText, { textAlign: 'center' }]}>Agregar nuevo</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={events}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.row}>
                                <Text style={styles.names}>{item.event_date} - {item.event_time} - {item.event_title}</Text>

                                <View style={styles.iconContainer}>
                                    <TouchableOpacity onPress={() => handleEditEventByIdPress(item.id)}>
                                        <Ionicons name="create" size={24} color="green" />
                                    </TouchableOpacity>
                                    <View style={styles.iconSeparator} />
                                    <TouchableOpacity onPress={() => handleDeleteConfirmation(item.id, item.event_title)}>
                                        <Ionicons name="trash" size={24} color="red" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                </View>
            </View>
            <AddNewEventModal visible={addEventModalVisible} onClose={() => setAddEventModalVisible(false)} />
            <EditEventById
                visible={editEventByIdVisible}
                onClose={() => { setEditEventByIdVisible(false), fetchEvents() }}
                eventId={selectedEventId}
            />
            <DeleteConfirmationModal
                visible={deleteModalVisible}
                onClose={() => setDeleteModalVisible(false)}
                onConfirm={handleDeleteEvent}
                name={selectedEvent ? selectedEvent.name : ''}
            />
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 21,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        borderRadius: 30, // Establece el radio de borde
        borderWidth: 1,
        borderColor: 'gray',
        padding: 5, // Ajusta el espaciado interno para que se vea mejor
    },
    closeButtonText: {
        fontSize: 18,
        color: 'red',
    },
    buttonAdd: {
        fontSize: 15,
        backgroundColor: 'rgb(0, 215, 90)',
        padding: 10,
        borderRadius: 10,
        margin: 10,
        width: '50%',
    },
    row: {
        backgroundColor: 'rgb(224, 255, 255)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    names: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    iconContainer: {
        flexDirection: 'row',
    },
    iconSeparator: {
        width: 10,
    },

});
