// AttendanceList.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AttendanceList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Proximamente lista de asistencias...</Text>
      {/* Aquí puedes agregar la lógica para mostrar todas las asistencias */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
});

export default AttendanceList;
