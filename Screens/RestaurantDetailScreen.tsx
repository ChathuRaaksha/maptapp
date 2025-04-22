import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  FlatList,
  Linking,
  Alert,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { 
  RestaurantData, 
  ImageSliderItem, 
  ReviewItem, 
  EmojiCount,
  
} from "../types/restaurantTypes";
import styles, { TEAL, WHITE, BLUE, YELLOW } from "../Styles/RestaurantDetailStyles";
import { RootStackParamList } from "../types/navigation";

const { width } = Dimensions.get("window");

// Mock data for the image slider
const imageSliderData: ImageSliderItem[] = [
  { id: '1', image: require('../assets/img/restaurants/restaurant6.png') },
  { id: '2', image: require('../assets/img/restaurants/restaurant7.png') },
  { id: '3', image: require('../assets/img/restaurants/restaurant8.png') },
  { id: '4', image: require('../assets/img/restaurants/restaurant9.png') },
  { id: '5', image: require('../assets/img/restaurants/restaurant2.png') },
  { id: '6', image: require('../assets/img/restaurants/restaurant5.png') },
  { id: '7', image: require('../assets/img/restaurants/restaurant4.png') },
  { id: '8', image: require('../assets/img/restaurants/restaurant3.png') },
  { id: '9', image: require('../assets/img/restaurants/restaurant1.png') },
];

// Mock data for reviews
const reviewsData: ReviewItem[] = [
  {
    id: '1',
    name: 'Nicole the Explorer',
    date: '02.11.2024',
    text: 'Amazing authentic Italian food in a nice ambient. Great service not too fast not too slow, very pleasant waiters. Highly recommended, one of the Italian restaurants in Stockholm.',
    avatar: require('../assets/img/start1.png'),
  },
  {
    id: '2',
    name: 'Sarah432',
    date: '07.08.2022',
    text: 'Cosy little restaurant with great food! The service was excellent and we had a great family dinner! We’ll be back! .',
    avatar: require('../assets/img/start2.png'),
  },
];

// Emoji reaction counts
const emojiCounts: EmojiCount[] = [
    { emoji: '🤩', count: 142 }, // Excellent
    { emoji: '😍', count: 68 },  // Good
    { emoji: '😐', count: 12 },  // Average
    { emoji: '🙁', count: 10 },  // Poor
    { emoji: '😡', count: 2 }  
];

type RestaurantDetailScreenProps = {
  route: RouteProp<RootStackParamList, 'RestaurantDetail'>;
  navigation: StackNavigationProp<RootStackParamList, 'RestaurantDetail'>;
};

const RestaurantDetailScreen: React.FC<RestaurantDetailScreenProps> = ({ route, navigation }) => {
  // You would normally get this data from route.params.itemId
  // For demo purposes, we're using hardcoded data to match the image
  const restaurantData: RestaurantData = {
    id: route.params?.itemId || '1',
    title: 'Il Forno da Pino',
    verified: true,
    address: 'Norr Mälarstrand 30, 112 20, Stockholm',
    openUntil: '20:00',
    weekdayHours: '10:00 - 20:00',
    weekendHours: '10:00 - 23:00',
    matchPercentage: 88,
    description: 'Explore the culinary offerings of this restaurant and let yourself be inspired.',
    phoneNumber: '+46123456789', // Added phone number to the restaurant data
    coordinates: {
      latitude: 59.3293,
      longitude: 18.0686
    }, // Added coordinates for Stockholm
    websiteUrl: 'https://www.maptapp.se', 
  };

  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const flatListRef = useRef<FlatList>(null);
  const handleNavigateToReview = () => {
    navigation.navigate('Review', { 
      restaurantId: restaurantData.id 
    });
  };
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Calculate the next slide index
      const nextSlideIndex = (activeSlideIndex + 1) % imageSliderData.length;
      
      // Scroll to the next slide
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index: nextSlideIndex,
          animated: true,
        });
      }
      
      // Update the active slide index
      setActiveSlideIndex(nextSlideIndex);
    }, 3000); // Change slide every 3 seconds
    
    // Clear the interval when component unmounts
    return () => clearInterval(intervalId);
  }, [activeSlideIndex]);
  
  // Handle errors when scrolling to index
  const handleScrollToIndexFailed = (info: {
    index: number;
    highestMeasuredFrameIndex: number;
    averageItemLength: number;
  }) => {
    // If scrolling fails, try again with a slight delay
    setTimeout(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index: info.index,
          animated: false,
        });
      }
    }, 100);
  };
  
  // Handle manual slide change
  const handleSlideChange = (event: any): void => {
    const slideIndex = Math.floor(
      Math.floor(event.nativeEvent.contentOffset.x) / 
      Math.floor(event.nativeEvent.layoutMeasurement.width)
    );
    
    if (slideIndex >= 0 && slideIndex < imageSliderData.length) {
      setActiveSlideIndex(slideIndex);
    }
  };

  // Function to open Google Maps for navigation
