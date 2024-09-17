import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import getAlumnById from '../../service/getAlumnById';
import editAlumnById from '../../service/editAlumn';
import { Picker } from '@react-native-picker/picker';

export default function EditAlumnById({ visible, onClose, alumnId }) {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [dni, setDni] = useState('');
    const [address, setAddress] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [sex, setSex] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            if (alumnId) {
                try {
                    const alumnData = await getAlumnById(alumnId);
                    // Verificar si alumnData es un array y usar el primer elemento
                    if (Array.isArray(alumnData) && alumnData.length > 0) {
                        const data = alumnData[0];
                        setName(data.name || '');
                        setLastName(data.surname || '');
                        setPhone(data.phone || '');
                        setAddress(data.address || '');
                        setBirthdate(data.birthday || '');
                        setDni(data.dni || '');
                        setSex(data.sex || '');
                    } else {
                        console.error('Datos del alumno no encontrados o no es un array.');
                    }
                } catch (error) {
                    console.error('Error al obtener datos del alumno:', error);
                }
            }
        };
        fetchData();
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

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        const body = { name, lastName, sex: sex.trim().toLowerCase(), phone, address, birthdate, dni };
        try {
            await editAlumnById(alumnId, body);
            onClose();
            // Limpiar los campos después de guardar
            setName('');
            setLastName('');
            setPhone('');
            setAddress('');
            setBirthdate('');
            setDni('');
            setSex('');
            setErrors({});
        } catch (error) {
            console.error('Error al guardar datos:', error);
        }
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
                    <Picker
                        style={styles.input}
                        selectedValue={sex}
                        onValueChange={(itemValue) => setSex(itemValue)}
                    >
                        <Picker.Item label="Seleccione sexo" value="" enabled={false} />
                        <Picker.Item label="Femenino" value="Femenino" />
                        <Picker.Item label="Masculino" value="Masculino" />
                    </Picker>
                    {errors.sex && <Text style={styles.errorText}>{errors.sex}</Text>}
                    <TextInput
                        style={styles.input}
                        value={dni}
                        onChangeText={setDni}
                        placeholder="DNI"
                    />
                    <TextInput
                        style={styles.input}
                        value={birthdate}
                        onChangeText={setBirthdate}
                        placeholder="Fecha de nacimiento"
                    />
                    <TextInput
                        style={styles.input}
                        value={address}
                        onChangeText={setAddress}
                        placeholder="Dirección"
                    />
                    <TextInput
                        style={styles.input}
                        value={phone}
                        onChangeText={setPhone}
                        placeholder="Celular"
                    />
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
