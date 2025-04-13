import React from 'react';
import { View, Text, Button } from 'react-native';

const OnboardingScreen1: React.FC = ({ navigation }: any) => {
  return (
    <View>
      <Text>Question 1: What is your name?</Text>
      <Button title="Next" onPress={() => navigation.navigate('Onboarding2')} />
    </View>
  );
};

export default OnboardingScreen1;
