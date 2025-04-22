import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  Dimensions,
  StatusBar,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import DrawerNavigator from "./DrawerNavigator";
import styles from "../Styles/ContributeStyles"; // Import styles

// Type definition for navigation prop
interface ContributeScreenProps {
  navigation: any; // Ideally use a more specific type from React Navigation
}

// Type for contribution history items
interface ContributionItem {
  id: string;
  place: string;
  status: 'accepted' | 'pending' | 'rejected';
  coins: number;
  date?: string; // Added date property
}

const { width } = Dimensions.get("window");

const ContributeScreen: React.FC<ContributeScreenProps> = ({ navigation }) => {
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
  
  // Sample contribution history data with dates
  const contributionHistory: ContributionItem[] = [
    { id: '1', place: 'City Park', status: 'accepted', coins: 5, date: '2024-12-1' },
    { id: '2', place: 'Mountain View Restaurant', status: 'pending', coins: 0, date: '2025-1-15' },
    { id: '3', place: 'Beach Resort', status: 'rejected', coins: 0, date: '2025-2-3' },
    { id: '4', place: 'Downtown Library', status: 'accepted', coins: 2, date: '2025-3-12' },
  ];

  // Function to format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // Return original if invalid date
    
    // Format date as "Jan 1, 2025"
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Handle logout functionality
  const handleLogout = () => {
    // Add your logout logic here (API calls, clearing storage, etc.)
    console.log("User logged out");
    
    // Navigate to login screen or show confirmation
    Alert.alert("Success", "You have been logged out successfully");
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: 'Login' }], // Uncomment to navigate to Login screen
    // });
  };
  
  // Get status icon based on status
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'accepted':
        return <Icon name="check-circle" size={16} color="#4CAF50" />;
      case 'pending':
        return <Icon name="clock-o" size={16} color="#FFC107" />;
      case 'rejected':
        return <Icon name="times-circle" size={16} color="#F44336" />;
      default:
        return null;
    }
  };
  const handleGoBack = () => {
    navigation.goBack();
  };

  // HomeContent component with openDrawer prop
  const HomeContent: React.FC<{ openDrawer?: () => void }> = ({ openDrawer }) => {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" barStyle="light-content" translucent />
        
        {/* Top Curved Image */}
        <Image
          source={require('../assets/img/top.png')}
          style={styles.curvedBackground}
        />
        
        {/* Header */}
        <View style={styles.header}>
          {/* Menu Button */}
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <Icon name="chevron-left" size={22} color="#00798C" />
          </TouchableOpacity>
          
          <View style={styles.userInfo}>
            <Text style={styles.greeting}>Contributions</Text>
           
          </View>
          
          <TouchableOpacity style={styles.profileButton}>
            <Image
              source={require('../assets/img/start1.png')}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        {/* Main Content - Scrollable */}
        <ScrollView style={styles.scrollContent}>
          {/* Card 1: Add a Place */}
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.cardTextContainer}>
                <View style={styles.cardIconContainer}>
                  <Icon name="map-marker" size={24} color="#00798C" />
                </View>
                <Text style={styles.cardTitle}>Did we miss something?</Text>
                <TouchableOpacity style={styles.cardButton}>
                  <Text style={styles.cardButtonText}>Add a Place to the map</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Card 2: Leave a Review */}
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.cardTextContainer}>
                <View style={styles.emojiContainer}>
                  <Text style={styles.emoji}>😊</Text>
                  <Text style={styles.emoji}>❤️</Text>
                  <Text style={styles.emoji}>😐</Text>
                </View>
                <Text style={styles.cardTitle}>Went to a New Place?</Text>
                <TouchableOpacity style={styles.cardButton}>
                  <Text style={styles.cardButtonText}>Leave a Review</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Contribution History Section */}
          <View style={styles.historySection}>
            <Text style={styles.sectionTitle}>Contribution History</Text>
            
            {contributionHistory.map((item) => (
              <View key={item.id} style={styles.historyItem}>
                <Icon name="map-marker" size={20} color="#00798C" style={styles.historyIcon} />
                
                <View style={styles.historyDetails}>
                  <View style={styles.historyHeader}>
                    <Text style={styles.historyPlace}>{item.place}</Text>
                    {item.coins > 0 && (
                      <View style={styles.coinsContainer}>
                        <Text style={styles.coinsText}>{item.coins}+ coins</Text>
                      </View>
                    )}
                  </View>
                  
                  <View style={styles.historyStatus}>
                    {getStatusIcon(item.status)}
                    <Text style={styles.historyStatusText}>{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</Text>
                  </View>
                  
                  {item.date && (
                    <Text style={styles.historyDate}>{formatDate(item.date)}</Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  // Wrap the HomeContent with the DrawerNavigator
  return (
    <DrawerNavigator
      navigation={navigation}
      handleLogout={handleLogout}
    >
      <HomeContent />
    </DrawerNavigator>
  );
};

export default ContributeScreen;