const getAlumnsMan = async () => {
    try {
        const response = await fetch('https://api-schooltools.onrender.com/alumns/man', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response)
        if (!response.ok) {
            throw new Error('Error al obtener los datos');
        }

        // Leer la respuesta solo si la solicitud fue exitosa
        const data = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};

export default getAlumnsMan;
