import React, { useState , useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StatusBar,
  TextInput,
  Alert,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../Styles/ExploreStyles';
import DrawerNavigator from './DrawerNavigator';

// TypeScript interfaces
interface City {
  id: string;
  name: string;
  image: any;
  description: string;
  rating: number;
  activities: number;
}

interface TravelPlan {
  id: string;
  cityId: string;
  days: number;
  title: string;
  description: string;
  price: string;
  image: any;
  itinerary: Array<{
    day: number;
    activities: Array<{
      time: string;
      activity: string;
      location: string;
    }>;
  }>;
}

interface ExploreScreenProps {
  navigation: any;
}

// Swedish cities data
const citiesData: City[] = [
  {
    id: '1',
    name: 'Stockholm',
    image: require('../assets/img/start1.png'),
    description: 'Sweden\'s capital city spread across 14 islands with colorful old town and museums',
    rating: 4.8,
    activities: 42
  },
  {
    id: '2',
    name: 'Gothenburg',
    image: require('../assets/img/start2.png'),
    description: 'Sweden\'s second-largest city known for its Dutch-style canals and leafy boulevards',
    rating: 4.6,
    activities: 35
  },
  {
    id: '3',
    name: 'Malmö',
    image: require('../assets/img/start3.png'),
    description: 'Coastal city in southern Sweden with modern architecture and multicultural vibe',
    rating: 4.5,
    activities: 28
  },
  {
    id: '4',
    name: 'Uppsala',
    image: require('../assets/img/start4.png'),
    description: 'University town with Scandinavia\'s oldest university and magnificent cathedral',
    rating: 4.4,
    activities: 20
  },
  {
    id: '5',
    name: 'Kiruna',
    image: require('../assets/img/start5.png'),
    description: 'Sweden\'s northernmost town famous for northern lights and ice hotel',
    rating: 4.7,
    activities: 15
  }
];

// Travel plans data
const travelPlansData: TravelPlan[] = [
  {
    id: '1',
    cityId: '1',
    days: 3,
    title: 'Stockholm Winter Wonder',
    description: 'Experience Stockholm\'s charm in winter with this perfect 3-day itinerary',
    price: '$599',
    image: require('../assets/img/start1.png'),
    itinerary: [
      {
        day: 1,
        activities: [
          { time: '09:00', activity: 'Vasa Museum', location: 'Djurgården' },
          { time: '12:30', activity: 'Lunch at Östermalms Saluhall', location: 'Östermalm' },
          { time: '14:00', activity: 'Royal Palace Tour', location: 'Gamla Stan' },
          { time: '17:00', activity: 'Dinner at Tradition', location: 'Gamla Stan' }
        ]
      },
      {
        day: 2,
        activities: [
          { time: '09:30', activity: 'ABBA Museum', location: 'Djurgården' },
          { time: '13:00', activity: 'Ferry to Fjäderholmarna', location: 'Stockholm Archipelago' },
          { time: '16:00', activity: 'Fotografiska Museum', location: 'Södermalm' },
          { time: '19:00', activity: 'Dinner at Urban Deli', location: 'Södermalm' }
        ]
      },
      {
        day: 3,
        activities: [
          { time: '10:00', activity: 'City Hall Tour', location: 'Kungsholmen' },
          { time: '12:30', activity: 'Lunch at Mathias Dahlgren', location: 'Grand Hôtel' },
          { time: '14:30', activity: 'Nordic Museum', location: 'Djurgården' },
          { time: '18:00', activity: 'Farewell Dinner Cruise', location: 'Stockholm Waterfront' }
        ]
      }
    ]
  },
  {
    id: '2',
    cityId: '1',
    days: 5,
    title: 'Stockholm Ultimate Experience',
    description: 'Immerse yourself in Stockholm\'s culture, history and cuisine for 5 days',
    price: '$899',
    image: require('../assets/img/start1.png'),
    itinerary: [
      {
        day: 1,
        activities: [
          { time: '09:00', activity: 'Gamla Stan Walking Tour', location: 'Old Town' },
          { time: '12:00', activity: 'Lunch at Pelikan', location: 'Södermalm' },
          { time: '14:00', activity: 'Skansen Open-Air Museum', location: 'Djurgården' },
          { time: '18:00', activity: 'Dinner at Oaxen Slip', location: 'Djurgården' }
        ]
      },
      {
        day: 2,
        activities: [
          { time: '09:30', activity: 'Royal Canal Tour', location: 'City Center' },
          { time: '12:30', activity: 'Lunch at Teatern', location: 'Ringen Mall' },
          { time: '14:30', activity: 'Moderna Museet', location: 'Skeppsholmen' },
          { time: '19:00', activity: 'Dinner at Lilla Ego', location: 'Vasastan' }
        ]
      }
      // Days 3-5 would follow similar pattern
    ]
  },
  {
    id: '3',
    cityId: '2',
    days: 3,
    title: 'Gothenburg Getaway',
    description: 'Discover Sweden\'s coolest coastal city in this 3-day adventure',
    price: '$549',
    image: require('../assets/img/start2.png'),
    itinerary: [
      {
        day: 1,
        activities: [
          { time: '09:00', activity: 'Liseberg Amusement Park', location: 'City Center' },
          { time: '13:00', activity: 'Lunch at Feskekôrka', location: 'Fish Market' },
          { time: '15:00', activity: 'Gothenburg Museum of Art', location: 'Götaplatsen' },
          { time: '18:00', activity: 'Dinner at Sjömagasinet', location: 'Harbor Area' }
        ]
      },
      // Days 2-3 would follow similar pattern
    ]
  },
  {
    id: '4',
    cityId: '5',
    days: 4,
    title: 'Arctic Adventure in Kiruna',
    description: 'Experience the magic of Swedish Lapland with northern lights and winter activities',
    price: '$1,299',
    image: require('../assets/img/start5.png'),
    itinerary: [
      {
        day: 1,
        activities: [
          { time: '10:00', activity: 'Ice Hotel Visit', location: 'Jukkasjärvi' },
          { time: '13:00', activity: 'Traditional Sami Lunch', location: 'Reindeer Camp' },
          { time: '15:00', activity: 'Dog Sledding Tour', location: 'Kiruna Outskirts' },
          { time: '20:00', activity: 'Northern Lights Hunt', location: 'Abisko National Park' }
        ]
      },
      // Days 2-4 would follow similar pattern
    ]
  }
];

// Duration options for filtering
const durationOptions = [
  { id: 'all', label: 'All' },
  { id: '3', label: '3 Days' },
  { id: '4', label: '4 Days' },
  { id: '5', label: '5 Days' },
  { id: '7', label: 'Week+' }
];

const ExploreScreen: React.FC<ExploreScreenProps> = ({ navigation }) => {
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const [selectedDuration, setSelectedDuration] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const searchInputRef = useRef<TextInput>(null);

   // Filter travel plans based on selected city and duration
   const filteredTravelPlans = travelPlansData.filter(plan => {
    const matchesCity = selectedCity ? plan.cityId === selectedCity : true;
    const matchesDuration = selectedDuration === 'all' ? true : 
                           (selectedDuration === '7' ? plan.days >= 7 : plan.days.toString() === selectedDuration);
    const matchesSearch = plan.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          plan.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesDuration && (searchQuery === '' || matchesSearch);
  });

  const handleCityPress = (cityId: string) => {
    setSelectedCity(cityId === selectedCity ? null : cityId);
    // Dismiss keyboard if it's open
    Keyboard.dismiss();
  };

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  const focusSearch = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // New function to generate itinerary summary text
  const generateItinerarySummary = (plan: TravelPlan) => {
    let summary = `${plan.title}\n\n`;
    
    plan.itinerary.forEach(day => {
      summary += `DAY ${day.day}:\n`;
      day.activities.forEach(activity => {
        summary += `• ${activity.time}: ${activity.activity} at ${activity.location}\n`;
      });
      summary += '\n';
    });
    
    return summary;
  };

  const handleTravelPlanPress = (planId: string) => {
    // Find the selected plan
    const selectedPlan = travelPlansData.find(plan => plan.id === planId);
    
    if (selectedPlan) {
      // Generate summary for the alert
      const itinerarySummary = generateItinerarySummary(selectedPlan);
      
      // Show alert with itinerary details
      Alert.alert(
        `${selectedPlan.title} - Itinerary`,
        itinerarySummary,
        [
          { 
            text: "View Details", 
            onPress: () => navigation.navigate('TravelPlanDetail', { planId }) 
          },
          { 
            text: "Close" 
          }
        ],
        { cancelable: true }
      );
    } else {
      // Navigate to travel plan detail screen as fallback
      navigation.navigate('TravelPlanDetail', { planId });
    }
  };

  const handleBookNow = (planId: string) => {
    // Navigate to booking screen
    navigation.navigate('Booking', { planId });
  };

  const renderCityItem = ({ item }: { item: City }) => (
    <TouchableOpacity 
      style={[styles.cityCard, selectedCity === item.id && styles.selectedCityCard]}
      onPress={() => handleCityPress(item.id)}
    >
      <Image source={item.image} style={styles.cityImage} />
      <View style={styles.cityInfoOverlay}>
        <Text style={styles.cityName}>{item.name}</Text>
        <View style={styles.cityRatingContainer}>
          <Icon name="star" size={12} color="#FFD700" />
          <Text style={styles.cityRatingText}>{item.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderTravelPlanItem = ({ item }: { item: TravelPlan }) => (
    <TouchableOpacity 
      style={styles.travelPlanCard}
      onPress={() => handleTravelPlanPress(item.id)}
    >
      <Image source={item.image} style={styles.travelPlanImage} />
      <View style={styles.travelPlanOverlay}>
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{item.days}D{item.days-1}N</Text>
        </View>
      </View>
      <View style={styles.travelPlanContent}>
        <Text style={styles.travelPlanTitle}>{item.title}</Text>
        <Text style={styles.travelPlanDescription} numberOfLines={2}>{item.description}</Text>
        <View style={styles.travelPlanFooter}>
          <Text style={styles.travelPlanPrice}>{item.price}</Text>
          <TouchableOpacity 
            style={styles.bookButton}
            onPress={() => handleBookNow(item.id)}
          >
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Component for the Explore screen content
  const ExploreContent = () => (
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
        <Text style={styles.headerTitle}>Explore</Text>
        <View style={styles.rightPlaceholder} />
      </View>
      
    
       {/* Search Bar - Modified this section */}
       <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          ref={searchInputRef}
          style={styles.searchInput}
          placeholder="Search destinations, activities..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={handleSearchChange}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
          onSubmitEditing={() => Keyboard.dismiss()}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => setSearchQuery('')}
          >
            <Icon name="times-circle" size={16} color="#999" />
          </TouchableOpacity>
        )}
      </View>
        {/* Cities Horizontal Scroll */}
        <ScrollView 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Cities Horizontal Scroll */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Discover Sweden</Text>
          <FlatList
            data={citiesData}
            renderItem={renderCityItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.citiesList}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      {/* Duration Filter */}
      <View style={styles.durationFilterContainer}>
          <Text style={styles.filterLabel}>Duration:</Text>
          <View style={styles.durationOptions}>
            {durationOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.durationOption,
                  selectedDuration === option.id && styles.selectedDurationOption
                ]}
                onPress={() => setSelectedDuration(option.id)}
              >
                <Text 
                  style={[
                    styles.durationOptionText,
                    selectedDuration === option.id && styles.selectedDurationOptionText
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Travel Plans */}
        <View style={styles.travelPlansContainer}>
          <Text style={styles.sectionTitle}>
            {selectedCity 
              ? `Trips in ${citiesData.find(city => city.id === selectedCity)?.name}`
              : 'Popular Trips'
            }
          </Text>
          {filteredTravelPlans.length > 0 ? (
            filteredTravelPlans.map(plan => (
              <View key={plan.id} style={styles.travelPlanWrapper}>
                {renderTravelPlanItem({ item: plan })}
              </View>
            ))
          ) : (
            <View style={styles.noResultsContainer}>
              <Icon name="search" size={40} color="#CCC" />
              <Text style={styles.noResultsText}>No travel plans match your criteria</Text>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={() => {
                  setSelectedCity(null);
                  setSelectedDuration('all');
                  setSearchQuery('');
                }}
              >
                <Text style={styles.resetButtonText}>Reset Filters</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );


  // Wrap with drawer navigator
  return (
    <DrawerNavigator navigation={navigation} handleLogout={() => {}}>
      <ExploreContent />
    </DrawerNavigator>
  );
};

export default ExploreScreen;