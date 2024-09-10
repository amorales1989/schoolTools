import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import getAlumnById from '../../service/getAlumnById';
import editAlumnById from '../../service/editAlumn';

export default function EditAlumnById({ visible, onClose, alumnId }) {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [sex, setSex] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (alumnId) {
            // Llamar a la función para obtener los datos del alumno por ID
            getAlumnById(alumnId)
                .then((alumnData) => {
                    // Establecer los datos del alumno en los campos correspondientes
                    setName(alumnData.name);
                    setLastName(alumnData.lastname);
                    setPhone(alumnData.phone);
                    setSex(alumnData.sex);
                })
                .catch((error) => console.error('Error al obtener datos del alumno:', error));
        }
    }, [alumnId]);

    const handleSave = async () => {
        const errors = {};
        if (!name.trim()) {
            errors.name = 'El nombre es requerido';
        }
        if (!lastName.trim()) {
            errors.lastName = 'El apellido es requerido';
        }
        if (!sex.trim()) {
            errors.sex = 'El sexo es requerido';
        }

        // Si hay errores, detener el guardado
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        const body = {name, lastName, sex: sex.trim().toLowerCase(), phone }
        await editAlumnById(alumnId, body)
        console.log('Guardando datos:', body);

        // Cierra el modal
        onClose();
        setName('');
        setLastName('');
        setPhone('');
        setSex('');
        setErrors({});
        
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
                    <Text style={styles.modalTitle}>Editar Datos</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Nombre"
                    />
                    {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                    <TextInput
                        style={styles.input}
                        value={lastName}
                        onChangeText={setLastName}
                        placeholder="Apellido"
                    />
                    {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

                    <TextInput
                        style={styles.input}
                        value={phone}
                        onChangeText={setPhone}
                        placeholder="Celular"
                    />
                    <TextInput
                        style={styles.input}
                        value={sex}
                        onChangeText={setSex}
                        placeholder="Sexo"
                    />
                    {errors.sex && <Text style={styles.errorText}>{errors.sex}</Text>}

                    <Button title="Guardar cambios" onPress={handleSave} />
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
        paddingLeft: 10,
        marginTop: 10,
        marginBottom: 10,
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
});
