import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, FlatList, Button, TextInput, TouchableOpacity } from 'react-native';
import { saveAttendanceData } from '../../service/addAttendance';

export default function NameListModal({ visible, onClose, alumns }) {
    const [date, setDate] = useState(getFormattedDate());
       // Función para inicializar la lista de asistencia con todos los alumnos marcados como ausentes
       const initializeAttendanceData = () => {
        return alumns.map(alumn => ({
            alumnId: alumn.id,
            date: date,
            present: false
        }));
    };

    const [attendanceData, setAttendanceData] = useState(initializeAttendanceData());

    // Función para obtener la fecha actual en formato DD/MM/YYYY
    function getFormattedDate() {
        const currentDate = new Date();
        const day = currentDate.getDate().toString().padStart(2, '0');
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const year = currentDate.getFullYear().toString();
        return `${day}/${month}/${year}`;
    }

    // Función para manejar el cambio de estado de presencia de un alumno
    function handlePresenceToggle(id, isPresent) {
        setAttendanceData(prevData => {
            const newData = [...prevData];
            const existingAttendanceIndex = newData.findIndex(item => item.alumnId === id && item.date === date);
    
            if (existingAttendanceIndex !== -1) {
                // Si el alumno ya está en la lista de asistencia para la fecha actual
                newData[existingAttendanceIndex].present = isPresent;
            } else {
                // Si el alumno no está en la lista de asistencia para la fecha actual, lo agregamos como presente o ausente según el estado del botón
                newData.push({ alumnId: id, date: date, present: isPresent });
            }
    
            return newData;
        });
    }

    // Función para manejar el evento de guardar
    async function handleSave() {
        try {
            // Crear un nuevo arreglo con todos los alumnos
            const updatedAttendanceData = alumns.map(alumn => {
                // Verificar si el alumno está presente en la lista actual de asistencia
                const isPresent = attendanceData.some(data => data.alumnId === alumn.id && data.date === date && data.present);
                // Retornar el objeto de asistencia con el estado actualizado
                return { alumnId: alumn.id, date: date, present: isPresent };
            });
    
            // Enviar el nuevo arreglo actualizado al servidor
            await saveAttendanceData(updatedAttendanceData);
            setAttendanceData(initializeAttendanceData());
            onClose();
        } catch (error) {
            console.error('Error al guardar la información de asistencia:', error);
            // Manejar el error según tu lógica de aplicación
        }
    }
    

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
                    <Text style={styles.modalTitle}>Lista de Nombres</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.names}>Fecha de la clase</Text>
                        <TextInput
                            style={styles.input}
                            value={date}
                            onChangeText={setDate}
                            placeholder="Fecha"
                        />
                    </View>
                    <FlatList
                        data={alumns}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.row}>
                                <Text style={styles.names}>{`${item.name} ${item.surname}`}</Text>
                                <Button
                                    title={attendanceData.some(data => data.alumnId === item.id && data.date === date && data.present) ? 'Presente' : 'Ausente'}
                                    color={attendanceData.some(data => data.alumnId === item.id && data.date === date && data.present) ? 'green' : 'red'}
                                    onPress={() => handlePresenceToggle(item.id, !attendanceData.some(data => data.alumnId === item.id && data.date === date && data.present))}
                                />
                            </View>
                        )}
                    />
                    <View style={styles.buttonContainer}>
                        <Button title="Guardar" onPress={handleSave} />
                    </View>
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
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        maxHeight: '80%',
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
    modalTitle: {
        fontSize: 21,
        fontWeight: 'bold',
        marginBottom: 10,
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
        // marginBottom: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    input: {
        width: '40%',
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingLeft: 10,
    },
    buttonContainer: {
        marginTop: 20,
    },
});
