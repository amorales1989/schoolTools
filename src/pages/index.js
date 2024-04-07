import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import NameListModal from '../components/Modals/nameListModal';
import AddNewTeensModal from '../components/Modals/addnewteens';
import { Ionicons } from '@expo/vector-icons';
import getAlumnsWoman from '../service/getAlumnsWoman';
import getAlumnsMan from '../service/getAlumnsMan';

export default function OtherScreen({ navigation }) {
    const [nameListModalVisible, setNameListModalVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [alumns, setAlumns] = useState([]);

useEffect(() => {
    // Esta función se ejecutará cada vez que cambie el estado de alumns
    setAlumns('');
}, []); 
    const handleGetAlumnsWoman = async () => {
        try {
            const data = await getAlumnsWoman();
           // console.log(data); // Haz lo que necesites con los datos obtenidos
            setAlumns(data);
        } catch (error) {
            console.error('Error al obtener las alumnas:', error);
            // Aquí puedes mostrar un mensaje de error al usuario si lo deseas
        }
    };

    const handleGetAlumnsMan = async () => {
        try {
            const data = await getAlumnsMan();
           // console.log(data); // Haz lo que necesites con los datos obtenidos
            setAlumns(data);
        } catch (error) {
            console.error('Error al obtener las alumnos:', error);
            // Aquí puedes mostrar un mensaje de error al usuario si lo deseas
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.content}>
            <Image
                    source={require('../../assets/A2.png')} // Cambia la ruta según la ubicación de tu imagen
                    style={styles.imageContainer}
                    resizeMode="contain" // Ajusta la imagen para que se ajuste al tamaño del contenedor
                />
                 <Text style={styles.text}>Asistencia</Text>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => {
                        setNameListModalVisible(true);
                        handleGetAlumnsWoman();
                    }}
                >
                    <Text style={styles.buttonText}>Mujeres</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => {
                        setNameListModalVisible(true);
                        handleGetAlumnsMan();
                    }}
                >
                    <Text style={styles.buttonText}>Varones</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => {
                       /*  setNameListModalVisible(true);
                        setSexFilter('masculino'); */
                    }}
                >
                    <Text style={styles.buttonText}>Ver asistencias</Text>
                </TouchableOpacity>
            
            
            <TouchableOpacity style={styles.buttonAdd} onPress={() => setModalVisible(true)}>
                    <Text style={styles.buttonText}>Agregar nuevo</Text>
                </TouchableOpacity>
                <Text>poner comentarios</Text>
            <View style={styles.footer}>
                {/* Botones del footer con iconos */}
                <TouchableOpacity style={styles.footerButton}>
                    <Ionicons name="home" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton}>
                    <Ionicons name="notifications" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton}>
                    <Ionicons name="settings" size={24} color="black" />
                </TouchableOpacity>
            </View>
            </View>
            <NameListModal 
                visible={nameListModalVisible} 
                onClose={() => setNameListModalVisible(false)} 
                alumns={alumns}
            />
            <AddNewTeensModal visible={modalVisible} onClose={() => setModalVisible(false)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row', // Para dividir horizontalmente
    },
    sidebar: {
        flex: 0.4, // El 30% del ancho total
        backgroundColor: 'lightgray',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    imageContainer: {
        flex: 0.5, // El 20% del ancho total
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 30, // Ajusta el espacio superior
    },
    text: {
        fontSize: 21,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 10,
    },
    content: {
        flex: 1, // El 70% del ancho total
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    buttonAdd: {
        backgroundColor: 'rgb(0, 225, 94)',
        padding: 10,
        borderRadius: 0,
        margin: 10,
        width: '80%',
    },
    button: {
        padding: 10,
        borderRadius: 0,
        marginVertical: 10,
        width: '80%', // Ancho del 80% del contenedor
        backgroundColor: 'rgba(0, 0, 0, 0.1)', // Color transparente de fondo
        transition: 'background-color 0.3s', // Transición de color de fondo
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
    },
    buttonHover: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)', // Color oscurecido al pasar el ratón
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#ddd',
        height: 60,
    },
    footerButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
