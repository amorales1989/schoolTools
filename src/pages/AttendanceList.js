import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import getAbsentee from './../service/getAbsentee'; // Asegúrate de importar correctamente tu función
import getAlumnById from './../service/getAlumnById'; // Importa tu función para obtener el alumno por su ID

const AttendanceList = () => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [attendanceList, setAttendanceList] = useState([]);
  const [searched, setSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Estado para manejar errores
  const [loading, setLoading] = useState(false); // Estado para manejar la carga

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  };

  const handleSearch = async () => {
    setLoading(true); // Iniciar carga
    const formattedDate = formatDate(date);
    setErrorMessage(''); // Reiniciar mensaje de error
    try {
      const absenteeData = await getAbsentee(formattedDate);

      const attendancePromises = absenteeData.map(async (item) => {
        const parsedData = JSON.parse(item.absentee);
        const { attendanceData } = parsedData;

        const alumnPromises = attendanceData.map(async (attendance) => {
          const alumnDataArray = await getAlumnById(attendance.alumnId);
          const alumnData = alumnDataArray[0];

          const name = alumnData && alumnData.name ? alumnData.name.trim() : 'Nombre desconocido';
          const surname = alumnData && alumnData.surname ? alumnData.surname.trim() : 'Apellido desconocido';
          const fullName = `${name} ${surname}`;

          return {
            name: fullName,
            present: attendance.present ? 'Presente' : 'Ausente',
          };
        });

        return Promise.all(alumnPromises);
      });

      const resolvedAttendance = await Promise.all(attendancePromises);
      const flattenedAttendance = resolvedAttendance.flat();
      setAttendanceList(flattenedAttendance);
      setSearched(true);
    } catch (error) {
      console.error('Error al obtener la lista de asistencia:', error.message);
      setErrorMessage('Hubo un problema al obtener la lista de asistencia.'); // Mensaje de error para el usuario
    } finally {
      setLoading(false); // Finalizar carga
    }
  };

  const resetSearch = () => {
    setAttendanceList([]);
    setSearched(false);
    setErrorMessage(''); // Reiniciar mensaje de error al reiniciar la búsqueda
  };

  const calculateTotals = () => {
    let presentCount = 0;
    let absentCount = 0;

    attendanceList.forEach(attendance => {
      if (attendance.present === 'Presente') {
        presentCount++;
      } else {
        absentCount++;
      }
    });

    return { presentCount, absentCount };
  };

  const { presentCount, absentCount } = searched ? calculateTotals() : { presentCount: 0, absentCount: 0 };
  const totalCount = presentCount + absentCount;

  return (
    <View style={styles.container}>
      {!searched ? (
        <>
          <Text style={styles.text}>Selecciona una fecha para ver la lista de asistencias:</Text>

          <TouchableOpacity onPress={() => setShowPicker(true)}>
            <TextInput
              style={styles.dateInput}
              value={formatDate(date)}
              editable={false} // Hacer que el input no sea editable
            />
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChange}
            />
          )}

          {/* Contenedor para centrar el botón */}
          <View style={styles.buttonContainer}>
            <Button title={loading ? "Cargando..." : "Buscar"} onPress={handleSearch} disabled={loading} />
          </View>
        </>
      ) : (
        <>
          <View style={styles.resultContainer}>
            <Text style={styles.title}>
              Asistencias del día: <Text style={styles.boldDate}>{formatDate(date)}</Text>
            </Text>
            {errorMessage ? (
              <Text style={styles.errorText}>{errorMessage}</Text>
            ) : (
              <Text style={styles.summary}>
                <Text style={styles.presentCount}>Presentes: {presentCount}</Text> |
                <Text style={styles.absentCount}> Ausentes: {absentCount}</Text> |
                <Text style={styles.totalCount}> Total: {totalCount}</Text>
              </Text>
            )}

            <View style={styles.scrollContainer}>
              <ScrollView style={styles.scrollView}>
                {attendanceList.length > 0 ? (
                  attendanceList.map((attendance, index) => (
                    <View key={index} style={styles.row}>
                      <Text style={styles.nameText}>{attendance.name}</Text>
                      <View style={attendance.present === 'Presente' ? styles.statusPresent : styles.statusAbsent}>
                        <Text style={styles.statusText}>{attendance.present}</Text>
                      </View>
                    </View>
                  ))
                ) : (
                  !errorMessage && <Text style={styles.text}>No hay datos de asistencia para esta fecha.</Text>
                )}
              </ScrollView>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Volver a buscar" onPress={resetSearch} />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
  },
  text: {
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  boldDate: {
    fontWeight: 'bold', // Hacer la fecha en negrita
    color: 'black', // Color negro para la fecha
  },
  
  summary: {
    fontSize: 16,
    marginVertical: 10,
  },
  presentCount: {
    color: 'green',
  },
  absentCount: {
    color: 'red',
  },
  totalCount: {
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
  dateInput: {
    height: 40,
    borderColor: 'black', // Borde negro
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    textAlign: 'center', // Centrar el texto en el input
    width: '40%', // Asegúrate de que el input tenga un ancho del 30%
    alignSelf: 'center', // Centrar el input horizontalmente
    fontSize: 18, // Aumentar el tamaño del texto
  },
  resultContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  scrollContainer: {
    height: '83%', // Establecer la altura del contenedor del ScrollView al 70% de la pantalla
    width: '100%',
    marginBottom: 5, // Reducir el margen inferior para acercar el botón
  },
  scrollView: {
    width: '100%', // Asegúrate de que el ScrollView ocupe todo el ancho disponible
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  nameText: {
    flex: 3,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  statusPresent: {
    flex: 1,
    backgroundColor: 'green',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  statusAbsent: {
    flex: 1,
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  statusText: {
    color: 'white',
  },
  buttonContainer: {
    marginBottom: 10, // Reducir el margen inferior para acercar el botón
    width: '30%', // Asegurarse de que el botón tenga un ancho del 30%
    alignSelf: 'center', // Centrar el botón horizontalmente
  },
});

export default AttendanceList;
