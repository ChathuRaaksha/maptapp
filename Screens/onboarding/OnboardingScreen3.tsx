import React from 'react';
import { View, Text, Button } from 'react-native';

const OnboardingScreen3: React.FC = ({ navigation }: any) => {
  return (
    <View>
      <Text>Question 3: What is your hobby?</Text>
      <Button title="Finish" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

export default OnboardingScreen3;
