import React from 'react';
import { View, Text, Button } from 'react-native';

const SettingsScreen: React.FC = ({ navigation }: any) => {
  return (
    <View>
      <Text>Settings</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default SettingsScreen;
