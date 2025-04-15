import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './Screens/SplashScreen';
import SplashScreen2 from './Screens/SplashScreen2';
import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/LoginScreen';
import ForgotPasswordScreen from './Screens/ForgotPasswordScreen';
import AuthCodeScreen from './Screens/AuthCodeScreen';
import CreateNewPasswordScreen from './Screens/CreateNewPasswordScreen';
import SignUpScreen from './Screens/SignUpScreen';
import CreateProfileScreen from './Screens/CreateProfileScreen';
import PersonalizeInterestsScreen from './Screens/PersonalizeInterestsScreen';
import SettingsScreen from './Screens/SettingsScreen';
import OnboardingScreen1 from './Screens/onboarding/OnboardingScreen1';
import OnboardingScreen2 from './Screens/onboarding/OnboardingScreen2';
import OnboardingScreen3 from './Screens/onboarding/OnboardingScreen3';
import { RootStackParamList } from './types/navigation'; // Import the type

const Stack = createStackNavigator<RootStackParamList>(); // Define the stack type

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Forgot_password" component={ForgotPasswordScreen} />
        <Stack.Screen name="CreateProfile" component={CreateProfileScreen} />
        <Stack.Screen name="AuthCode" component={AuthCodeScreen} />
        <Stack.Screen name="CreateNewPassword" component={CreateNewPasswordScreen} />
        <Stack.Screen name="PersonalizeInterests" component={PersonalizeInterestsScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Splash2" component={SplashScreen2}  options={{ headerShown: false }}/>
        <Stack.Screen name="Onboarding1" component={OnboardingScreen1} />
        <Stack.Screen name="Onboarding2" component={OnboardingScreen2} />
        <Stack.Screen name="Onboarding3" component={OnboardingScreen3} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
