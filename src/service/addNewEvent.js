const addNewEvent = async (body) => {
    try {
        const response = await fetch('http://192.168.1.138:3006/event', {
            method: 'POST',
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
            const errorData = await response.json();
            throw new Error(errorData.error);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};
export default addNewEvent;