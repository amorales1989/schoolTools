// Función para enviar la información de asistencia al backend
async function saveAttendanceData(attendanceData) {
    try {
        const response = await fetch(`http://192.168.1.138:3006/attendance`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(attendanceData),
        });
        console.log("RESPONSE", response)
       // console.log("SERVICE",body)
        if (!response.ok) {
            throw new Error('Error al enviar la información de asistencia al backend');
        }

        // Leer la respuesta solo si la solicitud fue exitosa
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export { saveAttendanceData };