const openGoogleMaps = () => {
    const { latitude, longitude } = restaurantData.coordinates;
    const label = encodeURIComponent(restaurantData.title);
    const url = Platform.select({
      ios: `maps:0,0?q=${label}@${latitude},${longitude}`,
      android: `geo:0,0?q=${latitude},${longitude}(${label})`,
      default: `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}` // Add default case
    });
  
    // Now url is guaranteed to have a value
    if (url) {
      Linking.canOpenURL(url)
        .then(supported => {
          if (supported) {
            return Linking.openURL(url);
          } else {
            // If default maps app doesn't work, try Google Maps directly
            const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
            return Linking.openURL(googleMapsUrl);
          }
        })
        .catch(error => {
          Alert.alert('Error', 'Could not open maps application.');
          console.error('Error opening maps:', error);
        });
    } else {
      // Handle the case where url is undefined
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      Linking.openURL(googleMapsUrl).catch(error => {
        Alert.alert('Error', 'Could not open maps application.');
        console.error('Error opening maps:', error);
      });
    }
  };
  const openWebsite = () => {
    const url = restaurantData.websiteUrl;
  
    if (!url) {
      Alert.alert('No Website', 'This restaurant has no website listed.');
      return;
    }
  
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert('Error', 'Cannot open website.');
        }
      })
      .catch((err) => {
        console.error('Failed to open website:', err);
        Alert.alert('Error', 'Something went wrong while opening the website.');
      });
  };
  
  // Function to make a phone call
  const makePhoneCall = () => {
    const phoneNumber = restaurantData.phoneNumber;
    const phoneUrl = `tel:${phoneNumber}`;

    Linking.canOpenURL(phoneUrl)
      .then(supported => {
        if (!supported) {
          Alert.alert('Error', 'Phone calls are not supported on this device');
        } else {
          return Linking.openURL(phoneUrl);
        }
      })
      .catch(error => {
        Alert.alert('Error', 'Could not make phone call');
        console.error('Error making phone call:', error);
      });
  };

  // Render image slider item
  const renderImageSliderItem = ({ item }: { item: ImageSliderItem }): React.ReactElement => (
    <Image 
      source={item.image} 
      style={styles.sliderImage} 
      resizeMode="cover"
    />
  );

  // Render pagination dots
  const renderPaginationDots = (): React.ReactElement => {
    return (
      <View style={styles.paginationContainer}>
        {imageSliderData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              { backgroundColor: index === activeSlideIndex ? TEAL : WHITE }
            ]}
          />
        ))}
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="light-content" translucent />
      <Image
        source={require('../assets/img/top.png')}
        style={styles.curvedBackground}
      />
      {/* Header with back button and bookmark */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Icon name="times" size={22} color="#000" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>{restaurantData.title}</Text>
        
        <TouchableOpacity 
          style={styles.bookmarkButton} 
          onPress={() => setIsBookmarked(!isBookmarked)}
        >
          <Icon name="bookmark" size={22} color={isBookmarked ? YELLOW : "#DDD"} />
        </TouchableOpacity>
      </View>
      
      {/* Verification badge */}
      <View style={styles.verificationContainer}>
        <Icon name="check-circle" size={16} color={WHITE} />
        <Text style={styles.verificationText}>Verified by Mapt</Text>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Image Slider */}
        <View style={styles.sliderCard}>
        <View style={styles.sliderContainer}>
          <FlatList
            ref={flatListRef}
            data={imageSliderData}
            renderItem={renderImageSliderItem}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleSlideChange}
            snapToInterval={width}
            snapToAlignment="center"
            decelerationRate="fast"
            onScrollToIndexFailed={handleScrollToIndexFailed}
          />
          {renderPaginationDots()}
        </View>
          </View>
        {/* Restaurant Info Section */}
        <View style={styles.infoCard}>
          {/* Location - Now clickable */}
          <TouchableOpacity 
            style={styles.infoRow}
            onPress={openGoogleMaps}
          >
            <Icon name="map-marker" size={18} color={BLUE} />
            <Text style={styles.infoText}>{restaurantData.address}</Text>
          </TouchableOpacity>
          
          {/* Open hours */}
          <View style={styles.infoRow}>
            <Icon name="clock-o" size={18} color={BLUE} />
            <Text style={styles.infoText}>Open until {restaurantData.openUntil} today</Text>
          </View>
          
          {/* Schedule */}
          <View style={styles.scheduleContainer}>
            <View style={styles.scheduleItem}>
              <Text style={styles.scheduleDay}>Mo - Fr</Text>
              <Text style={styles.scheduleHours}>{restaurantData.weekdayHours}</Text>
            </View>
            <View style={styles.scheduleItem}>
              <Text style={styles.scheduleDay}>Sat - Sun</Text>
              <Text style={styles.scheduleHours}>{restaurantData.weekendHours}</Text>
            </View>
          </View>
          
          {/* Match percentage */}
          <View style={styles.matchContainer}>
            <View style={styles.matchCircle}>
              <Text style={styles.matchPercentage}>{restaurantData.matchPercentage}%</Text>
              <Text style={styles.matchLabel}>Match</Text>
            </View>
          </View>
          
          {/* Action buttons */}
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="calendar" size={22} color={WHITE} />
              <Text style={styles.actionButtonText}>Book</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.roundButton, styles.roundButtonShare]}
              onPress={openGoogleMaps}
            >
              <Icon name="share" size={22} color={WHITE} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.roundButton, styles.roundButtonGlobe]}
              onPress={openWebsite}
             
            >
              <Icon name="globe" size={22} color={WHITE} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.roundButton, styles.roundButtonPhone]}
              onPress={makePhoneCall}
            >
              <Icon name="phone" size={22} color={WHITE} />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Description Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{restaurantData.description}</Text>
        </View>
        
        {/* Reviews Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          
          {/* Emoji reactions */}
          <View style={styles.emojiContainer}>
            {emojiCounts.map((item, index) => (
              <View key={index} style={styles.emojiItem}>
                <Text style={styles.emoji}>{item.emoji}</Text>
                <Text style={styles.emojiCount}>{item.count}</Text>
              </View>
            ))}
          </View>
          
          {/* Reviews - Now horizontal scrolling */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.reviewsScrollView}
            contentContainerStyle={styles.reviewsScrollContent}
          >
            {reviewsData.map((item) => (
              <View key={item.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <Image source={item.avatar} style={styles.reviewAvatar} />
                  <View style={styles.reviewerInfo}>
                    <Text style={styles.reviewerName}>{item.name}</Text>
                    <Text style={styles.reviewDate}>{item.date}</Text>
                  </View>
                  <Icon name="smile-o" size={20} color="#FFD700" style={styles.reviewEmoji} />
                </View>
                <Text style={styles.reviewText}>{item.text}</Text>
              </View>
            ))}
          </ScrollView>
          
          {/* How did this place make you feel */}
          <View style={styles.feelingsContainer}>
            <Text style={styles.feelingsTitle}>How did this place make you feel?</Text>
            <View style={styles.emoticonContainer}>
              <View style={styles.emoticon}>
                <Text style={styles.emoticonText}>😁</Text>
              </View>
              <View style={styles.emoticon}>
                <Text style={styles.emoticonText}>😍</Text>
              </View>
              <View style={styles.emoticon}>
                <Text style={styles.emoticonText}>😊</Text>
              </View>
              <View style={styles.emoticon}>
                <Text style={styles.emoticonText}>😄</Text>
              </View>
              <View style={styles.emoticon}>
                <Text style={styles.emoticonText}>🙂</Text>
              </View>
              <View style={styles.emoticon}>
                <Text style={styles.emoticonText}>😋</Text>
              </View>
              <View style={styles.emoticon}>
                <Text style={styles.emoticonText}>🙂</Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.leaveReviewButton}  onPress={handleNavigateToReview}>
              <Text style={styles.leaveReviewText}>Leave a Review</Text>
              <Icon name="long-arrow-right" size={20} color={WHITE} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RestaurantDetailScreen;