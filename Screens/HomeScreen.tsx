import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen: React.FC = ({ navigation }: any) => {
  return (
    <View>
      <Text>Welcome to the Home Screen!</Text>
      <Button title="Go to Settings" onPress={() => navigation.navigate('Settings')} />
    </View>
  );
};

export default HomeScreen;
