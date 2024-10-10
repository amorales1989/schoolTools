import { supabase } from "../../supabase";

const saveAttendanceData = async (attendanceData) => {
    try {
        // Extraer la fecha del primer elemento del array (asumiendo que todos tienen la misma fecha)
        const eventDate = attendanceData.length > 0 ? attendanceData[0].date : null;

        // Si no hay fecha en los datos de asistencia, lanzar un error
        if (!eventDate) {
            throw new Error('No se pudo encontrar la fecha en los datos de asistencia.');
        }

        // Prepara los datos para insertar en la tabla 'asistencia'
        const formattedData = (({
            absentee: JSON.stringify({ // Guardar los datos como un JSON
                attendanceData
            }),
            fecha: eventDate, // Guardar la fecha en la columna 'fecha'
        }));

        // Inserta los datos en la tabla 'asistencia'
        const { data, error } = await supabase
            .from('asistencia')
            .insert(formattedData);

        if (error) {
            throw new Error('Error al guardar la información de asistencia: ' + error.message);
        }

        return data; // Devuelve los datos insertados
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};

export { saveAttendanceData };
