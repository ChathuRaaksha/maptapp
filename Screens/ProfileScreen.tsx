import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StatusBar, 
  SafeAreaView,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../Styles//ProfileStyles';

interface ProfileScreenProps {
  navigation: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  // Mock data for the profile
  const profileData = {
    username: 'ChathuRaaksha',
    email: 'worldtraveler@gmail.com',
    coins: 17,
    placesVisited: 12,
    placesAdded: 2,
    reviewsWritten: 4,
    profileImage: require('../assets/img/profile.png'), // Ensure this path matches your project structure
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfile'); // Navigate to edit profile screen
  };

  const handleAdjustPreferences = () => {
    navigation.navigate('AdjustPreferences'); // Navigate to preferences screen
  };

  const handleChangePassword = () => {
    navigation.navigate('ChangePassword'); // Navigate to change password screen
  };

  const handleSignOut = () => {
    // Add your logout logic here (API calls, clearing storage, etc.)
    console.log("User logged out");
    
    // Navigate to login screen
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent />
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <Icon name="chevron-left" size={22} color="#00798C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={styles.placeholder} />
        </View>
        
        {/* Profile Information */}
        <View style={styles.profileInfoContainer}>
          <Image 
            source={profileData.profileImage} 
            style={styles.profileImage} 
          />
          <Text style={styles.username}>{profileData.username}</Text>
          <Text style={styles.email}>{profileData.email}</Text>
          
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        
        {/* Stats Container */}
        <View style={styles.statsContainer}>
          <View style={styles.coinsSection}>
            <Text style={styles.coinsTitle}>Profile Coins</Text>
            <View style={styles.coinsBadge}>
              <Icon name="circle" size={16} color="#FFD700" />
              <Text style={styles.coinsValue}>{profileData.coins}</Text>
            </View>
          </View>
          
          <View style={styles.statsRow}>
            <View style={styles.statColumn}>
              <Text style={styles.statTitle}>Places visited</Text>
              <View style={styles.statValueContainer}>
                <Text style={styles.statValue}>{profileData.placesVisited}</Text>
                <Icon name="map-marker" size={16} color="#00798C" />
              </View>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.statColumn}>
              <Text style={styles.statTitle}>Places added</Text>
              <View style={styles.statValueContainer}>
                <Text style={styles.statValue}>{profileData.placesAdded}</Text>
                <Icon name="plus" size={16} color="#00798C" />
              </View>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.statColumn}>
              <Text style={styles.statTitle}>Reviews written</Text>
              <View style={styles.statValueContainer}>
                <Text style={styles.statValue}>{profileData.reviewsWritten}</Text>
                <Icon name="star" size={16} color="#00798C" />
              </View>
            </View>
          </View>
        </View>
        
        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.preferencesButton]} 
            onPress={handleAdjustPreferences}
          >
            <Icon name="sliders" size={22} color="#00798C" />
            <Text style={styles.actionButtonText}>Adjust Preferences</Text>
            <Icon name="chevron-right" size={16} color="#00798C" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={handleChangePassword}
          >
            <Icon name="key" size={22} color="#00798C" />
            <Text style={styles.actionButtonText}>Change Password</Text>
            <Icon name="chevron-right" size={16} color="#00798C" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.signOutButton]} 
            onPress={handleSignOut}
          >
            <Icon name="sign-out" size={22} color="#FF6347" />
            <Text style={styles.signOutText}>Sign Out</Text>
            <Icon name="chevron-right" size={16} color="#FF6347" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;