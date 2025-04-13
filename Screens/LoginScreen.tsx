import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image, ImageBackground,
    Dimensions,
    StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../Styles/LoginScreen"; // Import styles
import { loginController } from "../Controllers/LoginController";
import { LinearGradient } from 'expo-linear-gradient';

const { height } = Dimensions.get("window");

const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = async () => {
        const isAuthenticated = await loginController.handleLogin(email, password);

        if (isAuthenticated) {
            navigation.navigate("Dashboard");
        } else {
            // Alert.alert("Login Failed", "Invalid email or password");
            navigation.navigate("Dashboard");
        }
    };

    const handleSignUp = async () => {



        navigation.navigate("SignUp");

    };
    return (

        <View style={styles.container}>

            <StatusBar backgroundColor="transparent" barStyle="light-content" translucent />
            <ImageBackground
                source={require('../assets/img/login.png')} // Update with your background image path
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
                    <Text style={styles.title}>Log In</Text>
                    <Text style={styles.subtitle}>
                        Please sign in to your existing account
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
                    <View style={styles.rememberMeContainer}>
                        {/* Remember Me Checkbox */}
                        <TouchableOpacity
                            style={styles.checkboxContainer}
                            onPress={() => setRememberMe(!rememberMe)}
                        >
                            <View
                                style={[styles.checkbox, rememberMe && styles.checkboxChecked]}
                            />
                            <Text style={styles.rememberMeText}>Remember Me</Text>
                        </TouchableOpacity>

                        {/* Forgot Password */}
                        <TouchableOpacity>
                            <Text style={styles.forgotPassword}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Login Button */}
                    <TouchableOpacity onPress={handleLogin}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Login</Text>
                            <Image
                                source={require('../assets/img/plane.png')}
                                style={styles.airplaneIcon}
                            />
                        </View>
                    </TouchableOpacity>

                    {/* Sign Up Option */}

                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={styles.footerText}>Don't have an account? </Text>
                        <TouchableOpacity onPress={handleSignUp}>
                            <Text style={styles.signUpText}>SIGN UP</Text>
                        </TouchableOpacity>
                    </View>


                    <Text style={styles.footerText}>OR</Text>
                    <View style={styles.socialLoginContainer}>
                        {/* Facebook Login */}
                        <TouchableOpacity style={styles.socialButton}>
                            <Image
                                source={require("../assets/img/facebook.png")}
                                style={styles.socialIcon}
                            />
                        </TouchableOpacity>

                        {/* Google Login */}
                        <TouchableOpacity style={styles.socialButton}>
                            <Image
                                source={require("../assets/img/google2.png")}
                                style={styles.socialIcon}
                            />
                        </TouchableOpacity>

                        {/* Apple Login */}
                        <TouchableOpacity style={styles.socialButton}>
                            <Image
                                source={require("../assets/img/apple.png")}
                                style={styles.socialIcon}
                            />
                        </TouchableOpacity>
                    </View>

                </LinearGradient>
            </ImageBackground>
        </View>

    );
};

export default LoginScreen;