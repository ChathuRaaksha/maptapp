import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image, 
    ImageBackground,
    Dimensions,
    StatusBar,
    ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../Styles/SignUpScreen"; // Import styles
import { LinearGradient } from 'expo-linear-gradient';

const { height } = Dimensions.get("window");

const SignupScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [country, setCountry] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);

    const handleSignup = async () => {
        // Here you would implement your signup logic
        // For now, just navigate to Dashboard
        navigation.navigate("Dashboard");
    };

    const handleLogin = async () => {
        // Here you would implement your signup logic
        // For now, just navigate to Dashboard
        navigation.navigate("Login");
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="transparent" barStyle="light-content" translucent />
            <ImageBackground
                source={require('../assets/img/start5.png')} // Update with your background image path
                style={styles.background}
                resizeMode="cover"
            >
                {/* Language Indicator (top-right) */}
                <View style={styles.languageContainer}>
                    <Text style={styles.languageText}>English</Text>
                </View>

                {/* Logo (centered) */}
                <View style={styles.logoContainer}>
                    
                    <Image
                        source={require('../assets/img/logo3.png')}
                        style={styles.logo}
                    />
                 
                </View>

                {/* Bottom Card */}
                <LinearGradient
                    colors={['rgba(166, 22, 22, 0)', 'rgba(219, 233, 235, 0.95)', 'rgb(215, 160, 160)']}
                    style={styles.bottomCard}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                >
                    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                        <Text style={styles.title}>Create Account</Text>
                        <Text style={styles.subtitle}>
                            Please fill in the details to create your account
                        </Text>

                        {/* Name Input */}
                        <Text style={styles.label}>NAME</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="John Doe"
                            autoCapitalize="words"
                            value={name}
                            onChangeText={setName}
                        />

                        {/* Email Input */}
                        <Text style={styles.label}>EMAIL</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="example@gmail.com"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                        />

                        {/* Phone Number Input */}
                        <Text style={styles.label}>PHONE NUMBER</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="+1 123 456 7890"
                            keyboardType="phone-pad"
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                        />

                        {/* Country Input */}
                        <Text style={styles.label}>COUNTRY</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="United States"
                            value={country}
                            onChangeText={setCountry}
                        />

                        {/* Password Input */}
                        <Text style={styles.label}>PASSWORD</Text>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={styles.passwordInput}
                                placeholder="********"
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={setPassword}
                            />
                            <TouchableOpacity
                                style={styles.eyeIcon}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Icon
                                    name={showPassword ? "eye" : "eye-slash"}
                                    size={20}
                                    color="gray"
                                />
                            </TouchableOpacity>
                        </View>

                       

                        {/* Terms and Conditions */}
                        <View style={styles.termsContainer}>
                            <TouchableOpacity
                                style={styles.checkboxContainer}
                                onPress={() => setAgreeToTerms(!agreeToTerms)}
                            >
                                <View
                                    style={[styles.checkbox, agreeToTerms && styles.checkboxChecked]}
                                />
                                <Text style={styles.termsText}>
                                    I agree to the <Text style={styles.termsHighlight}>Terms & Conditions</Text>
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Signup Button */}
                        <TouchableOpacity onPress={handleSignup}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Sign Up</Text>
                                <Image
                                    source={require('../assets/img/plane.png')}
                                    style={styles.airplaneIcon}
                                />
                            </View>
                        </TouchableOpacity>

                        {/* Already have an account */}
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.footerText}>
                                Already have an account? <Text style={styles.signInText}>SIGN IN</Text>
                            </Text>
                        </TouchableOpacity>

                      
                    </ScrollView>
                </LinearGradient>
            </ImageBackground>
        </View>
    );
};

export default SignupScreen;