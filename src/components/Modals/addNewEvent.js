import React, { useState } from 'react';
import { View, Text, Modal, Button, TouchableOpacity, StyleSheet } from 'react-native';
import addNewEvent from '../../service/addNewEvent';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from 'react-native-gesture-handler';

export default function AddNewEventModal({ visible, onClose }) {
    const [eventTitle, setEventTitle] = useState('');
    const [eventDate, setEventDate] = useState(new Date());
    const [eventTime, setEventTime] = useState(new Date());
    const [errors, setErrors] = useState({});
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            console.log(selectedDate)
            const formattedDate = formatDate(selectedDate); // Formatear la fecha
            console.log(formattedDate)
            setEventDate(selectedDate);
        }
    };
    
    const handleTimeChange = (event, selectedTime) => {
        setShowTimePicker(false);
        if (selectedTime) {
            const formattedTime = formatTime(selectedTime); // Formatear la hora
            setEventTime(selectedTime);
        }
    };
    
const handleSave = async () => {
    const errors = {};
    if (!eventTitle.trim()) {
        errors.eventTitle = 'El título del evento es requerido';
    }
    // Si hay errores, detener el guardado
    if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
    }
    // Formatear la fecha y la hora antes de enviar
    const formattedDate = formatDate(eventDate);
    const formattedTime = formatTime(eventTime);
    const body = { eventTitle, eventDate: formattedDate, eventTime: formattedTime };
    
    await addNewEvent(body);
    // Cierra el modal
    onClose();
    setEventTitle('');
    setEventDate(new Date());
    setEventTime(new Date());
    setErrors({});
};

const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses comienzan desde 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};


const formatTime = (time) => {
    const hour = time.getHours().toString().padStart(2, '0');
    const minute = time.getMinutes().toString().padStart(2, '0');
    return `${hour}:${minute}`;
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
                    <Text style={styles.modalTitle}>Nuevo Evento</Text>
                    <Text style={styles.label}>Fecha:</Text>
                    <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
                    <Text style={styles.inputText}>{eventDate.toLocaleDateString('es-ES')}</Text>
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={eventDate}
                            mode="date"
                            display="spinner"
                            onChange={handleDateChange}
                        />
                    )}
                    <Text style={styles.label}>Hora:</Text>
                    <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.input}>
                        <Text style={styles.inputText}>
                            {eventTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false, hourCycle: 'h23' })}
                        </Text>
                    </TouchableOpacity>

                    {showTimePicker && (
                        <DateTimePicker
                            value={eventTime}
                            mode="time"
                            display="spinner"
                            onChange={handleTimeChange}
                        />
                    )}
                    <Text style={styles.label}>Título del Evento:</Text>
                    <TextInput
                        style={[styles.input, { textAlign: 'center' }]} // Aplica textAlign: 'center'
                        value={eventTitle}
                        onChangeText={setEventTitle}
                        placeholder="Título del Evento"
                    />

                    {errors.eventTitle && <Text style={styles.errorText}>{errors.eventTitle}</Text>}
                    <Button title="Guardar" onPress={() => handleSave()} />

                </View>
            </View>
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
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'center', // Centrar verticalmente el contenido
    },
    inputText: {
        textAlign: 'center', // Centrar horizontalmente el texto
        fontSize: 18,
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
    errorText: {
        color: 'red',
        marginBottom: 5,
    },
    label: {
        fontSize: 16,
        marginTop: 10,
        marginBottom: 5,
        fontWeight: 'bold',
    },
});
