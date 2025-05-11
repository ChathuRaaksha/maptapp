// MapScreen.tsx

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import MapView, { Marker, UrlTile, Region } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Asset } from 'expo-asset'; 
const TEAL = "#00798C";

interface MarkerType {
  title: string;
  description: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
}

interface SearchResultType {
  lat: string;
  lon: string;
  display_name: string;
}

const allMarkers: MarkerType[] = [
  {
    title: "Gamla Stan",
    description: "Gamla Stan is Stockholm's charming Old Town filled with cobblestone streets and colorful buildings.",
    coordinate: { latitude: 59.3251, longitude: 18.0708 },
  },
  {
    title: "Vasa Museum",
    description: "The Vasa Museum houses the only almost fully intact 17th-century ship that has ever been salvaged.",
    coordinate: { latitude: 59.3275, longitude: 18.0915 },
  },
  {
    title: "Skansen",
    description: "Skansen is the world's oldest open-air museum, featuring historic buildings and Nordic animals.",
    coordinate: { latitude: 59.3256, longitude: 18.1036 },
  },
  {
    title: "Fotografiska",
    description: "A contemporary photography museum with exhibitions, a bistro, and a rooftop view.",
    coordinate: { latitude: 59.3176, longitude: 18.0847 },
  },
  {
    title: "Grand Hôtel",
    description: "Luxury hotel by the water with views of the Royal Palace and Gamla Stan.",
    coordinate: { latitude: 59.3293, longitude: 18.0723 },
  },
  {
    title: "Smorgastarteriet",
    description: "Popular restaurant offering innovative takes on traditional Swedish cuisine.",
    coordinate: { latitude: 59.3122, longitude: 18.0792 },
  },
  {
    title: "ABBA The Museum",
    description: "Interactive museum showcasing the story of ABBA, Sweden’s pop music legends.",
    coordinate: { latitude: 59.3253, longitude: 18.0912 },
  },
];

const defaultMarkers: MarkerType[] = [allMarkers[0], allMarkers[1], allMarkers[2]];
const savedMarkers: MarkerType[] = [allMarkers[0], allMarkers[4]];
const forYouMarkers: MarkerType[] = [allMarkers[2], allMarkers[3], allMarkers[5], allMarkers[6]];

