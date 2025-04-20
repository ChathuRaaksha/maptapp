import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  Platform,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation"; // Make sure this path is correct
import styles, { TEAL, WHITE, LIGHT_GRAY } from "../Styles/ReviewScreenStyles";

type EmojiOption = {
  emoji: string;
  label: string;
  selected?: boolean;
};

const emojiOptions: EmojiOption[] = [
  { emoji: '🤩', label: 'Excellent' },
  { emoji: '😍', label: 'Good' },
  { emoji: '😐', label: 'Average' },
  { emoji: '🙁', label: 'Poor' },
  { emoji: '😡', label: 'Terrible' },
];

// Properly typed navigation props
type ReviewScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Review'>;
type ReviewScreenRouteProp = RouteProp<RootStackParamList, 'Review'>;

interface ReviewScreenProps {
  navigation: ReviewScreenNavigationProp;
  route: ReviewScreenRouteProp;
}

const { height } = Dimensions.get("window");

const ReviewScreen: React.FC<ReviewScreenProps> = ({ route, navigation }) => {
  const { restaurantId } = route.params;
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [reviewText, setReviewText] = useState<string>("");
  
  const handleSubmit = () => {
    // Here you would typically send the review data to your backend
    console.log("Submitting review for restaurant:", restaurantId);
    console.log("Selected emoji:", selectedEmoji);
    console.log("Review text:", reviewText);
    
    // Navigate back to the restaurant detail screen
    navigation.navigate("ThankYou");
  };
  
  const handleEmojiSelect = (emoji: string) => {
    setSelectedEmoji(emoji);
  };
  
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="light-content" translucent />
      <Image
        source={require('../assets/img/top.png')}
        style={styles.curvedBackground}
      />
      
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Icon name="times" size={22} color="#000" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Leave a Review</Text>
        
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Emoji Selection Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>How did this place make you feel?</Text>
          
          <View style={styles.emojiContainer}>
            {emojiOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.emojiButton,
                  selectedEmoji === option.emoji && styles.selectedEmojiButton
                ]}
                onPress={() => handleEmojiSelect(option.emoji)}
              >
                <Text style={styles.emojiText}>{option.emoji}</Text>
                <Text style={styles.emojiLabel}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Review Text Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>How was your experience there?</Text>
          
          <TextInput
            style={styles.reviewInput}
            placeholder="Write your review here..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            value={reviewText}
            onChangeText={setReviewText}
          />
        </View>
        
        {/* Submit Button */}
        <TouchableOpacity 
          style={[
            styles.submitButton,
            (!selectedEmoji || !reviewText) && styles.disabledButton
          ]}
          onPress={handleSubmit}
          disabled={!selectedEmoji || !reviewText}
        >
          <Text style={styles.submitButtonText}>Submit Review</Text>
          <Icon name="long-arrow-right" size={20} color={WHITE} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ReviewScreen;