const getAlumnsWoman = async () => {
    try {
        const response = await fetch('https://school-tools-f4z9ru50f-amorales1989s-projects.vercel.app/alumns/woman', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
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

export default getAlumnsWoman;
