import { supabase } from "../../supabase";

const editAlumnById = async (alumnId, newData) => {
    try {
        const { data, error } = await supabase
            .from('alumns')
            .update({
                name: newData.name,
                surname: newData.lastName,
                sex: newData.sex,
                phone: newData.phone,
                address: newData.address,
                birthday: newData.birthdate,
                dni:newData.dni
            })
            .eq('id', alumnId);

        if (error) {
            throw new Error('Error al actualizar los datos: ' + error.message);
        }

        return data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};

export default editAlumnById;
