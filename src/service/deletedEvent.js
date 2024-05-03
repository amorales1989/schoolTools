import Constants from 'expo-constants';
const deleteEventById = async (eventId) => {
    try {
        console.log("service",eventId)
        const response = await fetch(`http://localhost:3006/event/${eventId}`, {
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
