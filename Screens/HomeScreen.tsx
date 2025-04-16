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
import styles from "../Styles/HomeScreen"; // Import styles
import CustomMap from "./MapScreen";
// TypeScript interfaces for data types
interface CarouselItem {
  id: string;
  title: string;
  image: any;
  rating: number;
  eta: string;
  distance: string;
  tags: string[];
}

interface DestinationItem {
  id: string;
  name: string;
  location: string;
  image: any;
  rating: number;
  price: string;
  duration: string;
}

interface HotelItem {
  id: string;
  name: string;
  location: string;
  image: any;
  stars: string;
}

interface NavigationOption {
  id: string;
  name: string;
  icon: string;
}

// Carousel data for "Let's find a Match!"
const carouselData: CarouselItem[] = [
  {
    id: '1',
    title: 'Lorem Ipsum Restaurant',
    image: require('../assets/img/start1.png'),
    rating: 4.8,
    eta: '20:00',
    distance: '1.2km',
    tags: ['AYCE', 'Hot', 'New']
  },
  {
    id: '2',
    title: 'Another Restaurant',
    image: require('../assets/img/start2.png'),
    rating: 4.5,
    eta: '25:00',
    distance: '2.1km',
    tags: ['Popular', 'Spicy', 'Local']
  },
  {
    id: '3',
    title: 'Third Restaurant',
    image: require('../assets/img/start3.png'),
    rating: 4.7,
    eta: '15:00',
    distance: '0.8km',
    tags: ['Fusion', 'Vegan', 'Cozy']
  }
];

// Destinations data
const destinationsData: DestinationItem[] = [
  {
    id: '1',
    name: 'Mount Bromo',
    location: 'Volcano in East Java',
    image: require('../assets/img/start4.png'),
    rating: 4.9,
    price: '$ 150/pax',
    duration: '3D2N'
  },
  {
    id: '2',
    name: 'Labengki Sombori',
    location: 'Islands in Sulawesi',
    image: require('../assets/img/start5.png'),
    rating: 4.8,
    price: '$ 250/pax',
    duration: '3D2N'
  },
  {
    id: '3',
    name: 'Sailing Komodo',
    location: 'Labuan Bajo',
    image: require('../assets/img/start5.png'),
    rating: 4.8,
    price: '$ 200/pax',
    duration: '4D3N'
  }
];

// Hotels data
const hotelsData: HotelItem[] = [
  {
    id: '1',
    name: 'Swiss-Belhotel Rainforest Kuta',
    location: 'Jl. Sunset Road No. 101, Kuta, Bali, Indonesia',
    image: require('../assets/img/logo2.png'),
    stars: '4-star hotel'
  },
  {
    id: '2',
    name: 'Luxury Resort & Spa',
    location: 'Beach Front, Seminyak, Bali, Indonesia',
    image: require('../assets/img/logo2.png'),
    stars: '5-star hotel'
  }
];

// Navigation options
const navigationOptions: NavigationOption[] = [
  { id: '1', name: 'Restaurants', icon: 'cutlery' },
  { id: '2', name: 'Hotels', icon: 'building' },
  { id: '3', name: 'Culture', icon: 'university' },
  { id: '4', name: 'Attractions', icon: 'ticket' },
  { id: '5', name: 'Tours', icon: 'map' },
  { id: '6', name: 'More', icon: 'ellipsis-h' }
];

// Type definition for navigation prop
interface HomeScreenProps {
  navigation: any; // Ideally use a more specific type from React Navigation
}

