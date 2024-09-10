import Constants from 'expo-constants';
const deleteAlumnById = async (alumnId) => {
    try {
        const response = await fetch(`http://192.168.1.138:3006/alumns/${alumnId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al eliminar el alumno');
        }
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};

export default deleteAlumnById;
