import { supabase } from "../../supabase";

const deleteAlumnById = async (alumnId) => {
    try {
        // Obtener la fecha y hora actual
        const now = new Date();
        // Restar 3 horas (180 minutos) a la fecha actual
        now.setHours(now.getHours() - 3);
        // Obtener la fecha y hora en formato ISO
        const isoDate = now.toISOString();

        const { data, error } = await supabase
            .from('alumns')
            .update({
                deleted_at: isoDate
            })
            .eq('id', alumnId);

        if (error) {
            throw new Error('Error al actualizar el evento: ' + error.message);
        }

        return data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};

export default deleteAlumnById;
