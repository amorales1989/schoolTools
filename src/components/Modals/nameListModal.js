// NameListModal.js
import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, FlatList, Button, TextInput } from 'react-native';

export default function NameListModal({ visible, onClose, sexFilter }) {
    const [data, setData] = useState([
        { id: 1, name: 'María', lastName: 'García', sex: 'femenino', present: false },
    { id: 2, name: 'Ana', lastName: 'Martínez', sex: 'femenino', present: false },
    { id: 3, name: 'Laura', lastName: 'Hernández', sex: 'femenino', present: false },
    { id: 4, name: 'Sofía', lastName: 'López', sex: 'femenino', present: false },
    { id: 5, name: 'Lucía', lastName: 'Gómez', sex: 'femenino', present: false },
    { id: 6, name: 'Claudia', lastName: 'Pérez', sex: 'femenino', present: false },
    { id: 7, name: 'Marta', lastName: 'Sánchez', sex: 'femenino', present: false },
    { id: 8, name: 'Elena', lastName: 'Díaz', sex: 'femenino', present: false },
    { id: 9, name: 'Paula', lastName: 'Rodríguez', sex: 'femenino', present: false },
    { id: 10, name: 'Beatriz', lastName: 'Muñoz', sex: 'femenino', present: false },
    { id: 11, name: 'Marina', lastName: 'Fernández', sex: 'femenino', present: false },
    { id: 12, name: 'Carmen', lastName: 'Gutiérrez', sex: 'femenino', present: false },
    { id: 13, name: 'Eva', lastName: 'Ruiz', sex: 'femenino', present: false },
    { id: 14, name: 'Patricia', lastName: 'Navarro', sex: 'femenino', present: false },
    { id: 15, name: 'Sara', lastName: 'Jiménez', sex: 'femenino', present: false },
    { id: 16, name: 'Rocío', lastName: 'Serrano', sex: 'femenino', present: false },
    { id: 17, name: 'Isabel', lastName: 'García', sex: 'femenino', present: false },
    { id: 18, name: 'Natalia', lastName: 'Martínez', sex: 'femenino', present: false },
    { id: 19, name: 'Mónica', lastName: 'Hernández', sex: 'femenino', present: false },
    { id: 20, name: 'Alicia', lastName: 'López', sex: 'femenino', present: false },
    { id: 21, name: 'Clara', lastName: 'Gómez', sex: 'femenino', present: false },
    { id: 22, name: 'Pilar', lastName: 'Pérez', sex: 'femenino', present: false },
    { id: 23, name: 'Cristina', lastName: 'Sánchez', sex: 'femenino', present: false },
    { id: 24, name: 'Lidia', lastName: 'Díaz', sex: 'femenino', present: false },
    { id: 25, name: 'Elena', lastName: 'Rodríguez', sex: 'femenino', present: false },
    { id: 26, name: 'Rosa', lastName: 'Muñoz', sex: 'femenino', present: false },
    { id: 27, name: 'Marta', lastName: 'Fernández', sex: 'femenino', present: false },
    { id: 28, name: 'Victoria', lastName: 'Gutiérrez', sex: 'femenino', present: false },
    { id: 29, name: 'Nerea', lastName: 'Ruiz', sex: 'femenino', present: false },
    { id: 30, name: 'Irene', lastName: 'Navarro', sex: 'femenino', present: false },
    { id: 31, name: 'Sandra', lastName: 'Jiménez', sex: 'femenino', present: false },
    { id: 32, name: 'Mireia', lastName: 'Serrano', sex: 'femenino', present: false },
    // Agrega más mujeres según sea necesario
    { id: 33, name: 'Pedro', lastName: 'Fernández', sex: 'masculino', present: false },
    { id: 34, name: 'Juan', lastName: 'Gutiérrez', sex: 'masculino', present: false },
    { id: 35, name: 'José', lastName: 'Ruiz', sex: 'masculino', present: false },
    { id: 36, name: 'Carlos', lastName: 'Navarro', sex: 'masculino', present: false },
    { id: 37, name: 'Luis', lastName: 'Jiménez', sex: 'masculino', present: false },
    { id: 38, name: 'Javier', lastName: 'Serrano', sex: 'masculino', present: false },
    { id: 39, name: 'Pablo', lastName: 'García', sex: 'masculino', present: false },
    { id: 40, name: 'Andrés', lastName: 'Martínez', sex: 'masculino', present: false },
    { id: 41, name: 'David', lastName: 'Hernández', sex: 'masculino', present: false },
    { id: 42, name: 'Jorge', lastName: 'López', sex: 'masculino', present: false },
    // Agrega más hombres según sea necesario
    ]);

    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0'); // Agrega ceros a la izquierda si es necesario
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // El mes se indexa desde 0, así que suma 1
    const year = currentDate.getFullYear().toString();
    const formattedDate = `${day}/${month}/${year}`;
   // setDate(formattedDate);
    const [date, setDate] = useState(formattedDate);
    const handlePresenceToggle = (id) => {
        const newData = data.map(item => {
            if (item.id === id) {
                return { ...item, present: !item.present };
            }
            return item;
        });
        setData(newData);
    };

    const handleSave = () => {
        console.log('Guardando...');
        const newData = data.map(item => ({ ...item, present: false }));
        setData(newData);
        onClose();
    };

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
                        data={data.filter(item => item.sex === sexFilter)} // Filtra por sexo
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.row}>
                                <Text style={styles.names}>{`${item.name} ${item.lastName}`}</Text>
                                <Button
                                    title={item.present ? 'Presente' : 'Ausente'}
                                    color={item.present ? 'green' : 'red'}
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
