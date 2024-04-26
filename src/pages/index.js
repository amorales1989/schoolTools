import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, BackHandler } from 'react-native';
import NameListModal from '../components/Modals/nameListModal';
import AddNewTeensModal from '../components/Modals/addnewteens';
import AddNewEventModal from '../components/Modals/addNewEvent';
import AttendanceList from './AttendanceList';
import { Ionicons } from '@expo/vector-icons';
import getAlumnsWoman from '../service/getAlumnsWoman';
import getAlumnsMan from '../service/getAlumnsMan';
import getEvents from '../service/getEvents';


export default function OtherScreen({ navigation }) {
    const [nameListModalVisible, setNameListModalVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [addEventModalVisible, setAddEventModalVisible] = useState(false);
    const [alumns, setAlumns] = useState([]);
    const [events, setEvents] = useState([]);
    const [newNotifications, setNewNotifications] = useState(0);


    useEffect(() => {
        // Esta función se ejecutará cada vez que cambie el estado de alumns
        setAlumns('');
    }, []);

    useEffect(() => {
        const backAction = () => {
            BackHandler.exitApp();
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
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

    const handleNewNotification = () => {
        setNewNotifications(prevCount => prevCount + 1);
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

    const handleGetEvents = async () => {
        try {
            const data = await getEvents();
            setEvents(data);
        } catch (error) {
            console.log('Error al obtener los eventos', error);
        }
    }
    useEffect(() => {
        handleGetEvents()
    }, []);

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
                    onPress={() => navigation.navigate('Asistencias')} // Navega a la nueva pantalla
                >
                    <Text style={styles.buttonText}>Ver asistencias</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.buttonAdd} onPress={() => setModalVisible(true)}>
                    <Text style={styles.buttonText}>Agregar nuevo</Text>
                </TouchableOpacity>

                <View style={styles.textAreaContainer}>
                    <TextInput
                        style={[styles.textarea, { color: 'black', fontWeight: 'bold', paddingLeft: 20 }]}
                        multiline={true}
                        numberOfLines={4}
                        value={events.map(event => `${event.event_title} - ${event.event_date} ${event.event_time}`).join('\n')}
                        editable={false} // No permitir la edición
                        selectTextOnFocus={false} // No seleccionar texto al enfocar
                    />

                </View>

                <View style={styles.footer}>

                    <TouchableOpacity
                        style={styles.footerButton}
                        onPress={() => navigation.navigate('Comunidad Cristiana Don Torcuato')}
                    >
                        <Ionicons name="home" size={24} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.footerButton} onPress={() => handleNotificationPress()}>
                        <Ionicons name="notifications" size={24} color="black" />
                        {newNotifications > 0 && (
                            <View style={styles.notificationBadge}>
                                <Text style={styles.notificationText}>{newNotifications}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.footerButton} onPress={() => setAddEventModalVisible(true)}>
                        <Ionicons name="calendar" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.footerButton} onPress={() => BackHandler.exitApp()}>
                        <Ionicons name="exit" size={24} color="black" />
                    </TouchableOpacity>

                </View>
            </View>
            <NameListModal
                visible={nameListModalVisible}
                onClose={() => setNameListModalVisible(false)}
                alumns={alumns}
            />
            <AddNewTeensModal visible={modalVisible} onClose={() => setModalVisible(false)} />
            <AddNewEventModal visible={addEventModalVisible} onClose={() => setAddEventModalVisible(false)} />
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
        borderRadius: 10,
        margin: 10,
        width: '80%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 }, // Cambia el valor de height a 4 para desplazar la sombra hacia abajo
        shadowOpacity: 0.3,
        shadowRadius: 0,
        elevation: 5,
    },
    button: {
        backgroundColor: 'rgb(200, 200, 200)',
        padding: 10,
        borderRadius: 10,
        margin: 10,
        width: '80%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 }, // Cambia el valor de height a 4 para desplazar la sombra hacia abajo
        shadowOpacity: 0.3,
        shadowRadius: 0,
        elevation: 10,

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
        height: 50,
    },
    footerButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textAreaContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 20,
        width: '100%',
        marginBottom: 60, // Añade un espacio inferior
    },
    textarea: {
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        width: '80%',
        height: 100,
        paddingHorizontal: 10,
        marginTop: 10,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 }, // Cambia el valor de height a 4 para desplazar la sombra hacia abajo
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 25 // Solo para Android
    },
    notificationBadge: {
        position: 'absolute',
        top: -5,
        right: 50,
        backgroundColor: 'red',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notificationText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },



});
