import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ImageBackground,
    StatusBar,
    Alert
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../Styles/ForgotPasswordStyles"; // Import forgot password styles
import { LinearGradient } from 'expo-linear-gradient';

const ForgotPasswordScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [email, setEmail] = useState("");

    const handleSendResetLink = () => {
        // Validate email
        if (!email || !email.includes('@')) {
            Alert.alert("Invalid Email", "Please enter a valid email address");
            return;
        }

        // Here you would call your API to send a reset link
        // For now, just show a success message
        Alert.alert(
            "Reset Link Sent",
            "A password reset link has been sent to your email address.",
            [
                { 
                    text: "OK", 
                    onPress: () => navigation.navigate("AuthCode") 
                }
            ]
        );
    };

    const handleBackToLogin = () => {
        navigation.navigate("Login");
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="transparent" barStyle="light-content" translucent />
            <ImageBackground
                source={require('../assets/img/start2.png')} // Using the same background as login
                style={styles.background}
                resizeMode="cover"
            >
                {/* Language Indicator (top-right) */}
                <View style={styles.languageContainer}>
                    <Text style={styles.languageText}>English</Text>
                </View>

                {/* Logo (centered) */}
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>MAPT</Text>
                    <Image
                        source={require('../assets/img/luggage.png')}
                        style={styles.luggageIcon}
                    />
                    <Text style={styles.logoText2}>in</Text>
                </View>

                {/* Bottom Card */}
                <LinearGradient
                    colors={['rgba(166, 22, 22, 0)', 'rgba(219, 233, 235, 0.95)', 'rgb(215, 160, 160)']}
                    style={styles.bottomCard}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                >
                    <Text style={styles.title}>Forgot Password</Text>
                    <Text style={styles.subtitle}>
                        Enter your email address to receive a password reset link
                    </Text>

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

                    {/* Send Reset Link Button */}
                    <TouchableOpacity onPress={handleSendResetLink}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Send Reset Link</Text>
                            <Icon
                                name="paper-plane"
                                size={20}
                                color="#FFFFFF"
                                style={styles.sendIcon}
                            />
                        </View>
                    </TouchableOpacity>

                    {/* Back to Login */}
                    <TouchableOpacity onPress={handleBackToLogin}>
                        <Text style={styles.backToLoginText}>Back to Login</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </ImageBackground>
        </View>
    );
};

export default ForgotPasswordScreen;