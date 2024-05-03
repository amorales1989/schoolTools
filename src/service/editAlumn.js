import Constants from 'expo-constants';
const editAlumnById = async (alumnId, newData) => {
    try {
        const response = await fetch(`${Constants.manifest.extra.REACT_APP_URL}alumns/${alumnId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newData),
        });

        if (!response.ok) {
            throw new Error('Error al editar el alumno');
        }

        const updatedData = await response.json();
        return updatedData;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};

export default editAlumnById;