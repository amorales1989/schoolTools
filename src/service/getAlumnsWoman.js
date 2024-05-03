import Constants from 'expo-constants';
const getAlumnsWoman = async () => {
    try {
        const response = await fetch(`${Constants.manifest.extra.REACT_APP_URL}alumns/woman`, {
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
