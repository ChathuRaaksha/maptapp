import React from 'react';
import { View, Text, Button } from 'react-native';

const OnboardingScreen2: React.FC = ({ navigation }: any) => {
  return (
    <View>
      <Text>Question 2: What is your favorite color?</Text>
      <Button title="Next" onPress={() => navigation.navigate('Onboarding3')} />
    </View>
  );
};

export default OnboardingScreen2;
