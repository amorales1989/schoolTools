import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import EditAlumnById from './editAlumn';
import deleteAlumnById from '../../service/deleteAlumn';
import DeleteConfirmationModal from './confirmModal';
export default function EditNamesModal({ visible, onClose, alumns, reloadAlumns }) {
    const [editAlumnByIdVisible, setEditAlumnByIdVisible] = useState(false);
    const [selectedAlumnId, setSelectedAlumnId] = useState(null);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false); // Estado para controlar la visibilidad del modal de confirmación
    const [selectedAlumn, setSelectedAlumn] = useState(null); // Estado para almacenar los detalles del alumno seleccionado

    const handleEditAlumnByIdPress = (alumnId) => {
        setSelectedAlumnId(alumnId);
        setEditAlumnByIdVisible(true);
    };

    const handleDeleteConfirmation = (alumnId, name, lastname) => {
        setSelectedAlumn({ id: alumnId, name, lastname }); // Almacena los detalles del alumno seleccionado
        setDeleteModalVisible(true); // Muestra el modal de confirmación
    };

    const handleDeleteAlumn = () => {
        deleteAlumnById(selectedAlumn.id)
            .then(() => {
                reloadAlumns();
                setDeleteModalVisible(false); // Cierra el modal de confirmación después de eliminar
            })
            .catch((error) => console.error('Error al eliminar:', error));
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
                    <Text style={styles.modalTitle}>Lista de Nombres</Text>
                    <FlatList
                        data={alumns}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.row}>
                                <Text style={styles.names}>{`${item.name} ${item.lastname}`}</Text>
                                <View style={styles.iconContainer}>
                                    <TouchableOpacity onPress={() => handleEditAlumnByIdPress(item.id)}>
                                        <Ionicons name="create" size={24} color="green" />
                                    </TouchableOpacity>
                                    <View style={styles.iconSeparator} />
                                    <TouchableOpacity onPress={() => handleDeleteConfirmation(item.id, item.name, item.lastname)}>
                                        <Ionicons name="trash" size={24} color="red" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                </View>
            </View>
            <EditAlumnById
                visible={editAlumnByIdVisible}
                onClose={() => { setEditAlumnByIdVisible(false), reloadAlumns() }}
                alumnId={selectedAlumnId}
            />
            <DeleteConfirmationModal
                visible={deleteModalVisible}
                onClose={() => setDeleteModalVisible(false)}
                onConfirm={handleDeleteAlumn}
                name={selectedAlumn ? selectedAlumn.name : ''}
                lastname={selectedAlumn ? selectedAlumn.lastname : ''}
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
        width: '80%',
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
    row: {
        backgroundColor: 'rgb(224, 255, 255)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    names: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    iconContainer: {
        flexDirection: 'row',
    },
    iconSeparator: {
        width: 10,
    },
});
