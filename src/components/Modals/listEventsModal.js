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
    const [deletedEvent, setDeletedEvent] = useState(null);

    useEffect(() => {
        fetchEvents();
    }, []);
    const fetchEvents = async () => {
        try {
            const data = await getEvents();
            const filteredData = data.filter(event => !event.deleted_at).map(event => {
                // Separar la fecha por "/"
                const parts = event.date.split("/");
                // Tomar solo el día y el mes
                const formattedDate = parts.slice(0, 2).join("/");
                // Crear un nuevo objeto de evento con la fecha formateada
                return { ...event, date: formattedDate };
            });
            setEvents(filteredData);
        } catch (error) {
            console.error('Error al obtener los eventos:', error);
        }
    };
    

    const handleEditEventByIdPress = (eventId) => {
        // Busca el evento en la lista de eventos usando el eventId
        const event = events.find(e => e.id === eventId);
        // Verifica si el evento fue encontrado 
        if (event) {
            setSelectedEvent(event); 
            setSelectedEventId(eventId);
            setEditEventByIdVisible(true); 
        } else {
            console.error('Evento no encontrado');
        }
    };
    

    const handleDeleteConfirmation = (eventId, eventName) => {
        console.log(eventId, eventName)
        setDeletedEvent({ id: eventId, name: eventName });
        setDeleteModalVisible(true); 
    };

    const handleDeleteEvent = () => { 
         deleteEventById(deletedEvent.id)
            .then(() => {
                fetchEvents(); // Recargar los eventos después de eliminar
                setDeleteModalVisible(false);
            })
            .catch((error) => console.error('Error al eliminar:', error)); 
    };

    const handleUpdateEventList = () => {
        fetchEvents(); // Recarga la lista de eventos
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
                    <TouchableOpacity style={[styles.buttonAdd, { alignSelf: 'center' }]} onPress={() => setAddEventModalVisible(true)} >
                        <Text style={[styles.buttonText, { textAlign: 'center' }]}>Agregar nuevo</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={events}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.row}>
                                <Text style={styles.names}>{item.date} - {item.time} - {item.title}</Text>

                                <View style={styles.iconContainer}>
                                    <TouchableOpacity onPress={() => handleEditEventByIdPress(item.id)}>
                                        <Ionicons name="create" size={24} color="green" />
                                    </TouchableOpacity>
                                    <View style={styles.iconSeparator} />
                                    <TouchableOpacity onPress={() => handleDeleteConfirmation(item.id, item.title)}>
                                        <Ionicons name="trash" size={24} color="red" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                </View>
            </View>
            <AddNewEventModal visible={addEventModalVisible} onClose={() => {setAddEventModalVisible(false), fetchEvents()}}/>
            <EditEventById
                visible={editEventByIdVisible}
                onClose={() => { setEditEventByIdVisible(false), fetchEvents() }}
                id={selectedEventId}
                event={selectedEvent}
            />
            <DeleteConfirmationModal
                visible={deleteModalVisible}
                onClose={() => setDeleteModalVisible(false)}
                onConfirm={handleDeleteEvent}
                name={deletedEvent ? deletedEvent.name : ''}
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
        width: '95%',
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
        fontSize: 12,
       // fontWeight: 'bold',
        marginBottom: 0,
    },
    iconContainer: {
        flexDirection: 'row',
    },
    iconSeparator: {
        width: 10,
    },

});
