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
import MapScreen from './Screens/MapScreen';
import ContributeScreen from './Screens/ContributeScreen';
import RestaurantDetailScreen from './Screens/RestaurantDetailScreen';
import ReviewScreen from './Screens/ReviewScreen';
import ThankYouScreen from './Screens/ThankYouScreen';
import ProfileScreen from './Screens/ProfileScreen';
import EditProfileScreen from './Screens/EditProfileScreen';
import ChangePasswordScreen from './Screens/ChangePasswordScreen';
import AdjustPreferencesScreen from './Screens/AdjustPreferencesScreen';
import CommunityScreen from './Screens/CommunityScreen';
//import ARCameraScreen from './Screens/ARCameraScreen';
import { RootStackParamList } from './types/navigation'; // Import the type
//import { CardStyleInterpolators } from '@react-navigation/stack';
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
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="AdjustPreferences" component={AdjustPreferencesScreen} />
        <Stack.Screen name="AuthCode" component={AuthCodeScreen} />
        <Stack.Screen name="CreateNewPassword" component={CreateNewPasswordScreen} />
        <Stack.Screen name="PersonalizeInterests" component={PersonalizeInterestsScreen} />
        <Stack.Screen name="Contributions" component={ContributeScreen} />
        <Stack.Screen name="Community" component={CommunityScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Review" component={ReviewScreen} />
        <Stack.Screen name="ThankYou" component={ThankYouScreen} />
        <Stack.Screen name="RestaurantDetail" component={RestaurantDetailScreen} />
  {/*       <Stack.Screen
  name="ARCamera"
  component={ARCameraScreen}
  options={{
    headerShown: false,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  }}
/> */}
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Splash2" component={SplashScreen2}  options={{ headerShown: false }}/>
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}
