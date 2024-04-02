// HomeScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Pasar Lista</Text>
      <Button
        title="A2 central"
        onPress={() => navigation.navigate('A2 Central')}
      />
    </View>
  );
}
