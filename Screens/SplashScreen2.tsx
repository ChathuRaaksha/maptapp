import React, { useEffect } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import splashScreenStyles from '../Styles/splashScreen2';


const SplashScreen: React.FC<{ navigation: any }> = ({ navigation }) => {

  const handleLogin = async () => {
   
      navigation.navigate("Login");
    
  };
  return (
    <View style={splashScreenStyles.container}>

      <StatusBar backgroundColor="transparent" barStyle="light-content" translucent />
      <ImageBackground
        source={require('../assets/img/start.png')} // Update with your background image path
        style={splashScreenStyles.background}
        resizeMode="cover"
      >
        {/* Language Indicator (top-right) */}
        <View style={splashScreenStyles.languageContainer}>
          <Text style={splashScreenStyles.languageText}>English</Text>
        </View>

        {/* Logo (centered) */}
        <View style={splashScreenStyles.logoContainer}>
          <Text style={splashScreenStyles.logoText}>MAPT</Text>
          <Image 
            source={require('../assets/img/luggage.png')} 
            style={splashScreenStyles.luggageIcon} 
          />
          <Text style={splashScreenStyles.logoText2}>in</Text>
        </View>

        {/* Bottom Card */}
        <View style={splashScreenStyles.bottomCard}>
          <Text style={splashScreenStyles.questionText}>Ready to explore beyond boundaries?</Text>
          <TouchableOpacity onPress={handleLogin}>
            <View style={splashScreenStyles.button}>
              <Text style={splashScreenStyles.buttonText}>Your Journey Starts Here</Text>
              <Image
                source={require('../assets/img/plane.png')} // Update with your airplane icon path
                style={splashScreenStyles.airplaneIcon}
              />
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SplashScreen;