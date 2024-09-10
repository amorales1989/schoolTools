import { supabase } from "../../supabase";

const getAlumnsMan = async () => {
    try {
        // Realiza la consulta a la tabla 'alumns' donde 'sex' es igual a 'masculino'
        const { data, error } = await supabase
            .from('alumns')
            .select('*')
            .eq('sex', 'masculino'); // Filtro para solo traer los registros masculinos

        if (error) {
            throw new Error('Error al obtener los datos: ' + error.message);
        }

        return data; // Devuelve los datos
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};

export default getAlumnsMan;
