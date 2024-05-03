import Constants from 'expo-constants';
const deleteAlumnById = async (alumnId) => {
    try {
        const response = await fetch(`${Constants.manifest.extra.REACT_APP_URL}alumns/${alumnId}`, {
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