const MapScreen: React.FC = () => {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMarkers, setFilteredMarkers] = useState<MarkerType[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResultType[]>([]);
  const [region, setRegion] = useState<Region>({
    latitude: 59.3251,
    longitude: 18.0708,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [selectedMarker, setSelectedMarker] = useState<MarkerType | null>(null);
  const [newMarkerTitle, setNewMarkerTitle] = useState("");
  const [newMarkerDescription, setNewMarkerDescription] = useState("");
  const [newMarkerCoordinate, setNewMarkerCoordinate] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const navigation = useNavigation();
  const [mapStyle, setMapStyle] = useState("streets");

  const mapStyles = [
    { label: "Hybrid", value: "hybrid" },
    { label: "Streets", value: "streets" },
    { label: "Satellite", value: "satellite" },
    { label: "Dark", value: "darkmatter" },
    { label: "Topographic", value: "topo" },
  ];
  const [logoUri, setLogoUri] = useState<string | null>(null); // State for storing the logo URI

  useEffect(() => {
    const loadImage = async () => {
      const asset = Asset.fromModule(require('../assets/img/logonew2.png')); // Path to the image
      await asset.downloadAsync(); // Ensure the image is cached
      setLogoUri(asset.uri); // Set the URI after it's loaded
      console.log('Loaded logo URI:', asset.uri); // Log the URI to check if it's correct
    };
  
    loadImage();
  }, []);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.warn("Permission to access location was denied");
        setLoading(false);
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
      setFilteredMarkers(defaultMarkers);
      setLoading(false);
    })();
  }, []);

  const handleSearch = async (text: string) => {
    setSearchQuery(text);

    if (text.trim() === "") {
      setSearchResults([]);
      setFilteredMarkers(defaultMarkers);
      return;
    }

    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: {
          q: text,
          format: "json",
          addressdetails: 1,
          limit: 5,
        },
      });

      const results = response.data;
      setSearchResults(results);
      setFilteredMarkers(
        results.map((result: any) => ({
          title: result.display_name,
          description: "Description not available",
          coordinate: {
            latitude: parseFloat(result.lat),
            longitude: parseFloat(result.lon),
          },
        }))
      );
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleMarkerPress = (marker: MarkerType) => {
    setSelectedMarker(marker);
  };

  const handleZoomIn = () => {
    setRegion((prev) => ({
      ...prev,
      latitudeDelta: prev.latitudeDelta * 0.8,
      longitudeDelta: prev.longitudeDelta * 0.8,
    }));
  };

  const handleZoomOut = () => {
    setRegion((prev) => ({
      ...prev,
      latitudeDelta: prev.latitudeDelta / 0.8,
      longitudeDelta: prev.longitudeDelta / 0.8,
    }));
  };

  const handleLocateMe = () => {
    if (location) {
      setRegion((prev) => ({
        ...prev,
        latitude: location.latitude,
        longitude: location.longitude,
      }));
    }
  };

  const handleAddMarker = (coordinate: any) => {
    setNewMarkerCoordinate(coordinate);
  };

  const handleSaveMarker = () => {
    if (
      newMarkerTitle.trim() &&
      newMarkerDescription.trim() &&
      newMarkerCoordinate
    ) {
      const newMarker: MarkerType = {
        title: newMarkerTitle,
        description: newMarkerDescription,
        coordinate: newMarkerCoordinate,
      };
      setFilteredMarkers((prevMarkers) => [...prevMarkers, newMarker]);
      setNewMarkerTitle("");
      setNewMarkerDescription("");
      setNewMarkerCoordinate(null);
    } else {
      alert("Please provide both title and description for the marker.");
    }
  };

  const handleResetNorth = () => {
    setRegion((prev) => ({
      ...prev,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    }));
  };

  if (loading || !location) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={TEAL} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
        <Image source={require('../assets/img/logonew2.png')} style={styles.logo} />
      </TouchableOpacity>
     
      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a place..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Map Style Switcher */}
      <View style={styles.styleSwitcher}>
        {mapStyles.map((style) => (
          <TouchableOpacity
            key={style.value}
            onPress={() => setMapStyle(style.value)}
            style={[
              styles.styleButton,
              mapStyle === style.value && styles.activeStyleButton,
            ]}
          >
            <Text
              style={[
                styles.styleButtonText,
                mapStyle === style.value && styles.activeStyleButtonText,
              ]}
            >
              {style.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Filter Buttons */}
      <View style={styles.buttonContainer}>
  <TouchableOpacity
    style={styles.filterButton}
    onPress={() => setFilteredMarkers(forYouMarkers)}
  >
    <Text>For You</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.filterButton}
    onPress={() => setFilteredMarkers(savedMarkers)}
  >
    <Text>Saved</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.filterButton}
    onPress={() => setFilteredMarkers(allMarkers)}
  >
    <Text>All Filters</Text>
  </TouchableOpacity>
</View>


      {/* Selected Marker Info */}
      {selectedMarker && (
        <View style={styles.selectedMarkerDescription}>
          <Text style={styles.markerTitle}>{selectedMarker.title}</Text>
          <Text>{selectedMarker.description}</Text>
        </View>
      )}

      {/* Add Marker Inputs */}
      {newMarkerCoordinate && (
        <View style={styles.inlineInputContainer}>
          <TextInput
            style={styles.inlineInput}
            placeholder="Place name"
            value={newMarkerTitle}
            onChangeText={setNewMarkerTitle}
          />
          <TextInput
            style={styles.inlineInput}
            placeholder="Description"
            value={newMarkerDescription}
            onChangeText={setNewMarkerDescription}
          />
          <View style={styles.inlineButtons}>
            <TouchableOpacity onPress={handleSaveMarker} style={styles.inlineButton}>
              <Text style={styles.inlineButtonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setNewMarkerCoordinate(null);
                setNewMarkerTitle("");
                setNewMarkerDescription("");
              }}
              style={[styles.inlineButton, { backgroundColor: "gray" }]}
            >
              <Text style={styles.inlineButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Map View */}
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
        showsUserLocation
        showsCompass
        onLongPress={(e) => handleAddMarker(e.nativeEvent.coordinate)}
      >
        <UrlTile
          urlTemplate={`https://api.maptiler.com/maps/${mapStyle}/{z}/{x}/{y}${
            mapStyle === "satellite" ? ".jpg" : ".png"
          }?key=1FNNa7rUrq0p4L95U4Hp`}
          maximumZ={20}
          flipY={false}
        />
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="You are here"
          description="Your current location"
        />
        {filteredMarkers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
            onPress={() => handleMarkerPress(marker)}
          />
        ))}
      </MapView>

      {/* Zoom + Compass + Locate */}
      <View style={styles.zoomControls}>
        <TouchableOpacity style={styles.zoomButton} onPress={handleZoomIn}>
          <Text style={styles.zoomText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.zoomButton} onPress={handleZoomOut}>
          <Text style={styles.zoomText}>-</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.locateButton} onPress={handleLocateMe}>
        <Ionicons name="location" size={30} color={TEAL} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.compassButton} onPress={handleResetNorth}>
        <Ionicons name="compass" size={30} color={TEAL} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { height: "100%", width: "100%" },
  map: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  loadingContainer: {
    flex: 1, justifyContent: "center", alignItems: "center",
  },
  backButton: {
    position: "absolute", top: 40, left: 20, zIndex: 10,
    backgroundColor: "#fff", borderRadius: 20, padding: 5,
  },
  searchInput: {
    position: "absolute", top: 90, left: 10, right: 10, zIndex: 10,
    backgroundColor: "#fff", padding: 10, borderRadius: 10,
  },
  logo: {
    width: 50,  // Try increasing the width
    height:40, // Try increasing the height
    position: "absolute",
    top: 5,
    right: -350,
  },
  styleSwitcher: {
    position: "absolute", top: 140, left: 10, right: 10, zIndex: 11,
    flexDirection: "row", flexWrap: "wrap", justifyContent: "center",
  },
  styleButton: {
    backgroundColor: "#fff", paddingVertical: 6, paddingHorizontal: 10,
    borderRadius: 10, marginVertical: 4, marginHorizontal: 4,
  },
  activeStyleButton: {
    backgroundColor: TEAL,
  },
  styleButtonText: {
    fontSize: 12, color: "#000",
  },
  activeStyleButtonText: {
    color: "#fff", fontWeight: "bold",
  },
  buttonContainer: {
    position: "absolute", top: 190, left: 10, right: 10, zIndex: 10,
    flexDirection: "row", justifyContent: "space-around",
  },
  filterButton: {
    backgroundColor: "#fff", padding: 8, borderRadius: 20,
  },
  selectedMarkerDescription: {
    position: "absolute", bottom: 90, left: 20, right: 20, zIndex: 11,
    backgroundColor: "#fff", padding: 10, borderRadius: 10,
  },
  markerTitle: {
    fontWeight: "bold", fontSize: 16,
  },
  zoomControls: {
    position: "absolute", right: 20, bottom: 180, zIndex: 10,
  },
  zoomButton: {
    backgroundColor: "#fff", padding: 10, marginBottom: 5, borderRadius: 10,
  },
  zoomText: {
    fontSize: 20,
  },
  locateButton: {
    position: "absolute", bottom: 100, right: 20, backgroundColor: "#fff",
    padding: 10, borderRadius: 20, zIndex: 10,
  },
  compassButton: {
    position: "absolute", top: 760, right: 20, backgroundColor: "#fff",
    padding: 10, borderRadius: 20, zIndex: 10,
  },
  inlineInputContainer: {
    position: "absolute", bottom: 20, left: 10, right: 10, zIndex: 15,
    backgroundColor: "#fff", padding: 15, borderRadius: 10,
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3, shadowRadius: 4, elevation: 5,
  },
  inlineInput: {
    borderBottomWidth: 1, borderBottomColor: "#ccc",
    marginBottom: 10, paddingVertical: 5, paddingHorizontal: 10,
  },
  inlineButtons: {
    flexDirection: "row", justifyContent: "space-between",
  },
  inlineButton: {
    flex: 1, marginHorizontal: 5, backgroundColor: TEAL,
    paddingVertical: 8, borderRadius: 6, alignItems: "center",
  },
  inlineButtonText: {
    color: "#fff", fontWeight: "bold",
  },
});

export default MapScreen;
