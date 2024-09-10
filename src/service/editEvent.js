import Constants from 'expo-constants';

const editEvent = async (eventId, body) => {
    try {
        const response = await fetch(`http://192.168.1.138:3006/event/${eventId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                eventTitle: body.eventTitle,
                eventDate: body.eventDate,
                eventTime: body.eventTime,
            }),
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(errorData.error);
        }
        
        const data = await response.text();
        return data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};

export default editEvent;