const { width } = Dimensions.get("window");

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);

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

  // Render carousel item using FlatList
  const renderCarouselItem = ({ item }: { item: CarouselItem }) => (
    <View style={styles.carouselItem}>
      <Image source={item.image} style={styles.carouselImage} />
      <View style={styles.carouselContent}>
        <Text style={styles.carouselTitle}>{item.title}</Text>
        <View style={styles.ratingContainer}>
          <Icon name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
        <View style={styles.tagsContainer}>
          {item.tags.map((tag, index) => (
            <View key={index} style={styles.tagItem}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
        <View style={styles.etaContainer}>
          <Icon name="clock-o" size={14} color="#666" />
          <Text style={styles.etaText}>Open until {item.eta}</Text>
          <Text style={styles.distanceText}>{item.distance}</Text>
        </View>
      </View>
    </View>
  );

  // Render destination item
  const renderDestinationItem = ({ item }: { item: DestinationItem }) => (
    <TouchableOpacity style={styles.destinationCard}>
      <Image source={item.image} style={styles.destinationImage} />
      <View style={styles.destinationInfo}>
        <Text style={styles.destinationName}>{item.name}</Text>
        <Text style={styles.destinationLocation}>{item.location}</Text>
        <View style={styles.ratingRow}>
          <Icon name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Start from</Text>
          <Text style={styles.priceText}>{item.price}</Text>
          <View style={styles.durationBadge}>
            <Text style={styles.durationText}>{item.duration}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Render hotel item
  const renderHotelItem = ({ item }: { item: HotelItem }) => (
    <TouchableOpacity style={styles.hotelCard}>
      <Image source={item.image} style={styles.hotelImage} />
      <View style={styles.hotelInfo}>
        <Text style={styles.hotelName}>{item.name}</Text>
        <Text style={styles.hotelLocation}>{item.location}</Text>
        <View style={styles.starContainer}>
          <Icon name="star" size={14} color="#FFD700" />
          <Text style={styles.starText}>{item.stars}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

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
          <TouchableOpacity style={styles.menuButton} onPress={openDrawer}>
            <Icon name="bars" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          
          <View style={styles.userInfo}>
            <Text style={styles.greeting}>Hi, Supun</Text>
            <View style={styles.pointsContainer}>
              <Icon name="circle" size={16} color="#FFD700" />
              <Text style={styles.pointsText}>2,000 points</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.profileButton}>
            <Image 
              source={require('../assets/img/start1.png')} 
              style={styles.profileImage} 
            />
          </TouchableOpacity>
        </View>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search destinations, hotels..."
            placeholderTextColor="#999"
          />
        </View>
        
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Carousel Section */}
          <View style={styles.carouselSection}>
            <View style={styles.matchTitleContainer}>
              <Text style={styles.matchTitle}>Let's find a Match!</Text>
            </View>
            <FlatList
              data={carouselData}
              renderItem={renderCarouselItem}
              keyExtractor={(item) => item.id}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={(event) => {
                const slideIndex = Math.floor(
                  Math.floor(event.nativeEvent.contentOffset.x) / 
                  Math.floor(event.nativeEvent.layoutMeasurement.width)
                );
                setActiveCarouselIndex(slideIndex);
              }}
              contentContainerStyle={{ paddingHorizontal: width * 0.1 }}
              snapToInterval={width * 0.8}
              snapToAlignment="center"
              decelerationRate="fast"
            />
          </View>
          
          {/* Navigation Options */}
          <View style={styles.navOptionsContainer}>
            {navigationOptions.map((option) => (
              <TouchableOpacity key={option.id} style={styles.navOption}>
                <View style={styles.navIconContainer}>
                  <Icon name={option.icon} size={24} color="#00798C" />
                </View>
                <Text style={styles.navText}>{option.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Destinations Section */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Journey together</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See all</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={destinationsData}
              renderItem={renderDestinationItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.destinationList}
            />
          </View>
          
          {/* Hotels Section */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Hotels recomendation for you</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See all</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={hotelsData}
              renderItem={renderHotelItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.hotelList}
            />
          </View>
        </ScrollView>
        
        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem} onPress={() => {}}>
            <Icon name="home" size={24} color="#00798C" />
            <Text style={[styles.navItemText, styles.activeNavText]}>Home</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ARCamera')}>
            <Icon name="camera" size={24} color="#666" />
            <Text style={styles.navItemText}>AR Camera</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Map')}>
            <Icon name="map-marker" size={24} color="#666" />
            <Text style={styles.navItemText}>MAP</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Account')}>
            <Icon name="user" size={24} color="#666" />
            <Text style={styles.navItemText}>Account</Text>
          </TouchableOpacity>
        </View>
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

export default HomeScreen;