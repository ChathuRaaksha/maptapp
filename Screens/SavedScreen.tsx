import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  FlatList, 
  StatusBar,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../Styles/SavedStyles';

// Define the filter categories with appropriate icons
const filterCategories = [
  { id: '1', name: 'Food & Drink', icon: 'cutlery', isActive: true },
  { id: '2', name: 'Culture & Heritage', icon: 'university', isActive: false },
  { id: '3', name: 'Nature & Adventure', icon: 'tree', isActive: false },
  { id: '4', name: 'Art & Creativity', icon: 'paint-brush', isActive: false },
  { id: '5', name: 'Wellness & Relaxation', icon: 'heart', isActive: false },
  { id: '6', name: 'Sustainable Travel', icon: 'leaf', isActive: false },
  { id: '7', name: 'Urban Exploration', icon: 'building', isActive: false },
  { id: '8', name: 'Community & Social', icon: 'users', isActive: false },
];

// Define category types for items
type CategoryType = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';

// Define the saved items data structure
interface SavedItem {
  id: string;
  title: string;
  image: any;
  matchPercentage: number;
  distance: string;
  status: string;
  liked: boolean;
  categoryId: CategoryType;
}

// Function to get emojis based on percentage
const getEmojisForPercentage = (percentage: number): string[] => {
  if (percentage >= 90) return ['😍', '🤩'];
  if (percentage >= 80) return ['😊', '👌'];
  if (percentage >= 70) return ['😀', '👍'];
  if (percentage >= 60) return ['🙂', '👍'];
  if (percentage >= 50) return ['😐', '👀'];
  if (percentage >= 40) return ['😕', '🤔'];
  if (percentage >= 30) return ['😬', '⚠️'];
  if (percentage >= 20) return ['😥', '👎'];
  return ['😖', '👎'];
};

// Enhanced sample data for Food & Drink category with 10+ items using Picsum Photos API
const generateFoodDrinkItems = (): SavedItem[] => {
  const foodDrinkItems: SavedItem[] = [];
  const foodNames = [
    'Artisan Bistro', 'Culinary Corner', 'Flavor Fusion', 
    'Gastronomic Delights', 'Harbor Kitchen', 'Island Cuisine',
    'Juicy Joint', 'Kitchen Connect', 'Luscious Eats', 
    'Mediterranean Munch', 'Nordic Nibbles', 'Ocean Palate'
  ];
  
  for (let i = 0; i < 12; i++) {
    const randomPercentage = Math.floor(Math.random() * 40) + 60; // Generate percentages between 60-99
    const randomDistance = (Math.random() * 3 + 0.2).toFixed(1);
    
    foodDrinkItems.push({
      id: `1-${i + 1}`,
      title: foodNames[i],
      // Using Picsum Photos API for random food-related images (seed ensures consistent images)
      image: { uri: `https://picsum.photos/seed/food${i}/300/200` },
      matchPercentage: randomPercentage,
      distance: `${randomDistance}km`,
      status: Math.random() > 0.2 ? 'Open' : 'Closed',
      liked: true,
      categoryId: '1'
    });
  }
  return foodDrinkItems;
};

