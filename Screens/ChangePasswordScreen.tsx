import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Alert,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../Styles/ChangePasswordStyles';

interface ChangePasswordScreenProps {
  navigation: any;
}

const ChangePasswordScreen: React.FC<ChangePasswordScreenProps> = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Mock current password for validation purposes
  const currentPassword = 'Chathu6@ac';

  const handleGoBack = () => {
    navigation.goBack();
  };

  // Toggle password visibility for all fields
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
    setShowOldPassword(!passwordVisible);
    setShowNewPassword(!passwordVisible);
    setShowRepeatPassword(!passwordVisible);
  };

  // Password validation
  const validatePassword = (password: string) => {
    const hasMinimumLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      hasMinimumLength,
      hasUpperCase,
      hasLowerCase,
      hasNumber,
      hasSpecialChar,
      isValid: hasMinimumLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar
    };
  };

  const handleSavePassword = () => {
    // Validate old password
    if (oldPassword !== currentPassword) {
      Alert.alert('Error', 'Current password is incorrect');
      return;
    }

    // Check if new password is the same as old password
    if (newPassword === oldPassword) {
      Alert.alert('Error', 'New password cannot be the same as old password');
      return;
    }

    // Check if new password meets requirements
    const validation = validatePassword(newPassword);
    if (!validation.isValid) {
      Alert.alert('Error', 'New password does not meet all requirements');
      return;
    }

    // Check if passwords match
    if (newPassword !== repeatPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // Here you would typically make an API call to update the password
    console.log('Password updated successfully');
    
    // Show success message
    Alert.alert(
      'Success',
      'Password changed successfully',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  // Render validation indicator
  const ValidationIndicator = ({ isValid }: { isValid: boolean }) => (
    <View style={[styles.validationIndicator, isValid ? styles.validIndicator : styles.invalidIndicator]}>
      <Icon name={isValid ? "check" : "times"} size={12} color={isValid ? "#4CAF50" : "#FF0000"} />
    </View>
  );

  // Get password validation results
  const passwordValidation = validatePassword(newPassword);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent />
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <Icon name="chevron-left" size={22} color="#00798C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Change Password</Text>
          <View style={styles.placeholder} />
        </View>
        
        {/* Form Fields */}
        <View style={styles.formContainer}>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Old Password</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.passwordInput}
                value={oldPassword}
                onChangeText={setOldPassword}
                placeholder="Enter current password"
                placeholderTextColor="#999"
                secureTextEntry={!showOldPassword}
              />
              <TouchableOpacity onPress={() => setShowOldPassword(!showOldPassword)}>
                <Icon name={showOldPassword ? "eye-slash" : "eye"} size={18} color="#999" />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>New Password</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.passwordInput}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Enter new password"
                placeholderTextColor="#999"
                secureTextEntry={!showNewPassword}
              />
              <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
                <Icon name={showNewPassword ? "eye-slash" : "eye"} size={18} color="#999" />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Repeat Password</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.passwordInput}
                value={repeatPassword}
                onChangeText={setRepeatPassword}
                placeholder="Confirm new password"
                placeholderTextColor="#999"
                secureTextEntry={!showRepeatPassword}
              />
              <TouchableOpacity onPress={() => setShowRepeatPassword(!showRepeatPassword)}>
                <Icon name={showRepeatPassword ? "eye-slash" : "eye"} size={18} color="#999" />
              </TouchableOpacity>
            </View>
            {repeatPassword && newPassword !== repeatPassword && (
              <Text style={styles.errorText}>Passwords do not match</Text>
            )}
          </View>
          
          {/* Password visibility toggle */}
          <TouchableOpacity 
            style={styles.visibilityToggle}
            onPress={togglePasswordVisibility}
          >
            <View style={[styles.checkbox, passwordVisible && styles.checkboxChecked]}>
              {passwordVisible && <Icon name="check" size={12} color="#FFFFFF" />}
            </View>
            <Text style={styles.visibilityText}>Show passwords</Text>
          </TouchableOpacity>
          
          {/* Password Requirements */}
          <View style={styles.requirementsContainer}>
            <Text style={styles.requirementsTitle}>Password Requirements:</Text>
            <View style={styles.requirementItem}>
              <ValidationIndicator isValid={passwordValidation.hasMinimumLength} />
              <Text style={styles.requirementText}>Minimum 8 characters</Text>
            </View>
            <View style={styles.requirementItem}>
              <ValidationIndicator isValid={passwordValidation.hasUpperCase} />
              <Text style={styles.requirementText}>At least one uppercase letter</Text>
            </View>
            <View style={styles.requirementItem}>
              <ValidationIndicator isValid={passwordValidation.hasLowerCase} />
              <Text style={styles.requirementText}>At least one lowercase letter</Text>
            </View>
            <View style={styles.requirementItem}>
              <ValidationIndicator isValid={passwordValidation.hasNumber} />
              <Text style={styles.requirementText}>At least one number</Text>
            </View>
            <View style={styles.requirementItem}>
              <ValidationIndicator isValid={passwordValidation.hasSpecialChar} />
              <Text style={styles.requirementText}>At least one special character</Text>
            </View>
            {oldPassword && newPassword && oldPassword === newPassword && (
              <View style={styles.requirementItem}>
                <ValidationIndicator isValid={false} />
                <Text style={styles.errorText}>New password cannot be the same as old password</Text>
              </View>
            )}
          </View>
        </View>
        
        {/* Save Button */}
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSavePassword}
        >
          <Text style={styles.saveButtonText}>Update Password</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;