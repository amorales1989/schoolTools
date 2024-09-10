async function saveAttendanceData(attendanceData) {
    console.log(attendanceData);
    try {
        const response = await fetch('http://192.168.1.138:3006/attendance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(attendanceData),
        });
        console.log("RESPONSE", response);

        // Verificar si la solicitud fue exitosa
        if (!response.ok) {
            throw new Error('Error al enviar la información de asistencia al backend');
        }

        // Leer la respuesta solo si la solicitud fue exitosa
        let data;
        try {
            data = await response.json();
        } catch (error) {
            //console.error('Error al analizar la respuesta JSON:', error);
            }

        return data;
    } catch (error) {
        throw error;
    }
}


export { saveAttendanceData };