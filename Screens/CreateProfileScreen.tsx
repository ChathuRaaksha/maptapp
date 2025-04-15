import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ImageBackground,
    StatusBar,
    Alert,
    Platform
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from 'expo-image-picker'; // Ensure you have expo-image-picker installed
import styles from "../Styles/CreateProfileStyles"; // Import profile creation styles
import { LinearGradient } from 'expo-linear-gradient';

const CreateProfileScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [profileImage, setProfileImage] = useState<string | null>(null);

    // Request permissions and pick an image from the device
    const pickImage = async () => {
        // Request permission to access the media library
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Required', 'Sorry, we need camera roll permissions to make this work!');
                return;
            }
        }

        // Launch the image picker
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setProfileImage(result.assets[0].uri);
        }
    };

    // Handle profile creation
    const handleCreateProfile = () => {
        // Validate username
        if (!username.trim()) {
            Alert.alert("Username Required", "Please enter a username to create your profile.");
            return;
        }

        // Here you would typically send the profile data to your backend
        // For demo purposes, just navigate to the next screen
        Alert.alert("Profile Created", "Your profile has been created successfully!", [
            { 
                text: "OK", 
                onPress: () => navigation.navigate("PersonalizeInterests", {
                    profileImage: profileImage,
                    username: username
                }) 
            }
        ]);
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="transparent" barStyle="light-content" translucent />
            <ImageBackground
                source={require('../assets/img/login.png')} // Using the same background image
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
                    <Text style={styles.title}>Create Your Profile</Text>
                    <Text style={styles.subtitle}>
                        Add a photo and username to personalize your profile
                    </Text>

                    {/* Profile Image Picker */}
                    <TouchableOpacity style={styles.imagePickerContainer} onPress={pickImage}>
                        {profileImage ? (
                            <Image source={{ uri: profileImage }} style={styles.profileImage} />
                        ) : (
                            <View style={styles.imagePlaceholder}>
                                <Icon name="camera" size={40} color="#AAAAAA" />
                                <Text style={styles.imagePlaceholderText}>Add Photo</Text>
                            </View>
                        )}
                        <View style={styles.cameraIconContainer}>
                            <Icon name="plus" size={16} color="#FFFFFF" />
                        </View>
                    </TouchableOpacity>

                    {/* Username Input */}
                    <Text style={styles.label}>USERNAME</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your username"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                        maxLength={30}
                    />
                    <Text style={styles.helperText}>
                        This name will be visible to other users
                    </Text>

                    {/* Create Profile Button */}
                    <TouchableOpacity style={styles.button} onPress={handleCreateProfile}>
                        <Text style={styles.buttonText}>Create Profile</Text>
                        <Icon name="check" size={20} color="#FFFFFF" style={styles.buttonIcon} />
                    </TouchableOpacity>

                    {/* Skip for now */}
                    <TouchableOpacity 
                        style={styles.skipContainer}
                        onPress={() => navigation.navigate("Dashboard")}
                    >
                        <Text style={styles.skipText}>Skip for now</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </ImageBackground>
        </View>
    );
};

export default CreateProfileScreen;