// Generate sample data for all other categories
const generateOtherCategoryItems = (): SavedItem[] => {
  const otherCategoryItems: SavedItem[] = [];
  const categoryNames: Record<CategoryType, string[]> = {
    '1': ['Artisan Bistro', 'Culinary Corner', 'Flavor Fusion', 'Gastronomic Delights', 'Harbor Kitchen', 'Island Cuisine',
          'Juicy Joint', 'Kitchen Connect', 'Luscious Eats', 'Mediterranean Munch'],
    '2': ['Historical Museum', 'Ancient Temple', 'Cultural Center', 'Heritage Site', 'Folk Village', 'Royal Palace', 'Archaeological Ruins', 'Indigenous Center', 'History Exhibition', 'Cultural Festival'],
    '3': ['Mountain Trek', 'Forest Trail', 'Canyon Adventure', 'Lake Expedition', 'Wildlife Safari', 'Volcanic Hike', 'Ocean Dive', 'Cave Exploration', 'Desert Journey', 'River Rafting'],
    '4': ['Art Gallery', 'Pottery Studio', 'Sculpture Garden', 'Photography Workshop', 'Painting Class', 'Design Museum', 'Craft Market', 'Theater Performance', 'Music Venue', 'Digital Art Space'],
    '5': ['Spa Resort', 'Yoga Retreat', 'Hot Springs', 'Meditation Center', 'Wellness Clinic', 'Thermal Baths', 'Massage Therapy', 'Fitness Center', 'Health Retreat', 'Relaxation Garden'],
    '6': ['Eco Lodge', 'Organic Farm', 'Green Energy Tour', 'Conservation Project', 'Sustainable Village', 'Zero-Waste Café', 'Renewable Tech Center', 'Recycling Workshop', 'Permaculture Garden', 'Green Transport Tour'],
    '7': ['City Skyscraper', 'Historic Downtown', 'Underground Tour', 'Modern Architecture', 'Urban Park', 'City Viewpoint', 'Street Art Tour', 'Night Cityscape', 'Metropolitan Museum', 'Urban Market'],
    '8': ['Community Center', 'Social Enterprise', 'Local Workshop', 'Volunteer Project', 'Neighborhood Festival', 'Cultural Exchange', 'Community Garden', 'Local Cooking Class', 'Traditional Crafts', 'Community Theater']
  };
  
  for (let i = 2; i <= 8; i++) {
    const categoryId = i.toString() as CategoryType;
    for (let j = 0; j < 10; j++) {
      const randomPercentage = Math.floor(Math.random() * 60) + 40; // Generate percentages between 40-99
      const randomDistance = (Math.random() * 4 + 0.1).toFixed(1);
      
      otherCategoryItems.push({
        id: `${categoryId}-${j + 1}`,
        title: categoryNames[categoryId][j],
        image: { uri: `https://picsum.photos/seed/cat${i}item${j}/300/200` },
        matchPercentage: randomPercentage,
        distance: `${randomDistance}km`,
        status: Math.random() > 0.3 ? 'Open' : 'Closed',
        liked: true,
        categoryId: categoryId
      });
    }
  }
  return otherCategoryItems;
};

// Combine all sample data
const savedItems: SavedItem[] = [...generateFoodDrinkItems(), ...generateOtherCategoryItems()];

// Props interface for the SavedScreen component
interface SavedScreenProps {
  navigation: any;
}

