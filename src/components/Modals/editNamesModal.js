import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import EditAlumnById from './editAlumn';
import deleteAlumnById from '../../service/deleteAlumn';
import DeleteConfirmationModalAlumn from './confirmModalAlumn';
import getAlumns from '../../service/getAllAlumns';

export default function EditNamesModal({ visible, onClose, reloadAlumns }) {
    const [editAlumnByIdVisible, setEditAlumnByIdVisible] = useState(false);
    const [selectedAlumnId, setSelectedAlumnId] = useState(null);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [selectedAlumn, setSelectedAlumn] = useState(null);
    const [alumnosActivos, setAlumnosActivos] = useState([]);

    useEffect(() => {
        // Función para cargar y filtrar alumnos
        const fetchAlumns = async () => {
            try {
                const allAlumnsData = await getAlumns();
                const filteredAlumns = allAlumnsData.filter(alumno => !alumno.deleted_at);
                setAlumnosActivos(filteredAlumns);
            } catch (error) {
                console.error('Error al obtener alumnos:', error);
            }
        };

        fetchAlumns();
    }, [reloadAlumns]);

    const handleEditAlumnByIdPress = (alumnId) => {
        setSelectedAlumnId(alumnId);
        setEditAlumnByIdVisible(true);
    };

    const handleDeleteConfirmation = (alumnId, name, surname) => {
        setSelectedAlumn({ id: alumnId, name, surname });
        setDeleteModalVisible(true);
    };

    const handleDeleteAlumn = () => {
        if (selectedAlumn) {
            deleteAlumnById(selectedAlumn.id)
                .then(() => {
                    reloadAlumns();
                    setDeleteModalVisible(false);
                })
                .catch((error) => console.error('Error al eliminar:', error));
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
                    <Text style={styles.modalTitle}>Lista de Nombres</Text>
                    <FlatList
                        data={alumnosActivos}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.row}>
                                <Text style={styles.names}>{`${item.name} ${item.surname}`}</Text>
                                <View style={styles.iconContainer}>
                                    <TouchableOpacity onPress={() => handleEditAlumnByIdPress(item.id)}>
                                        <Ionicons name="create" size={24} color="green" />
                                    </TouchableOpacity>
                                    <View style={styles.iconSeparator} />
                                    <TouchableOpacity onPress={() => handleDeleteConfirmation(item.id, item.name, item.surname)}>
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
                onClose={() => { setEditAlumnByIdVisible(false); reloadAlumns(); }}
                alumnId={selectedAlumnId}
            />
            <DeleteConfirmationModalAlumn
                visible={deleteModalVisible}
                onClose={() => setDeleteModalVisible(false)}
                onConfirm={handleDeleteAlumn}
                name={selectedAlumn ? selectedAlumn.name : ''}
                surname={selectedAlumn ? selectedAlumn.surname : ''}
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
        padding: 5,
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
