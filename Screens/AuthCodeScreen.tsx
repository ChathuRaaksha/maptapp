import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ImageBackground,
    StatusBar,
    Keyboard,
    Alert
} from "react-native";
import styles from "../Styles/AuthCodeStyles"; // Import auth code styles
import { LinearGradient } from 'expo-linear-gradient';

const AuthCodeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    // Create refs for each digit input to focus on them sequentially
    const inputRefs = [
        useRef<TextInput>(null),
        useRef<TextInput>(null),
        useRef<TextInput>(null),
        useRef<TextInput>(null),
        useRef<TextInput>(null),
    ];

    // State for each digit
    const [digits, setDigits] = useState(['', '', '', '', '']);
    const [isTimerActive, setIsTimerActive] = useState(true);
    const [timeLeft, setTimeLeft] = useState(60); // 60 seconds timer

    // Timer countdown effect
    useEffect(() => {
        if (!isTimerActive) return;

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    setIsTimerActive(false);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isTimerActive]);

    // Format time as MM:SS
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    // Handle resend code
    const handleResendCode = () => {
        if (!isTimerActive) {
            // Reset timer
            setTimeLeft(60);
            setIsTimerActive(true);
            
            // Reset input fields
            setDigits(['', '', '', '', '']);
            inputRefs[0].current?.focus();
            
            // Show confirmation to user
            Alert.alert("Code Sent", "A new verification code has been sent to your email.");
        }
    };

    // Handle input changes
    const handleInputChange = (index: number, value: string) => {
        // Only allow numerical digits
        if (value && !/^\d+$/.test(value)) {
            return;
        }

        // Update the digits state
        const newDigits = [...digits];
        
        // Handle paste of multiple digits
        if (value.length > 1) {
            // If user pastes a multi-digit number, distribute across fields
            const pastedDigits = value.split('').slice(0, 5);
            
            for (let i = 0; i < pastedDigits.length; i++) {
                if (index + i < 5) {
                    newDigits[index + i] = pastedDigits[i];
                }
            }
            
            setDigits(newDigits);
            
            // Focus the next empty input or the last one
            const nextEmptyIndex = newDigits.findIndex(digit => digit === '');
            if (nextEmptyIndex !== -1 && nextEmptyIndex < 5) {
                inputRefs[nextEmptyIndex].current?.focus();
            } else {
                inputRefs[4].current?.focus();
                Keyboard.dismiss();
            }
            
            return;
        }
        
        // Handle single digit input
        newDigits[index] = value;
        setDigits(newDigits);
        
        // If a digit is entered, focus on the next input field
        if (value && index < 4) {
            inputRefs[index + 1].current?.focus();
        }
        
        // If the last digit is entered, dismiss keyboard
        if (value && index === 4) {
            Keyboard.dismiss();
        }
    };

    // Handle backspace key
    const handleKeyPress = (index: number, key: string) => {
        if (key === 'Backspace' && index > 0 && digits[index] === '') {
            // If backspace is pressed on an empty input, focus on the previous input
            inputRefs[index - 1].current?.focus();
        }
    };

    // Verify the code and navigate to create new password screen
    const handleVerifyCode = () => {
        const code = digits.join('');
        
        // Check if all digits are filled
        if (code.length !== 5) {
            Alert.alert("Invalid Code", "Please enter all 5 digits of your verification code.");
            return;
        }
        
        // Here you would verify the code with your backend
        // For demo purposes, navigate to create new password screen
        navigation.navigate("CreateNewPassword");
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="transparent" barStyle="light-content" translucent />
            <ImageBackground
                source={require('../assets/img/start4.png')} // Using the same background as login
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
                    <Text style={styles.title}>Verification Code</Text>
                    <Text style={styles.subtitle}>
                        Enter the 5-digit code sent to your email
                    </Text>

                    {/* Code Input Section */}
                    <View style={styles.codeInputContainer}>
                        {digits.map((digit, index) => (
                            <TextInput
                                key={index}
                                ref={inputRefs[index]}
                                style={styles.digitInput}
                                value={digit}
                                onChangeText={(value) => handleInputChange(index, value)}
                                onKeyPress={({ nativeEvent: { key } }) => handleKeyPress(index, key)}
                                keyboardType="numeric"
                                maxLength={1}
                                selectTextOnFocus
                                selectionColor="#00798C"
                            />
                        ))}
                    </View>
                    
                    {/* Timer and Resend */}
                    <View style={styles.timerContainer}>
                        <Text style={styles.timerText}>
                            {isTimerActive 
                                ? `Code expires in ${formatTime(timeLeft)}` 
                                : "Code expired"}
                        </Text>
                        <TouchableOpacity 
                            onPress={handleResendCode}
                            disabled={isTimerActive}
                            style={[
                                styles.resendButton,
                                isTimerActive && styles.disabledResendButton
                            ]}
                        >
                            <Text style={[
                                styles.resendText, 
                                isTimerActive && styles.disabledResendText
                            ]}>
                                Resend Code
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Verify Button */}
                    <TouchableOpacity onPress={handleVerifyCode}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Verify & Continue</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Back Button */}
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.backText}>Back</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </ImageBackground>
        </View>
    );
};

export default AuthCodeScreen;