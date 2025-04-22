import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Switch,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../Styles/NotificationsStyles';
import DrawerNavigator from './DrawerNavigator';

interface NotificationItem {
  id: string;
  type: 'booking' | 'promo' | 'system' | 'reward';
  title: string;
  message: string;
  time: string;
  read: boolean;
  image?: any;
}

interface NotificationCategory {
  id: string;
  name: string;
  enabled: boolean;
}

interface NotificationsScreenProps {
  navigation: any;
}

// Sample notifications data
const notificationsData: NotificationItem[] = [
  {
    id: '1',
    type: 'booking',
    title: 'Booking Confirmed',
    message: 'Your booking for Stockholm Winter Wonder has been confirmed. Get ready for your trip!',
    time: '2h ago',
    read: false,
    image: require('../assets/img/start1.png'),
  },
  {
    id: '2',
    type: 'promo',
    title: 'Special Offer',
    message: '30% discount on all bookings to Gothenburg this month! Use code GOTEBORG30',
    time: '5h ago',
    read: false,
    image: require('../assets/img/start2.png'),
  },
  {
    id: '3',
    type: 'system',
    title: 'App Update Available',
    message: 'New version 1.2.0 is available with exciting new features and improvements',
    time: '1d ago',
    read: true,
  },
  {
    id: '4',
    type: 'reward',
    title: 'Points Awarded',
    message: 'You\'ve earned 200 points for your recent booking. Keep exploring!',
    time: '2d ago',
    read: true,
  },
  {
    id: '5',
    type: 'booking',
    title: 'Upcoming Trip Reminder',
    message: 'Your trip to Kiruna is in 3 days. Check your itinerary and prepare for adventure!',
    time: '3d ago',
    read: true,
    image: require('../assets/img/start5.png'),
  }
];

// Notification categories for settings
const notificationCategories: NotificationCategory[] = [
  { id: 'booking', name: 'Booking Updates', enabled: true },
  { id: 'promo', name: 'Promotions & Offers', enabled: true },
  { id: 'system', name: 'System Updates', enabled: true },
  { id: 'reward', name: 'Points & Rewards', enabled: true }
];

const TEAL = '#4FBBB2';

const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ navigation }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(notificationsData);
  const [categories, setCategories] = useState<NotificationCategory[]>(notificationCategories);
  const [showSettings, setShowSettings] = useState(false);
  
  const unreadCount = notifications.filter(item => !item.read).length;

  const markAsRead = (notificationId: string) => {
    const updatedNotifications = notifications.map(notification => 
      notification.id === notificationId ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({ ...notification, read: true }));
    setNotifications(updatedNotifications);
  };

  const deleteNotification = (notificationId: string) => {
    const updatedNotifications = notifications.filter(notification => notification.id !== notificationId);
    setNotifications(updatedNotifications);
  };

  const toggleCategoryEnabled = (categoryId: string) => {
    const updatedCategories = categories.map(category => 
      category.id === categoryId ? { ...category, enabled: !category.enabled } : category
    );
    setCategories(updatedCategories);
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'booking': return 'calendar-check-o';
      case 'promo': return 'tag';
      case 'system': return 'cog';
      case 'reward': return 'gift';
      default: return 'bell';
    }
  };

  const getIconContainerStyle = (type: string) => {
    switch (type) {
      case 'booking': return styles.bookingIconContainer;
      case 'promo': return styles.promoIconContainer;
      case 'system': return styles.systemIconContainer;
      case 'reward': return styles.rewardIconContainer;
      default: return {}; // Default empty style
    }
  };

  const renderNotificationItem = ({ item }: { item: NotificationItem }) => (
    <TouchableOpacity 
      style={[styles.notificationItem, !item.read && styles.unreadNotification]}
      onPress={() => markAsRead(item.id)}
    >
      <View style={styles.notificationContent}>
        {!item.read && <View style={styles.unreadDot} />}
        <View style={[styles.iconContainer, getIconContainerStyle(item.type)]}>
          <Icon name={getIconForType(item.type)} size={20} color="white" />
        </View>
        <View style={styles.notificationTextContainer}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationMessage}>{item.message}</Text>
          <Text style={styles.notificationTime}>{item.time}</Text>
        </View>
        {item.image && (
          <Image source={item.image} style={styles.notificationImage} />
        )}
      </View>
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => deleteNotification(item.id)}
      >
        <Icon name="trash" size={16} color="#FF6B6B" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderCategoryItem = ({ item }: { item: NotificationCategory }) => (
    <View style={styles.categoryItem}>
      <View style={styles.categoryInfo}>
        <View style={[styles.iconContainer, getIconContainerStyle(item.id)]}>
          <Icon name={getIconForType(item.id)} size={20} color="white" />
        </View>
        <Text style={styles.categoryName}>{item.name}</Text>
      </View>
      <Switch
        value={item.enabled}
        onValueChange={() => toggleCategoryEnabled(item.id)}
        trackColor={{ false: '#D1D1D1', true: '#9DD9E0' }}
        thumbColor={item.enabled ? TEAL : '#F4F4F4'}
      />
    </View>
  );

  // Notifications content component
  const NotificationsContent = () => (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {showSettings ? 'Notification Settings' : 'Notifications'}
        </Text>
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={() => setShowSettings(!showSettings)}
        >
          <Icon name={showSettings ? 'bell' : 'cog'} size={20} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Actions Bar */}
      {!showSettings && (
        <View style={styles.actionsBar}>
          <Text style={styles.notificationCount}>
            {unreadCount > 0 
              ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` 
              : 'No unread notifications'}
          </Text>
          {unreadCount > 0 && (
            <TouchableOpacity 
              style={styles.markAllReadButton}
              onPress={markAllAsRead}
            >
              <Text style={styles.markAllReadText}>Mark all as read</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Settings or Notifications List */}
      {showSettings ? (
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={renderCategoryItem}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        notifications.length > 0 ? (
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.id}
            renderItem={renderNotificationItem}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyStateContainer}>
            <Icon name="bell-slash" size={60} color="#CCCCCC" />
            <Text style={styles.emptyStateText}>No notifications</Text>
            <Text style={styles.emptyStateSubtext}>
              You don't have any notifications at the moment
            </Text>
          </View>
        )
      )}
    </View>
  );

  return <NotificationsContent />;
};

export default NotificationsScreen;