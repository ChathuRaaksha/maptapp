import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StatusBar
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Slider from "@react-native-community/slider";
import { LinearGradient } from 'expo-linear-gradient';
import styles from "../Styles/PersonalizeInterestsStyles";
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';

// Interest categories with emojis
const INTEREST_CATEGORIES = [
    { id: 1, name: "Eating Out?", emoji: "😎", icon: "cutlery" },
    { id: 2, name: "Nightlife", emoji: "🎉", icon: "glass" },
    { id: 3, name: "Museums", emoji: "🏛️", icon: "university" },
    { id: 4, name: "Shopping", emoji: "🛍️", icon: "shopping-bag" },
    { id: 5, name: "Sports", emoji: "⚽", icon: "futbol-o" },
    { id: 6, name: "Nature", emoji: "🌳", icon: "tree" },
    { id: 7, name: "Landmarks", emoji: "🗽", icon: "map-marker" },
    { id: 8, name: "Local Foods", emoji: "🍲", icon: "spoon" },
];

// Emoji scale from 1-10
const EMOJI_SCALE = [
    { value: 1, emoji: "😵", label: "Strongly Dislike" },
    { value: 2, emoji: "😣", label: "Dislike" },
    { value: 3, emoji: "😞", label: "Somewhat Dislike" },
    { value: 4, emoji: "🙁", label: "Slightly Dislike" },
    { value: 5, emoji: "😐", label: "Neutral" },
    { value: 6, emoji: "😐", label: "Neutral" },
    { value: 7, emoji: "🙂", label: "Slightly Like" },
    { value: 8, emoji: "😄", label: "Like" },
    { value: 9, emoji: "😁", label: "Really Like" },
    { value: 10, emoji: "🤩", label: "Love It!" },
];

// Define properly typed props using React Navigation types
type PersonalizeInterestsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PersonalizeInterests'
>;

type PersonalizeInterestsScreenRouteProp = RouteProp<
  RootStackParamList,
  'PersonalizeInterests'
>;

type Props = {
  navigation: PersonalizeInterestsScreenNavigationProp;
  route: PersonalizeInterestsScreenRouteProp;
};

const PersonalizeInterestsScreen: React.FC<Props> = ({ navigation, route }) => {
    // Get profile image from previous screen if available
    const { profileImage, username } = route.params || { profileImage: null, username: "Worldtraveler123" };
    
    // State to track current interest and ratings
    const [currentInterestIndex, setCurrentInterestIndex] = useState(0);
    const [interestRatings, setInterestRatings] = useState<{ [key: number]: number }>(
        Object.fromEntries(INTEREST_CATEGORIES.map(cat => [cat.id, 5])) // Default rating 5 (middle)
    );

    // Handle rating change
    const handleRatingChange = (value: number) => {
        setInterestRatings(prev => ({
            ...prev,
            [INTEREST_CATEGORIES[currentInterestIndex].id]: Math.round(value)
        }));
    };

    // Move to next interest
    const handleNext = () => {
        if (currentInterestIndex < INTEREST_CATEGORIES.length - 1) {
            setCurrentInterestIndex(prev => prev + 1);
        } else {
            // Save interests and navigate to next screen
            handleSaveInterests();
        }
    };

    // Save interests and navigate
    const handleSaveInterests = () => {
        // Here you would typically send the interest data to your backend
        // For demo purposes, just navigate to the next screen
     //   navigation.navigate("Dashboard", { interestRatings });
    };

    // Current interest being displayed
    const currentInterest = INTEREST_CATEGORIES[currentInterestIndex];
    
    // Get current emoji and label based on rating
    const currentRating = interestRatings[currentInterest.id];
    const currentEmojiData = EMOJI_SCALE[currentRating - 1]; // Adjust for 0-based index

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent />
            
            {/* Top Image */}
            <View style={styles.topImageContainer}>
                <Image 
                    source={require('../assets/img/topimg.png')} 
                    style={styles.topImage} 
                    resizeMode="cover"
                />
            </View>
            
            <LinearGradient
              colors={[
                'rgba(255, 255, 255, 0)',    // fully transparent white
                'rgba(255, 255, 255, 0.5)',  // semi-transparent
                'rgba(255, 255, 255, 0.8)',  // your original
                'rgba(255, 255, 255, 1)'     // solid white
              ]}
                style={styles.background}
            >
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Personalize Interests</Text>
                    <View style={styles.progressContainer}>
                        <View style={styles.progressDot} />
                        <View style={styles.progressDot} />
                        <View style={styles.progressBar} />
                    </View>
                </View>

                <Text style={styles.subtitle}>
                    Based on your interests, Iter will recommend you relevant places and activites in your area.
                </Text>

                {/* Profile section */}
                <View style={styles.profileCard}>
                    <View style={styles.profileImageContainer}>
                        {profileImage ? (
                            <Image source={{ uri: profileImage }} style={styles.profileImage} />
                        ) : (
                            <View style={styles.profileImagePlaceholder}>
                                <Icon name="user" size={40} color="#AAAAAA" />
                            </View>
                        )}
                    </View>
                    <Text style={styles.username}>{username}</Text>
                </View>

                {/* Interest Rating Card */}
                <View style={styles.interestCard}>
                    <Text style={styles.questionText}>
                        How much do you like...
                    </Text>
                    <Text style={styles.progressCounter}>
                        {currentInterestIndex + 1}/{INTEREST_CATEGORIES.length}
                    </Text>

                    <View style={styles.interestRow}>
                        <Icon name={currentInterest.icon} size={24} color="#00798C" style={styles.interestIcon} />
                        <Text style={styles.interestName}>{currentInterest.name}</Text>
                    </View>

                    {/* Emoji Response Indicator */}
                    <View style={styles.emojiScaleContainer}>
                        <Text style={styles.currentEmoji}>{currentEmojiData.emoji}</Text>
                        <Text style={styles.emojiLabel}>{currentEmojiData.label}</Text>
                    </View>

                    {/* Slider for rating */}
                    <Slider
                        style={styles.slider}
                        minimumValue={1}
                        maximumValue={10}
                        step={1}
                        value={interestRatings[currentInterest.id]}
                        onValueChange={handleRatingChange}
                        minimumTrackTintColor="#00798C"
                        maximumTrackTintColor="#D3D3D3"
                        thumbTintColor="#00798C"
                    />
                    
                    {/* Emoji scale indicators */}
                    <View style={styles.emojiRangeContainer}>
                        <Text style={styles.emojiRangeText}>Dislike</Text>
                        <Text style={styles.emojiRangeText}>Like</Text>
                    </View>

                    {/* Next button */}
                    <TouchableOpacity style={styles.button} onPress={handleNext}>
                        <Text style={styles.buttonText}>
                            {currentInterestIndex === INTEREST_CATEGORIES.length - 1 ? "Finish" : "Next"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </View>
    );
};

export default PersonalizeInterestsScreen;