import Constants from 'expo-constants';
const deleteEventById = async (eventId) => {
    try {
        console.log("service",eventId)
        const response = await fetch(`http://192.168.1.138:3006/event/${eventId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al eliminar el evento');
        }
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};

export default deleteEventById;
