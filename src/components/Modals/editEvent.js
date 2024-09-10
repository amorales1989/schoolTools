import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Button, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-datepicker'; // Importar DatePicker para la web
import 'react-datepicker/dist/react-datepicker.css'; // Importar estilos para DatePicker
import editEvent from '../../service/editEvent';

export default function EditEventModal({ visible, onClose, id, event }) {
    const [eventTitle, setEventTitle] = useState('');
    const [eventDate, setEventDate] = useState(new Date());
    const [eventTime, setEventTime] = useState(new Date());
    const [errors, setErrors] = useState({});
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    useEffect(() => {
        if (event) {
            setEventTitle(event.title);

            // Convertir el campo date desde "21/09" a un objeto Date
            const [day, month] = event.date.split('/').map(Number);
            const currentYear = new Date().getFullYear();
            setEventDate(new Date(currentYear, month - 1, day));

            // Convertir el campo time desde "12:00" a un objeto Date
            const [hour, minute] = event.time.split(':').map(Number);
            const timeDate = new Date();
            timeDate.setHours(hour, minute);
            setEventTime(timeDate);
        }
    }, [event]);

    const handleDateChange = (date) => {
        setEventDate(date);
    };

    const handleTimeChange = (event, selectedTime) => {
        setShowTimePicker(false);
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
        const body = { title: eventTitle, date: formattedDate, time: formattedTime };

        await editEvent(id, body); // Usar `id` en lugar de `event.id`
        onClose();
        setEventTitle('');
        setEventDate(new Date());
        setEventTime(new Date());
        setErrors({});
    };

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}`; // Retorna el formato "DD/MM"
    };

    const formatTime = (time) => {
        const hour = time.getHours().toString().padStart(2, '0');
        const minute = time.getMinutes().toString().padStart(2, '0');
        return `${hour}:${minute}`; // Retorna el formato "HH:MM"
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
                    <Text style={styles.modalTitle}>Editar Evento</Text>

                    <Text style={styles.label}>Fecha:</Text>
                    {Platform.OS === 'web' ? (
                        <DatePicker
                            selected={eventDate}
                            onChange={handleDateChange}
                            dateFormat="dd/MM/yyyy"
                            className="custom-datepicker"
                        />
                    ) : (
                        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
                            <Text style={styles.inputText}>{eventDate.toLocaleDateString('es-ES')}</Text>
                        </TouchableOpacity>
                    )}
                    {showDatePicker && (
                        <DateTimePicker
                            value={eventDate}
                            mode="date"
                            display="spinner"
                            onChange={(event, selectedDate) => handleDateChange(selectedDate || eventDate)}
                        />
                    )}

                    <Text style={styles.label}>Hora:</Text>
                    {Platform.OS === 'web' ? (
                         <DatePicker
                         selected={eventTime}
                         onChange={(date) => setEventTime(date)}
                         showTimeSelect
                         showTimeSelectOnly
                         timeIntervals={15}
                         timeCaption="Hora"
                         dateFormat="HH:mm"
                         timeFormat="HH:mm"
                         className="custom-timepicker"
                     />
                    ) : (
                        <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.input}>
                            <Text style={styles.inputText}>
                                {eventTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                            </Text>
                        </TouchableOpacity>
                    )}
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
                        style={[styles.input, { textAlign: 'center' }]}
                        value={eventTitle}
                        onChangeText={setEventTitle}
                        placeholder="Título del Evento"
                    />
                    {errors.eventTitle && <Text style={styles.errorText}>{errors.eventTitle}</Text>}
                    <Button title="Guardar" onPress={handleSave} />
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
