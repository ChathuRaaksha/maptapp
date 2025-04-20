import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface DrawerContentProps {
  navigation: any;
  closeDrawer: () => void;
  handleLogout: () => void;
}

const DrawerContent: React.FC<DrawerContentProps> = ({ navigation, closeDrawer, handleLogout }) => {
  // Menu items for the drawer
  const menuItems = [
    { icon: 'home', label: 'Home', screen: 'Home' },
    { icon: 'compass', label: 'Explore', screen: 'Explore' },
    { icon: 'bookmark', label: 'Saved', screen: 'Saved' },
    { icon: 'star', label: 'Contributions', screen: 'Contributions' },
    { icon: 'ticket', label: 'My Bookings', screen: 'Bookings' },
    { icon: 'bell', label: 'Notifications', screen: 'Notifications' },
    { icon: 'question-circle', label: 'FAQ', screen: 'FAQ' },
    { icon: 'envelope', label: 'Contact Us', screen: 'ContactUs' },
    { icon: 'credit-card', label: 'Subscription Plans', screen: 'SubscriptionPlans' },
    { icon: 'cog', label: 'Settings', screen: 'Settings' },
  ];

  const confirmLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Logout", 
          onPress: handleLogout,
          style: "destructive"
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* User Profile Section */}
      <View style={styles.profileSection}>
        <Image 
          source={require('../assets/img/profile.png')} 
          style={styles.profileImage} 
        />
        <View style={styles.profileInfo}>
          <Text style={styles.userName}>Supun</Text>
          <View style={styles.pointsContainer}>
            <Icon name="circle" size={14} color="#FFD700" />
            <Text style={styles.pointsText}>2,000 points</Text>
          </View>
        </View>
      </View>

      {/* Menu Items */}
      <ScrollView style={styles.menuItemsContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity 
            key={index}
            style={styles.menuItem}
            onPress={() => {
              navigation.navigate(item.screen);
              closeDrawer();
            }}
          >
            <Icon name={item.icon} size={22} color="#00798C" style={styles.menuIcon} />
            <Text style={styles.menuLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Footer with Logout Button */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={confirmLogout}
        >
          <Icon name="sign-out" size={20} color="#FF6B6B" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
        <Text style={styles.versionText}>App Version 1.0.0</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 50,
  },
  profileSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileInfo: {
    marginLeft: 15,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  pointsText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
  menuItemsContainer: {
    flex: 1,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  menuIcon: {
    width: 25,
    textAlign: 'center',
  },
  menuLabel: {
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  logoutText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#FF6B6B',
  },
  versionText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default DrawerContent;