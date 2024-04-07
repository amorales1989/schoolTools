// NameListModal.js
import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, FlatList, Button, TextInput } from 'react-native';

export default function NameListModal({ visible, onClose, alumns }) {
    const data = alumns

    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0'); // Agrega ceros a la izquierda si es necesario
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // El mes se indexa desde 0, así que suma 1
    const year = currentDate.getFullYear().toString();
    const formattedDate = `${day}/${month}/${year}`;
   // setDate(formattedDate);
    const [date, setDate] = useState(formattedDate);
   /*  const handlePresenceToggle = (id) => {
        const newData = data.map(item => {
            if (item.id === id) {
                return { ...item, present: !item.present };
            }
            return item;
        });
        setData(newData);
    };  */

 /*    const handleSave = () => {
        console.log('Guardando...');
        const newData = data.map(item => ({ ...item, present: false }));
        setData(newData);
        onClose();
    }; */

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
                        data={data} // Filtra por sexo
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.row}>
                                <Text style={styles.names}>{`${item.name} ${item.lastname}`}</Text>
                                <Button
                                    title={/* item.present ? 'Presente' :  */'Ausente'}
                                    color={/* item.present ? 'green' : */ 'red'}
                                   // onPress={() => handlePresenceToggle(item.id)}
                                />
                            </View>
                        )}
                    />
                    <View style={styles.buttonContainer}>
                        <Button title="Guardar" //onPress={handleSave} 
                        />
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
