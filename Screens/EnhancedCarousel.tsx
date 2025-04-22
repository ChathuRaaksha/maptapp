import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  FlatList,
  ImageSourcePropType,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.8;
const ITEM_HEIGHT = ITEM_WIDTH * 0.8;
const SPACING = 10;

// Define the type for carousel items
interface CarouselItem {
  id: string;
  title: string;
  image: ImageSourcePropType;
  rating: number;
  eta: string;
  distance: string;
  tags: string[];
}

// Define props for the component
interface EnhancedCarouselProps {
  data: CarouselItem[];
  onSelectItem: (item: CarouselItem) => void;
}

const EnhancedCarousel: React.FC<EnhancedCarouselProps> = ({ data, onSelectItem }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const scrollX = useRef<Animated.Value>(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList<CarouselItem>>(null);

  // Auto scroll functionality
  useEffect(() => {
    const autoScrollTimer = setInterval(() => {
      if (activeIndex < data.length - 1) {
        flatListRef.current?.scrollToIndex({
          index: activeIndex + 1,
          animated: true,
        });
      } else {
        flatListRef.current?.scrollToIndex({
          index: 0,
          animated: true,
        });
      }
    }, 5000); // Auto scroll every 5 seconds

    return () => clearInterval(autoScrollTimer);
  }, [activeIndex, data.length]);

  const renderItem = ({ item, index }: { item: CarouselItem; index: number }) => {
    // Animation values for scaling and opacity
    const inputRange = [
      (index - 1) * ITEM_WIDTH,
      index * ITEM_WIDTH,
      (index + 1) * ITEM_WIDTH,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp',
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.5, 1, 0.5],
      extrapolate: 'clamp',
    });

    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [20, 0, 20],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity 
        onPress={() => onSelectItem(item)}
        activeOpacity={0.9}
      >
        <Animated.View
          style={{
            width: ITEM_WIDTH,
            height: ITEM_HEIGHT,
            marginHorizontal: SPACING,
            alignItems: 'center',
            transform: [{ scale }, { translateY }],
            opacity,
          }}
        >
          <View
            style={{
              width: '90%',
              height: '109%',
              borderRadius: 15,
              overflow: 'hidden',
              backgroundColor: '#FFF',
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 0.3,
              shadowRadius: 5,
              elevation: 8,
            }}
          >
            {/* Background teal color similar to the image */}
            <View style={{ 
              position: 'absolute', 
              width: '100%', 
              height: '100%', 
              backgroundColor: '#FFF',
              borderRadius: 15 
            }} />
            
            {/* Restaurant image */}
            <Image 
              source={item.image} 
              style={{
                width: '100%',
                height: '50%',
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
              }} 
              resizeMode="cover"
            />
            
            {/* Content */}
            <View style={{ padding: 15 }}>
              <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#164352', marginBottom: 10 }}>
                {item.title}
              </Text>
              
              {/* Match percentage */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                <View style={{ 
                  width: 24, 
                  height: 24, 
                  borderRadius: 12, 
                  backgroundColor: '#FFF', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  marginRight: 8
                }}>
                  <Text style={{ color: '#000' }}>😊</Text>
                </View>
                <Text style={{ color: '#164352', fontWeight: '600' }}>
                  {Math.floor(Math.random() * 20 + 80)}%
                </Text>
                
                {/* People icons */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
                  <View style={{ 
                    paddingHorizontal: 12, 
                    paddingVertical: 6, 
                    backgroundColor: 'rgba(255,255,255,0.5)',
                    borderRadius: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginRight: 8
                  }}>
                    <Text style={{ marginRight: 4 }}>😀</Text>
                    <Text style={{ fontWeight: '600' }}>{Math.floor(Math.random() * 150 + 50)}</Text>
                    <Icon name="user" size={12} color="#164352" style={{ marginLeft: 4 }} />
                  </View>
                  
                  <View style={{ 
                    paddingHorizontal: 12, 
                    paddingVertical: 6, 
                    backgroundColor: 'rgba(255,255,255,0.5)',
                    borderRadius: 20,
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                    <Text style={{ marginRight: 4 }}>😐</Text>
                    <Text style={{ fontWeight: '600' }}>{Math.floor(Math.random() * 20 + 10)}</Text>
                  </View>
                </View>
              </View>
              
              {/* Opening time */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <Icon name="clock-o" size={18} color="#164352" style={{ marginRight: 8 }} />
                <Text style={{ color: '#164352', fontWeight: '500' }}>
                  Open until {item.eta}
                </Text>
              </View>
              
              {/* Distance */}
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="map-marker" size={18} color="#164352" style={{ marginRight: 8 }} />
                <Text style={{ color: '#164352', fontWeight: '500' }}>
                  {item.distance}
                </Text>
              </View>
            </View>
            
            {/* Bookmark icon */}
            <TouchableOpacity 
              style={{ 
                position: 'absolute', 
                top: 10, 
                right: 10,
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: 'rgba(255,255,255,0.7)',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Icon name="bookmark-o" size={20} color="#164352" />
            </TouchableOpacity>
            
            {/* Food icon */}
            <View 
              style={{ 
                position: 'absolute', 
                top: 10, 
                left: 10,
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#164352',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Icon name="cutlery" size={18} color="#FFF" />
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Animated.FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: 20,
          paddingHorizontal: width * 0.1 - SPACING,
        }}
        snapToInterval={ITEM_WIDTH + 2 * SPACING}
        decelerationRate="fast"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        onMomentumScrollEnd={(event: NativeSyntheticEvent<NativeScrollEvent>) => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x / (ITEM_WIDTH + 2 * SPACING)
          );
          setActiveIndex(index);
        }}
        renderItem={renderItem}
      />
      
      {/* Pagination dots */}
      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'center',
        marginTop: 10 
      }}>
        {data.map((_, i: number) => {
          const opacity = scrollX.interpolate({
            inputRange: [
              (i - 0.5) * ITEM_WIDTH,
              i * ITEM_WIDTH,
              (i + 0.5) * ITEM_WIDTH,
            ],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          
          const scale = scrollX.interpolate({
            inputRange: [
              (i - 0.5) * ITEM_WIDTH,
              i * ITEM_WIDTH,
              (i + 0.5) * ITEM_WIDTH,
            ],
            outputRange: [0.8, 1.2, 0.8],
            extrapolate: 'clamp',
          });
          
          return (
            <Animated.View
              key={`dot-${i}`}
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: '#00798C',
                margin: 5,
                opacity,
                transform: [{ scale }],
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

export default EnhancedCarousel;