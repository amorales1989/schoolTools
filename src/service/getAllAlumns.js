import { supabase } from "../../supabase";


const getAlumns = async () => {
    try {
        // Realiza la consulta a la tabla "alumns"
        const { data, error } = await supabase
            .from('alumns')  // Nombre de la tabla
            .select('*');    // Seleccionar todos los campos
        
        if (error) {
            throw new Error('Error al obtener los alumnos: ' + error.message);
        }

        return data;  // Devuelve la lista de alumnos
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};

export default getAlumns;
