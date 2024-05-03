import Constants from 'expo-constants';
const getAlumnById = async (alumnId) => {
    try {
        const response = await fetch(`http://api-schooltools.onrender.com/alumns/${alumnId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Error al obtener los datos del alumno');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};

export default getAlumnById;
