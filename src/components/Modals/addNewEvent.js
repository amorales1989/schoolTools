import React, { useState } from 'react';
import { View, Text, Modal, Button, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import addNewEvent from '../../service/addNewEvent';
import DateTimePicker from '@react-native-community/datetimepicker'; // Solo para móviles
import DatePicker from 'react-datepicker'; // Solo para la web
import { TextInput } from 'react-native-gesture-handler';
import 'react-datepicker/dist/react-datepicker.css';

export default function AddNewEventModal({ visible, onClose }) {
    const [eventTitle, setEventTitle] = useState('');
    const [eventDate, setEventDate] = useState(new Date());
    const [eventTime, setEventTime] = useState(new Date());
    const [errors, setErrors] = useState({});
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false); // Cierra el picker
        if (selectedDate) {
            setEventDate(selectedDate);
        }
    };

    const handleTimeChange = (event, selectedTime) => {
        setShowTimePicker(false); // Cierra el picker
        if (selectedTime) {
            setEventTime(selectedTime);
        }
    };

    const handleSave = async () => {
        const errors = {};
        if (!eventTitle.trim()) {
            errors.eventTitle = 'El título del evento es requerido';
        }
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }
        const formattedDate = formatDate(eventDate);
        const formattedTime = formatTime(eventTime);
        const body = { eventTitle, eventDate: formattedDate, eventTime: formattedTime };

        await addNewEvent(body);
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

                    {/* Selector de fecha */}
                    <Text style={styles.label}>Fecha:</Text>
                    {Platform.OS === 'web' ? (
                        <DatePicker
                            selected={eventDate}
                            onChange={handleDateChange}
                            dateFormat="dd/MM/yyyy"
                            className="custom-datepicker" // Añade estilo si es necesario
                        />
                    ) : (
                        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
                            <Text style={styles.inputText}>{formatDate(eventDate)}</Text>
                        </TouchableOpacity>
                    )}
                    {showDatePicker && Platform.OS !== 'web' && (
                        <DateTimePicker
                            value={eventDate}
                            mode="date"
                            display="spinner"
                            onChange={handleDateChange}
                        />
                    )}

                    {/* Selector de hora */}
                    <Text style={styles.label}>Hora:</Text>
                    {Platform.OS === 'web' ? (
                        <DatePicker
                            selected={eventTime}
                            onChange={handleTimeChange}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Hora"
                            dateFormat="HH:mm" // Asegura que el desplegable sea de 24 horas
                            timeFormat="HH:mm" // Asegura el formato 24 horas
                            className="custom-timepicker"
                        />
                    ) : (
                        <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.input}>
                            <Text style={styles.inputText}>{formatTime(eventTime)}</Text>
                        </TouchableOpacity>
                    )}
                    {showTimePicker && Platform.OS !== 'web' && (
                        <DateTimePicker
                            value={eventTime}
                            mode="time"
                            display="spinner"
                            is24Hour={true} // Asegura el formato 24hs
                            onChange={handleTimeChange}
                        />
                    )}

                    {/* Título del evento */}
                    <Text style={styles.label}>Título del Evento:</Text>
                    <TextInput
                        style={[styles.input, { textAlign: 'center' }]}
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
        justifyContent: 'center',
    },
    inputText: {
        textAlign: 'center',
        fontSize: 18,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 5,
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
