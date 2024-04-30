import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, FlatList, Button, TextInput } from 'react-native';
import { saveAttendanceData } from '../../service/addAttendance';


export default function NameListModal({ visible, onClose, alumns }) {
    const [date, setDate] = useState(getFormattedDate());
    const [attendanceData, setAttendanceData] = useState([]);

    // Función para obtener la fecha actual en formato DD/MM/YYYY
    function getFormattedDate() {
        const currentDate = new Date();
        const day = currentDate.getDate().toString().padStart(2, '0');
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const year = currentDate.getFullYear().toString();
        return `${day}/${month}/${year}`;
    }

    // Función para manejar el cambio de estado de presencia de un alumno
    function handlePresenceToggle(id) {
        setAttendanceData(prevData => {
            const newData = [...prevData];
            const existingAttendanceIndex = newData.findIndex(item => item.alumn_id === id && item.date === date);
            
            if (existingAttendanceIndex !== -1) {
                // Si el alumno ya está en la lista de asistencia para la fecha actual
                newData[existingAttendanceIndex].present = !newData[existingAttendanceIndex].present;
            } else {
                // Si el alumno no está en la lista de asistencia para la fecha actual, lo agregamos como presente
                newData.push({ alumn_id: id, date: date, present: true });
            }
            
            return newData;
        });
    }
    

    // Función para manejar el evento de guardar
    async function handleSave() {
        try {
            await saveAttendanceData(attendanceData);
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
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
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
                                <Text style={styles.names}>{`${item.name} ${item.lastname}`}</Text>
                                <Button
                                    title={attendanceData.some(data => data.id === item.id && data.date === date && data.present) ? 'Presente' : 'Ausente'}
                                    color={attendanceData.some(data => data.id === item.id && data.date === date && data.present) ? 'green' : 'red'}
                                    onPress={() => handlePresenceToggle(item.id)}
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
        marginBottom: 10,
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
