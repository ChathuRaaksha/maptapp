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
import styles from "../Styles//CreateNewPasswordStyles"; // Import styles
import { LinearGradient } from 'expo-linear-gradient';

const CreateNewPasswordScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    // Password strength indicators
    const [hasMinLength, setHasMinLength] = useState(false);
    const [hasUpperCase, setHasUpperCase] = useState(false);
    const [hasLowerCase, setHasLowerCase] = useState(false);
    const [hasNumber, setHasNumber] = useState(false);
    const [hasSpecialChar, setHasSpecialChar] = useState(false);

    // Check password strength
    const checkPasswordStrength = (text: string) => {
        setHasMinLength(text.length >= 8);
        setHasUpperCase(/[A-Z]/.test(text));
        setHasLowerCase(/[a-z]/.test(text));
        setHasNumber(/[0-9]/.test(text));
        setHasSpecialChar(/[!@#$%^&*(),.?":{}|<>]/.test(text));
    };

    // Handle password change
    const handlePasswordChange = (text: string) => {
        setPassword(text);
        checkPasswordStrength(text);
    };

    // Create new password
    const handleCreatePassword = () => {
        // Validate that all requirements are met
        if (!hasMinLength || !hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
            Alert.alert("Password Requirements", "Please meet all password requirements.");
            return;
        }

        // Validate that passwords match
        if (password !== confirmPassword) {
            Alert.alert("Passwords Don't Match", "Please ensure both passwords match.");
            return;
        }

        // Here you would update the password with your backend
        // For demo purposes, show success and navigate to login
        Alert.alert(
            "Password Updated",
            "Your password has been successfully updated. Please log in with your new password.",
            [
                { 
                    text: "OK", 
                    onPress: () => navigation.navigate("Login") 
                }
            ]
        );
    };

    // Calculate password strength percentage
    const calculateStrengthPercentage = () => {
        const criteria = [hasMinLength, hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar];
        const metCriteria = criteria.filter(Boolean).length;
        return (metCriteria / criteria.length) * 100;
    };

    const strengthPercentage = calculateStrengthPercentage();
    
    // Determine strength color
    const getStrengthColor = () => {
        if (strengthPercentage <= 20) return '#FF3B30'; // Red
        if (strengthPercentage <= 60) return '#FF9500'; // Orange
        if (strengthPercentage <= 80) return '#FFCC00'; // Yellow
        return '#34C759'; // Green
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="transparent" barStyle="light-content" translucent />
            <ImageBackground
                source={require('../assets/img/beach2.png')} // Using the same background
                style={styles.background}
                resizeMode="cover"
            >
                {/* Language Indicator */}
                <View style={styles.languageContainer}>
                    <Text style={styles.languageText}>English</Text>
                </View>

                {/* Logo */}
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
                    <Text style={styles.title}>Create New Password</Text>
                    <Text style={styles.subtitle}>
                        Your new password must be different from previously used passwords
                    </Text>

                    {/* Password Input */}
                    <Text style={styles.label}>NEW PASSWORD</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Enter new password"
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={handlePasswordChange}
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

                    {/* Password Strength Indicator */}
                    <View style={styles.strengthContainer}>
                        <View style={styles.strengthBarBackground}>
                            <View 
                                style={[
                                    styles.strengthBar, 
                                    { 
                                        width: `${strengthPercentage}%`,
                                        backgroundColor: getStrengthColor()
                                    }
                                ]} 
                            />
                        </View>
                        <Text style={styles.strengthText}>
                            {strengthPercentage === 0 ? "" :
                             strengthPercentage <= 20 ? "Very Weak" :
                             strengthPercentage <= 60 ? "Weak" :
                             strengthPercentage <= 80 ? "Medium" :
                             "Strong"}
                        </Text>
                    </View>

                    {/* Password Requirements */}
                    <View style={styles.requirementsContainer}>
                        <Text style={styles.requirementsTitle}>Password must contain:</Text>
                        <View style={styles.requirementRow}>
                            <Icon 
                                name={hasMinLength ? "check-circle" : "circle-o"} 
                                size={16} 
                                color={hasMinLength ? "#34C759" : "gray"} 
                            />
                            <Text style={styles.requirementText}>At least 8 characters</Text>
                        </View>
                        <View style={styles.requirementRow}>
                            <Icon 
                                name={hasUpperCase ? "check-circle" : "circle-o"} 
                                size={16} 
                                color={hasUpperCase ? "#34C759" : "gray"} 
                            />
                            <Text style={styles.requirementText}>At least one uppercase letter</Text>
                        </View>
                        <View style={styles.requirementRow}>
                            <Icon 
                                name={hasLowerCase ? "check-circle" : "circle-o"} 
                                size={16} 
                                color={hasLowerCase ? "#34C759" : "gray"} 
                            />
                            <Text style={styles.requirementText}>At least one lowercase letter</Text>
                        </View>
                        <View style={styles.requirementRow}>
                            <Icon 
                                name={hasNumber ? "check-circle" : "circle-o"} 
                                size={16} 
                                color={hasNumber ? "#34C759" : "gray"} 
                            />
                            <Text style={styles.requirementText}>At least one number</Text>
                        </View>
                        <View style={styles.requirementRow}>
                            <Icon 
                                name={hasSpecialChar ? "check-circle" : "circle-o"} 
                                size={16} 
                                color={hasSpecialChar ? "#34C759" : "gray"} 
                            />
                            <Text style={styles.requirementText}>At least one special character</Text>
                        </View>
                    </View>

                    {/* Confirm Password Input */}
                    <Text style={styles.label}>CONFIRM PASSWORD</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Confirm new password"
                            secureTextEntry={!showConfirmPassword}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                        <TouchableOpacity
                            style={styles.eyeIcon}
                            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            <Icon
                                name={showConfirmPassword ? "eye" : "eye-slash"}
                                size={20}
                                color="gray"
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Password Match Indicator */}
                    {confirmPassword !== '' && (
                        <View style={styles.matchContainer}>
                            <Icon 
                                name={password === confirmPassword ? "check-circle" : "times-circle"} 
                                size={16} 
                                color={password === confirmPassword ? "#34C759" : "#FF3B30"} 
                            />
                            <Text 
                                style={[
                                    styles.matchText, 
                                    { color: password === confirmPassword ? "#34C759" : "#FF3B30" }
                                ]}
                            >
                                {password === confirmPassword ? "Passwords match" : "Passwords don't match"}
                            </Text>
                        </View>
                    )}

                    {/* Create Password Button */}
                    <TouchableOpacity onPress={handleCreatePassword}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Create Password</Text>
                            <Icon 
                                name="check"
                                size={20}
                                color="#FFFFFF"
                                style={styles.buttonIcon}
                            />
                        </View>
                    </TouchableOpacity>
                </LinearGradient>
            </ImageBackground>
        </View>
    );
};

export default CreateNewPasswordScreen;