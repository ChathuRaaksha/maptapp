import { ImageSourcePropType } from "react-native";

// Type definitions for navigation
export type RootStackParamList = {
  Home: undefined;
  RestaurantDetail: { itemId: string };
  ARCamera: undefined;
  Map: undefined;
  Account: undefined;
  Login: undefined;
};

// Types for restaurant data
export interface RestaurantData {
    id: string;
    title: string;
    verified: boolean;
    address: string;
    openUntil: string;
    weekdayHours: string;
    weekendHours: string;
    matchPercentage: number;
    description: string;
    phoneNumber: string; // Add this property
    coordinates: { // Add this property
      latitude: number;
      longitude: number;
    };
    websiteUrl?: string;
  }

// Types for carousel items in home screen
export interface CarouselItem {
  id: string;
  title: string;
  image: ImageSourcePropType;
  rating: number;
  eta: string;
  distance: string;
  tags: string[];
}

// Types for image slider in detail screen
export interface ImageSliderItem {
  id: string;
  image: ImageSourcePropType;
}

// Types for review items
export interface ReviewItem {
  id: string;
  name: string;
  date: string;
  text: string;
  avatar: ImageSourcePropType;
}

// Types for emoji counts
export interface EmojiCount {
  emoji: string;
  count: number;
}

// Types for destination items
export interface DestinationItem {
  id: string;
  name: string;
  location: string;
  image: ImageSourcePropType;
  rating: number;
  price: string;
  duration: string;
}

// Types for hotel items
export interface HotelItem {
  id: string;
  name: string;
  location: string;
  image: ImageSourcePropType;
  stars: string;
}

// Types for navigation options
export interface NavigationOption {
  id: string;
  name: string;
  icon: string;
}