import React, { useEffect } from 'react';
import { View, Text, Image, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; // Import NativeStackNavigationProp
import splashScreenStyles from '../Styles/splashScreen';
import { RootStackParamList } from '../types/navigation'; // Import RootStackParamList

const SplashScreen: React.FC = () => {
  // Use the proper navigation type
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const checkFirstTimeUser = async () => {
      const isFirstTime = await AsyncStorage.getItem('isFirstTime');

      if (isFirstTime === null) {
        navigation.navigate('Onboarding1');
        await AsyncStorage.setItem('isFirstTime', 'false');
      } else {
        navigation.navigate('Splash2');
      }
    };

    const timer = setTimeout(() => {
      checkFirstTimeUser();
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={splashScreenStyles.container}>
      <StatusBar backgroundColor="#00798C" barStyle="light-content" />
      <View style={splashScreenStyles.logoContainer}>
        <Text style={splashScreenStyles.logoText}>MAPT</Text>
        <Image 
          source={require('../assets/img/luggage.png')} 
          style={splashScreenStyles.luggageIcon} 
        />
        <Text style={splashScreenStyles.logoText2}>in</Text>
      </View>
      <Text style={splashScreenStyles.tagline}>Go with Your Flow..</Text>
    </View>
  );
};

export default SplashScreen;