const SavedScreen: React.FC<SavedScreenProps> = ({ navigation }) => {
  const [activeCategory, setActiveCategory] = useState('1');
  const [savedData, setSavedData] = useState<SavedItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Filter data based on active category
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (activeCategory === 'all') {
        setSavedData(savedItems);
      } else {
        const filteredData = savedItems.filter(item => item.categoryId === activeCategory);
        setSavedData(filteredData);
      }
      setLoading(false);
    }, 500); // Simulate loading delay
  }, [activeCategory]);

  // Handle category selection
  const handleCategoryPress = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  // Get color based on percentage value
  const getColorBasedOnPercentage = (percentage: number): string => {
    if (percentage >= 90) return '#8B5CF6'; // Purple for high match
    if (percentage >= 80) return '#7C3AED'; // Deep purple for high match
    if (percentage >= 70) return '#06B6D4'; // Cyan for medium-high match
    if (percentage >= 60) return '#10B981'; // Green for medium match
    if (percentage >= 50) return '#34D399'; // Light green for medium match
    if (percentage >= 40) return '#F59E0B'; // Amber for medium-low match
    if (percentage >= 30) return '#F97316'; // Orange for low match
    if (percentage >= 20) return '#EF4444'; // Red for very low match
    return '#DC2626'; // Dark red for poor match
  };

  // Create circular progress indicator (without percentage text inside)
  const createCircularProgress = (percentage: number) => {
    return (
      <View style={styles.circularProgressContainer}>
        {/* Background circle */}
        <View style={styles.progressCircleBackground} />
        
        {/* Foreground circle with percentage */}
        <View 
          style={[
            styles.progressCircleFill, 
            { 
              borderColor: getColorBasedOnPercentage(percentage),
              borderTopColor: 'transparent',
              transform: [
                { rotateZ: `-${90 - (percentage * 3.6)}deg` }
              ] 
            }
          ]} 
        />
        
        {/* If percentage is over 50%, add the other half of the circle */}
        {percentage > 50 && (
          <View 
            style={[
              styles.progressCircleFill, 
              { 
                borderColor: getColorBasedOnPercentage(percentage),
                borderTopColor: 'transparent',
                borderRightColor: 'transparent',
                transform: [
                  { rotateZ: '-90deg' }
                ] 
              }
            ]} 
          />
        )}
        
        {/* White inner circle to create donut effect */}
        <View style={styles.progressCircleInner} />
      </View>
    );
  };

  // Render each saved item
  const renderSavedItem = ({ item }: { item: SavedItem }) => {
    const emojis = getEmojisForPercentage(item.matchPercentage);
    
    return (
      <TouchableOpacity 
        style={styles.savedItemCard}
        onPress={() => navigation.navigate('RestaurantDetail', { itemId: item.id })}
      >
        <Image 
          source={item.image} 
          style={styles.savedItemImage} 
          defaultSource={require('../assets/img/placeholder.png')}
        />
        
        {/* Emojis on left side of image */}
        <View style={styles.emojisContainerLeft}>
          <Text style={styles.emojiText}>{emojis[0]}</Text>
          <Text style={styles.emojiText}>{emojis[1]}</Text>
        </View>
        
        {/* Match indicator container with separate progress circle and percentage */}
        <View style={styles.matchIndicatorContainer}>
          {/* Circular progress */}
          {createCircularProgress(item.matchPercentage)}
          
          {/* Percentage text next to circle */}
          <Text style={styles.percentageTextSeparate}>
            {item.matchPercentage}%
          </Text>
        </View>
        
        {/* Item information */}
        <View style={styles.savedItemInfo}>
          <Text style={styles.savedItemTitle}>{item.title}</Text>
          <View style={styles.distanceContainer}>
            <Text style={styles.distanceText}>{item.distance}</Text>
            <Text style={[
              styles.statusText, 
              { color: item.status === 'Open' ? '#4CAF50' : '#F97316' }
            ]}>
              {item.status}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Render filter category buttons
  const renderFilterCategory = ({ item }: { item: { id: string, name: string, icon: string, isActive: boolean } }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        activeCategory === item.id && styles.activeCategoryButton
      ]}
      onPress={() => handleCategoryPress(item.id)}
    >
      <Icon 
        name={item.icon} 
        size={18} 
        color={activeCategory === item.id ? '#FFFFFF' : '#00798C'} 
        style={styles.categoryIcon}
      />
      <Text 
        style={[
          styles.categoryText,
          activeCategory === item.id && styles.activeCategoryText
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-left" size={24} color="#00798C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Saved</Text>
        <View style={styles.emptyRightSpace} />
      </View>

      {/* Bookmark Icon */}
      <View style={styles.bookmarkContainer}>
        <View style={styles.bookmarkIcon}>
          <Icon name="bookmark" size={48} color="#00798C" />
        </View>
      </View>

      {/* Filter Categories */}
      <View style={styles.categoriesContainer}>
        <FlatList
          data={filterCategories}
          renderItem={renderFilterCategory}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Loading Indicator */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00798C" />
        </View>
      )}

      {/* Saved Items List */}
      {!loading && (
        <FlatList
          data={savedData}
          renderItem={renderSavedItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.savedItemsGrid}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Icon name="inbox" size={48} color="#CCCCCC" />
              <Text style={styles.emptyText}>No saved items in this category</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default SavedScreen;