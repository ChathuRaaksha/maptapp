import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Alert,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import styles from '../Styles/EditProfileStyles';

interface EditProfileScreenProps {
  navigation: any;
}

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({ navigation }) => {
  // Mock profile data
  const [username, setUsername] = useState('Worldtraveler123');
  const [email, setEmail] = useState('worldtraveler@gmail.com');
  const [bio, setBio] = useState('Travel enthusiast exploring the world one destination at a time.');
  const [profileImage, setProfileImage] = useState(require('../assets/img/profile.png'));
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSelectImage = async () => {
    try {
      // Request permission to access the media library
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'You need to grant permission to access your photos.');
        return;
      }

      // Launch the image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        // Set the selected image
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error selecting image:', error);
      Alert.alert('Error', 'Failed to pick an image. Please try again.');
    }
  };

  const handleSaveChanges = () => {
    // Validate inputs
    if (!username.trim()) {
      Alert.alert('Error', 'Username cannot be empty');
      return;
    }

    // Here you would typically make an API call to update the profile
    console.log('Profile updated:', { username, email, bio, imageUri });
    
    // Show success message
    Alert.alert(
      'Success',
      'Profile updated successfully',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
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
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <View style={styles.placeholder} />
        </View>
        
        {/* Profile Image Section */}
        <View style={styles.profileImageSection}>
          <View style={styles.profileImageContainer}>
            <Image 
              source={imageUri ? { uri: imageUri } : profileImage} 
              style={styles.profileImage} 
            />
            <TouchableOpacity 
              style={styles.changePhotoButton}
              onPress={handleSelectImage}
            >
              <Icon name="camera" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.selectPhotoButton} onPress={handleSelectImage}>
            <Text style={styles.selectPhotoText}>Change Profile Photo</Text>
          </TouchableOpacity>
        </View>
        
        {/* Form Fields */}
        <View style={styles.formContainer}>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Username</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.formInput}
                value={username}
                onChangeText={setUsername}
                placeholder="Enter username"
                placeholderTextColor="#999"
              />
            </View>
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Email</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.formInput, styles.disabledInput]}
                value={email}
                editable={false}
                placeholder="Enter email"
                placeholderTextColor="#999"
              />
              <Icon name="lock" size={16} color="#999" style={styles.lockIcon} />
            </View>
            <Text style={styles.helperText}>Contact support to change email</Text>
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Bio</Text>
            <View style={styles.textAreaContainer}>
              <TextInput
                style={styles.textArea}
                value={bio}
                onChangeText={setBio}
                placeholder="Write a short bio about yourself"
                placeholderTextColor="#999"
                multiline
                numberOfLines={4}
                maxLength={150}
              />
            </View>
            <Text style={styles.charCount}>{bio.length}/150</Text>
          </View>
        </View>
        
        {/* Save Button */}
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSaveChanges}
        >
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;