import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../Styles/BookingsStyle';

// TypeScript interfaces
interface BookingItem {
  id: string;
  type: 'hotel' | 'restaurant' | 'tour';
  name: string;
  location: string;
  date: string;
  time?: string;
  image: any;
  status: 'upcoming' | 'completed' | 'cancelled';
  confirmationCode: string;
  price: string;
  guests: number;
}

// Sample data for bookings
const bookingsData: BookingItem[] = [
  {
    id: '1',
    type: 'hotel',
    name: 'Swiss-Belhotel Rainforest',
    location: 'Kuta, Bali',
    date: '27-30 Apr 2025',
    image: require('../assets/img/logo2.png'),
    status: 'upcoming',
    confirmationCode: 'BKG7823491',
    price: '$350',
    guests: 2
  },
  {
    id: '2',
    type: 'restaurant',
    name: 'Lorem Ipsum Restaurant',
    location: 'Seminyak, Bali',
    date: '25 Apr 2025',
    time: '19:30',
    image: require('../assets/img/start1.png'),
    status: 'upcoming',
    confirmationCode: 'RSV6437219',
    price: 'Free Reservation',
    guests: 4
  },
  {
    id: '3',
    type: 'tour',
    name: 'Mount Bromo Sunrise Tour',
    location: 'East Java',
    date: '10-12 Apr 2025',
    image: require('../assets/img/start4.png'),
    status: 'completed',
    confirmationCode: 'TUR9234876',
    price: '$150/pax',
    guests: 2
  },
  {
    id: '4',
    type: 'hotel',
    name: 'Luxury Resort & Spa',
    location: 'Seminyak, Bali',
    date: '1-5 Apr 2025',
    image: require('../assets/img/logo2.png'),
    status: 'completed',
    confirmationCode: 'BKG5432198',
    price: '$780',
    guests: 2
  },
  {
    id: '5',
    type: 'restaurant',
    name: 'Another Restaurant',
    location: 'Ubud, Bali',
    date: '2 Apr 2025',
    time: '20:00',
    image: require('../assets/img/start2.png'),
    status: 'cancelled',
    confirmationCode: 'RSV1298734',
    price: 'Free Reservation',
    guests: 3
  }
];

// Interface for component props
interface BookingsScreenProps {
  navigation: any; // Ideally use a more specific type from React Navigation
}

const BookingsScreen: React.FC<BookingsScreenProps> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');
  
  // Filter bookings based on active tab
  const filteredBookings = bookingsData.filter(booking => booking.status === activeTab);
  
  // Get icon for booking type
  const getBookingTypeIcon = (type: string) => {
    switch(type) {
      case 'hotel':
        return 'building';
      case 'restaurant':
        return 'cutlery';
      case 'tour':
        return 'map-o';
      default:
        return 'calendar-check-o';
    }
  };
  
  // Render booking card
  const renderBookingItem = ({ item }: { item: BookingItem }) => (
    <TouchableOpacity 
      style={styles.bookingCard}
      onPress={() => navigation.navigate('BookingDetail', { bookingId: item.id })}
    >
      <View style={styles.bookingHeader}>
        <View style={styles.bookingTypeContainer}>
          <Icon name={getBookingTypeIcon(item.type)} size={14} color="#00798C" />
          <Text style={styles.bookingType}>
            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
          </Text>
        </View>
        <View style={[
          styles.statusBadge, 
          item.status === 'upcoming' ? styles.upcomingBadge : 
          item.status === 'completed' ? styles.completedBadge : 
          styles.cancelledBadge
        ]}>
          <Text style={styles.statusText}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>
      
      <View style={styles.bookingContent}>
        <Image source={item.image} style={styles.bookingImage} />
        
        <View style={styles.bookingInfo}>
          <Text style={styles.bookingName}>{item.name}</Text>
          <View style={styles.locationContainer}>
            <Icon name="map-marker" size={12} color="#666" />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
          
          <View style={styles.dateContainer}>
            <Icon name="calendar" size={12} color="#666" />
            <Text style={styles.dateText}>{item.date}</Text>
            {item.time && (
              <>
                <Icon name="clock-o" size={12} color="#666" style={styles.timeIcon} />
                <Text style={styles.dateText}>{item.time}</Text>
              </>
            )}
          </View>
          
          <View style={styles.guestsContainer}>
            <Icon name="user" size={12} color="#666" />
            <Text style={styles.guestsText}>{item.guests} {item.guests > 1 ? 'guests' : 'guest'}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.bookingFooter}>
        <View>
          <Text style={styles.confirmationLabel}>Confirmation #</Text>
          <Text style={styles.confirmationCode}>{item.confirmationCode}</Text>
        </View>
        <View>
          <Text style={styles.priceLabel}>Total</Text>
          <Text style={styles.priceValue}>{item.price}</Text>
        </View>
      </View>
      
      {item.status === 'upcoming' && (
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.modifyButton}>
            <Text style={styles.modifyButtonText}>Modify</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#00798C" barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Bookings</Text>
        <View style={styles.rightPlaceholder} />
      </View>
      
      {/* Tab Navigation */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
          onPress={() => setActiveTab('completed')}
        >
          <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>
            Completed
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'cancelled' && styles.activeTab]}
          onPress={() => setActiveTab('cancelled')}
        >
          <Text style={[styles.tabText, activeTab === 'cancelled' && styles.activeTabText]}>
            Cancelled
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Booking List */}
      {filteredBookings.length > 0 ? (
        <FlatList
          data={filteredBookings}
          renderItem={renderBookingItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.bookingsList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Icon name="calendar-times-o" size={60} color="#CCCCCC" />
          <Text style={styles.emptyText}>No {activeTab} bookings found</Text>
          {activeTab === 'upcoming' && (
            <TouchableOpacity 
              style={styles.exploreButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.exploreButtonText}>Explore and Book</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

export default BookingsScreen;