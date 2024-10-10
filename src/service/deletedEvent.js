import { supabase } from "../../supabase";

const deleteEventById = async (eventId) => {

    // Validación simple
    if (!eventId) {
        throw new Error('Event ID is required');
    }

    try {
        // Obtener la fecha y hora actual
        const now = new Date();
        // Restar 3 horas (180 minutos) a la fecha actual
        now.setHours(now.getHours() - 3);
        // Obtener la fecha y hora en formato ISO
        const isoDate = now.toISOString();

        // Actualiza el evento con el ID específico en la tabla 'evento'
        const { data, error } = await supabase
            .from('evento')
            .update({
                deleted_at: isoDate // Usa el formato ISO para la fecha
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

export default deleteEventById;
