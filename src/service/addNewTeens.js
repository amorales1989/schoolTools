const addNewTeens = async (body) => {
    console.log(body)
    try {
        const response = await fetch('http://localhost:3002/alumns', {
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

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};

export default addNewTeens;
