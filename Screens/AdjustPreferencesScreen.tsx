import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../Styles/AdjustPreferencesStyles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';

// Interest categories with emojis (same as PersonalizeInterests)
const INTEREST_CATEGORIES = [
  { id: 1, name: "Eating Out", emoji: "😎", icon: "cutlery" },
  { id: 2, name: "Nightlife", emoji: "🎉", icon: "glass" },
  { id: 3, name: "Museums", emoji: "🏛️", icon: "university" },
  { id: 4, name: "Shopping", emoji: "🛍️", icon: "shopping-bag" },
  { id: 5, name: "Sports", emoji: "⚽", icon: "futbol-o" },
  { id: 6, name: "Nature", emoji: "🌳", icon: "tree" },
  { id: 7, name: "Landmarks", emoji: "🗽", icon: "map-marker" },
  { id: 8, name: "Local Foods", emoji: "🍲", icon: "spoon" },
];

// Emoji scale from 1-10 (same as PersonalizeInterests)
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
type AdjustPreferencesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AdjustPreferences'
>;

type AdjustPreferencesScreenRouteProp = RouteProp<
  RootStackParamList,
  'AdjustPreferences'
>;

type Props = {
  navigation: AdjustPreferencesScreenNavigationProp;
  route: AdjustPreferencesScreenRouteProp;
};

const AdjustPreferencesScreen: React.FC<Props> = ({ navigation, route }) => {
  // State to track interest ratings
  const [interestRatings, setInterestRatings] = useState<{ [key: number]: number }>(
    Object.fromEntries(INTEREST_CATEGORIES.map(cat => [cat.id, 5])) // Default rating 5 (middle)
  );
  
  // State to track if ratings have changed
  const [hasChanges, setHasChanges] = useState(false);

  // In a real app, you would fetch the user's existing preferences
  useEffect(() => {
    // Mock fetching user preferences
    // In a real app, this would be an API call
    const fetchUserPreferences = async () => {
      // Simulating API call delay
      setTimeout(() => {
        // Mock data - in a real app this would come from your backend
        const mockUserPreferences = {
          1: 8, // Eating Out - Like
          2: 9, // Nightlife - Really Like
          3: 6, // Museums - Neutral
          4: 7, // Shopping - Slightly Like
          5: 10, // Sports - Love It
          6: 8, // Nature - Like
          7: 5, // Landmarks - Neutral
          8: 9, // Local Foods - Really Like
        };
        
        setInterestRatings(mockUserPreferences);
      }, 500);
    };
    
    fetchUserPreferences();
  }, []);

  // Handle rating change for a specific interest
  const handleRatingChange = (interestId: number, value: number) => {
    setInterestRatings(prev => {
      const newRatings = {
        ...prev,
        [interestId]: Math.round(value)
      };
      
      // Check if any rating has changed from the initial state
      setHasChanges(true);
      
      return newRatings;
    });
  };

  // Handle save preferences
  const handleSavePreferences = () => {
    // Here you would typically send the updated preferences to your backend
    console.log("Saving updated preferences:", interestRatings);
    
    // Show success message and go back
    // In a real app, you might want to show a success toast/modal
    navigation.goBack();
  };

  // Handle go back
  const handleGoBack = () => {
    // If there are changes, you might want to show a confirmation dialog
    if (hasChanges) {
      // For simplicity, just showing a console log here
      console.log("Warning: You have unsaved changes");
      // In a real app, you would show a confirmation dialog
    }
    navigation.goBack();
  };

  // Render each interest item
  const renderInterestItem = ({ item }: { item: typeof INTEREST_CATEGORIES[0] }) => {
    const currentRating = interestRatings[item.id];
    const currentEmojiData = currentRating ? EMOJI_SCALE[currentRating - 1] : EMOJI_SCALE[4]; // Default to neutral if not set
    
    return (
      <View style={styles.interestCard}>
        <View style={styles.interestHeader}>
          <View style={styles.interestTitleRow}>
            <Icon name={item.icon} size={22} color="#00798C" style={styles.interestIcon} />
            <Text style={styles.interestName}>{item.name}</Text>
          </View>
          <Text style={styles.emojiIndicator}>{currentEmojiData.emoji}</Text>
        </View>
        
        <Text style={styles.ratingLabel}>{currentEmojiData.label}</Text>
        
        {/* Slider for rating */}
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={10}
          step={1}
          value={currentRating || 5}
          onValueChange={(value) => handleRatingChange(item.id, value)}
          minimumTrackTintColor="#00798C"
          maximumTrackTintColor="#D3D3D3"
          thumbTintColor="#00798C"
        />
        
        {/* Emoji scale indicators */}
        <View style={styles.emojiRangeContainer}>
          <Text style={styles.emojiRangeText}>Dislike</Text>
          <Text style={styles.emojiRangeText}>Like</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent />
      
      {/* Top Image */}
    
      
      <LinearGradient
        colors={[
          'rgba(255, 255, 255, 0)',    // fully transparent white
          'rgba(255, 255, 255, 0.5)',  // semi-transparent
          'rgba(255, 255, 255, 0.8)',  // semi-transparent
          'rgba(255, 255, 255, 1)'     // solid white
        ]}
        style={styles.background}
      >
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <Icon name="chevron-left" size={22} color="#00798C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Adjust Preferences</Text>
          <View style={styles.placeholder} />
        </View>
        
        <Text style={styles.subtitle}>
          Update your interests to get more relevant recommendations based on what you enjoy.
        </Text>
        
        <FlatList
          data={INTEREST_CATEGORIES}
          renderItem={renderInterestItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
        
        {/* Save button */}
        <TouchableOpacity 
          style={[styles.saveButton, !hasChanges && styles.saveButtonDisabled]} 
          onPress={handleSavePreferences}
          disabled={!hasChanges}
        >
          <Text style={styles.saveButtonText}>Save Preferences</Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default AdjustPreferencesScreen;