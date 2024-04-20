// App.js

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/home/home';
import OtherScreen from './src/pages';
import AttendanceList from './src/pages/AttendanceList'; // Importa el componente AttendanceList
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Comunidad Cristiana Don Torcuato">
        <Stack.Screen name="Comunidad Cristiana Don Torcuato" component={HomeScreen} />
        <Stack.Screen name="Asistencias" component={AttendanceList} />
        <Stack.Screen name="A2 Central" component={OtherScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
