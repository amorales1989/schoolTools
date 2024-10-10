import { supabase } from "../../supabase";

const getAbsentee = async (fecha) => {
    try {
        // Filtrar los datos por la fecha proporcionada
        const { data, error } = await supabase
            .from('asistencia')
            .select('absentee')  // Solo selecciona la columna 'absentee'
            .eq('fecha', fecha); // Filtra donde la columna 'fecha' sea igual a la fecha recibida
        
        if (error) {
            throw new Error('Error al obtener los alumnos: ' + error.message);
        }
        // Devolver los datos de la columna absentee
        return data; 
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};

export default getAbsentee;
