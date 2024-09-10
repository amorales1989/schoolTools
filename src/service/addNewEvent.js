import { supabase } from "../../supabase";

const addNewEvent = async (body) => {
    try {
        // Inserta un nuevo evento en la tabla 'evento'
        const { data, error } = await supabase
            .from('evento')
            .insert([
                {
                    title: body.eventTitle,
                    date: body.eventDate,
                    time: body.eventTime,
                }
            ]);

        if (error) {
            throw new Error('Error al guardar el evento: ' + error.message);
        }

        return data; // Devuelve los datos insertados
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};

export default addNewEvent;
