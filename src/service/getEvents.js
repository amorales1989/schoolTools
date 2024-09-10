import { supabase } from "../../supabase";

const getEvents = async () => {
    try {
        const { data, error } = await supabase
            .from('evento')  // Nombre de la tabla
            .select('*');     // Seleccionar todos los campos

        if (error) {
            throw new Error('Error al obtener los eventos: ' + error.message);
        }

        return data;  // Devolver los datos de eventos
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};

export default getEvents;
