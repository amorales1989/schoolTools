import { supabase } from "../../supabase";

const editEvent = async (eventId, body) => {
    console.log('BODY',body);
    console.log('ID',eventId);
    try {
        // Actualiza el evento con el ID específico en la tabla 'evento'
        const { data, error } = await supabase
            .from('evento')
            .update({
                title: body.title,
                date: body.date,
                time: body.time,
            })
            .eq('id', eventId); // Filtra por ID para actualizar el evento correcto

        if (error) {
            throw new Error('Error al actualizar el evento: ' + error.message);
        }

        return data; // Devuelve los datos actualizados
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};

export default editEvent;
