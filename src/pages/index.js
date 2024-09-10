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
import EditNamesModal from '../components/Modals/editNamesModal';
import ListEventModal from '../components/Modals/listEventsModal';
import getAlumns from '../service/getAllAlumns';


export default function OtherScreen({ navigation }) {
    const [nameListModalVisible, setNameListModalVisible] = useState(false);
    const [editNamesModalVisible, setEditNamesModalVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [addEventModalVisible, setAddEventModalVisible] = useState(false);
    const [alumns, setAlumns] = useState([]);
    const [allAlumns, setAllAlumns] = useState([]);
    const [events, setEvents] = useState([]);
    const [refreshing, setRefreshing] = useState(false); // Nuevo estado para indicar si se está actualizando



    useEffect(() => {
        loadAlumns();
        handleGetEvents();
    }, []);

    const loadAlumns = async () => {
        try {
            const allAlumnsData = await getAlumns();
            const activeAlumns = allAlumnsData.filter(alumn => !alumn.deleteddate);
    
            const womenAlumns = activeAlumns.filter(alumn => alumn.sex === 'femenino');
            const menAlumns = activeAlumns.filter(alumn => alumn.sex === 'masculino');
    
            womenAlumns.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
            menAlumns.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    
            const sortedAlumns = [...womenAlumns, ...menAlumns];
    
            setAllAlumns(sortedAlumns);
        } catch (error) {
            console.error('Error al buscar todos los alumnos:', error);
        }
    };   

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
            setAlumns(data);
        } catch (error) {
            console.error('Error al obtener las alumnas:', error);
        }
    };

    const handleGetAlumnsMan = async () => {
        try {
            const data = await getAlumnsMan();
            setAlumns(data);
        } catch (error) {
            console.error('Error al obtener las alumnos:', error);
        }
    };

    const handleGetEvents = async () => {
        try {
            setRefreshing(true);
            const data = await getEvents();
            const dataFilter = data.filter(event => !event.deleted_date);
            const upcomingEvents = dataFilter.slice(0, 4).map(event => {
                const parts = event.date.split("/");
                const formattedDate = parts.slice(0, 2).join("/");
                return { ...event, date: formattedDate };
            });
            setEvents(upcomingEvents);
        } catch (error) {
            console.log('Error al obtener los eventos', error);
        } finally {
            setRefreshing(false); 
        }
    };
    

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Image
                    source={require('../../assets/A2.png')}
                    style={styles.imageContainer}
                    resizeMode="contain"
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
                    onPress={() => navigation.navigate('Asistencias')} 
                >
                    <Text style={styles.buttonText}>Ver asistencias</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.buttonAdd} onPress={() => setModalVisible(true)}>
                    <Text style={styles.buttonText}>Agregar nuevo</Text>
                </TouchableOpacity>

                <View style={styles.textAreaContainer}>
                    <View style={styles.refreshIconContainer}>
                    <Text style={styles.buttonText1}>Próximos Eventos</Text>
                        {/* <TouchableOpacity onPress={handleGetEvents}>
                            <Ionicons name="refresh" size={24} color="black" style={styles.refreshIcon} />
                        </TouchableOpacity> */}
                    </View>
                    <TextInput
                        style={[styles.textarea, { color: 'black', paddingLeft: 10 }]}
                        multiline={true}
                        numberOfLines={4}
                        value={refreshing ? 'Cargando...' : events.map(event => `${event.date} - ${event.time} - ${event.title}`).join('\n')}
                        editable={false}
                        selectTextOnFocus={false} 
                    />
                </View>

                <View style={styles.footer}>

                    <TouchableOpacity
                        style={styles.footerButton}
                        onPress={() => navigation.navigate('Comunidad Cristiana Don Torcuato')}
                    >
                        <Ionicons name="home" size={24} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.footerButton} onPress={() => setEditNamesModalVisible(true)}>
                        <Ionicons name="pencil" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.footerButton} onPress={() => setAddEventModalVisible(true)}>
                        <Ionicons name="calendar" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.footerButton} onPress={() => BackHandler.exitApp()}>
                        <Ionicons name="exit" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <EditNamesModal
                visible={editNamesModalVisible}
                onClose={() => { setEditNamesModalVisible(false), handleGetEvents() }}
                alumns={allAlumns}
                reloadAlumns={loadAlumns}
            />
            <NameListModal
                visible={nameListModalVisible}
                onClose={() => { setNameListModalVisible(false), handleGetEvents() }}
                alumns={alumns}
            />
            <AddNewTeensModal visible={modalVisible} onClose={() => { setModalVisible(false), handleGetEvents() }} />
            <ListEventModal visible={addEventModalVisible} onClose={() => { setAddEventModalVisible(false), handleGetEvents() }} />
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
    buttonText1: {
        flex: 1, // Ajusta el tamaño del texto para ocupar el espacio disponible
        textAlign: 'center', // Centra el texto horizontalmente
        fontSize: 16,
        color: 'black',
        
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
        marginBottom: 20, 
    },
    refreshIconContainer: {
        flexDirection: 'row',
        alignItems: 'center', 
    },
    refreshIcon: {
        backgroundColor: 'rgb(200, 200, 200)', 
        borderRadius: 5, 
        marginRight: 40, 
        marginLeft: -60, 
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
        shadowOffset: { width: 0, height: 4 }, 
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 25 
    },
});
