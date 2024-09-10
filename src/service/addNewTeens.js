import { supabase } from "../../supabase";

const addNewTeens = async (body) => {
    console.log(body)
    try {
        const { data, error } = await supabase
            .from('alumns')
            .insert([
                {
                    name: body.name,
                    surname: body.lastName,
                    birthday: body?.birthdate,
                    dni: body?.dni,
                    sex: body.sex,
                    address: body?.address,
                    phone: body?.phone,
                },
            ]);

        if (error) {
            throw new Error('Error al guardar los datos: ' + error.message);
        }

        return data; // Devolver los datos insertados
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};

export default addNewTeens;
