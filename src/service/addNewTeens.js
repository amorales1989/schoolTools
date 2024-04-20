const addNewTeens = async (body) => {
    try {
        const response = await fetch('https://school-tools-f4z9ru50f-amorales1989s-projects.vercel.app/alumns', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: body.name,
                lastName: body.lastName,
                sex: body.sex,
                phone: body.phone,
            }),
        });
        
        if (!response.ok) {
            throw new Error('Error al guardar los datos');
        }

        
        // Leer la respuesta solo si la solicitud fue exitosa
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};

export default addNewTeens;
