import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Alert,
  Platform,
  StatusBar,
  ActivityIndicator,
  Modal
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../Styles/AddPlaceStyles";

interface Country {
  name: string;
  flag: string;
}

interface AddPlaceScreenProps {
  navigation: any;
}

const AddPlaceScreen: React.FC<AddPlaceScreenProps> = ({ navigation }) => {
  // State management
  const [step, setStep] = useState(1);
  const [placeType, setPlaceType] = useState("Food & Drink");
  const [placeTypeDropdownVisible, setPlaceTypeDropdownVisible] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [countryDropdownVisible, setCountryDropdownVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [website, setWebsite] = useState("https://");
  const [openingHours, setOpeningHours] = useState<Array<{ day: string; from: string; to: string }>>([
    { day: "Mon", from: "09:00", to: "17:00" },
    { day: "Sun", from: "11:00", to: "20:00" },
  ]);
  const [photos, setPhotos] = useState<Array<{ uri: string }>>([]);
  const [loading, setLoading] = useState(false);
  
  // Place type options
  const placeTypes = [
    "Food & Drink",
    "Culture & Heritage",
    "Nature & Adventure",
    "Art & Creativity",
    "Wellness & Relaxation",
    "Hotels",
    "Sustainable Travel",
    "Urban Exploration",
    "Community & Social"
  ];
  
  // Country data fetching
  const [allCountries, setAllCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const countryList: Country[] = data.map((c: any) => ({
          name: c.name.common,
          flag: c.flag || "",
        }));
        setAllCountries(
          countryList.sort((a, b) => a.name.localeCompare(b.name))
        );
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    
    fetchCountries();
  }, []);
  
  // Methods for navigation between steps
  const goToNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };
  
  const goToPreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigation.goBack();
    }
  };
  
  // Methods for managing the form
  const addOpeningHoursRow = () => {
    setOpeningHours([...openingHours, { day: "Tue", from: "09:00", to: "17:00" }]);
  };
  
  const removeOpeningHoursRow = (index: number) => {
    const updatedHours = [...openingHours];
    updatedHours.splice(index, 1);
    setOpeningHours(updatedHours);
  };
  
  const updateOpeningHours = (index: number, field: 'day' | 'from' | 'to', value: string) => {
    const updatedHours = [...openingHours];
    updatedHours[index][field] = value;
    setOpeningHours(updatedHours);
  };
  
  const selectCountry = (selectedCountry: Country) => {
    setCountry(selectedCountry.name);
    setCountryDropdownVisible(false);
  };
  
  const selectPlaceType = (type: string) => {
    setPlaceType(type);
    setPlaceTypeDropdownVisible(false);
  };
  
  const handleAddPhoto = () => {
    // In a real app, you would use react-native-image-picker or expo-image-picker
    // For this example, we'll just add a placeholder
    const newPhotos = [...photos];
    if (newPhotos.length < 4) {
      newPhotos.push({ uri: `https://picsum.photos/500/300?random=${Math.random()}` });
      setPhotos(newPhotos);
    }
  };
  
  const removePhoto = (index: number) => {
    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    setPhotos(newPhotos);
  };
  
  const useCurrentLocation = () => {
    // In a real app, you would use Geolocation API
    setAddress("123 Current St");
    setCity("Current City");
    setPostalCode("12345");
    setCountry("Sweden");
  };
  
  const handleSubmit = () => {
    setLoading(true);
    
    // Create place data object
    const placeData = {
      type: placeType,
      name,
      address,
      city,
      postalCode,
      country,
      phoneNumber,
      website,
      openingHours,
      photos
    };
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep(4); // Move to thank you screen
    }, 1000);
  };
  
  // Render step indicators
  const renderStepIndicators = () => {
    return (
      <View style={styles.stepIndicatorsContainer}>
        {[1, 2, 3, 4].map((i) => (
          <View 
            key={i} 
            style={[
              styles.stepIndicator, 
              i <= step ? styles.activeStepIndicator : {}
            ]} 
          />
        ))}
      </View>
    );
  };
  
  // Get header title based on current step
  const getHeaderTitle = () => {
    switch (step) {
      case 1:
        return "General Information";
      case 2:
        return "Detailed Information";
      case 3:
        return "Upload Photos";
      case 4:
        return "Thank You";
      default:
        return "Adding a Place";
    }
  };

  // Get place type icon
  const getPlaceTypeIcon = (type: string) => {
    switch (type) {
      case "Food & Drink":
        return "cutlery";
      case "Culture & Heritage":
        return "university";
      case "Nature & Adventure":
        return "tree";
      case "Art & Creativity":
        return "paint-brush";
      case "Wellness & Relaxation":
        return "heart";
      case "Hotels":
        return "bed";
      case "Sustainable Travel":
        return "leaf";
      case "Urban Exploration":
        return "building";
      case "Community & Social":
        return "users";
      default:
        return "map-marker";
    }
  };

  // Step 1: General Information
  const renderStep1 = () => {
    return (
      <View style={styles.stepContent}>
        {renderStepIndicators()}
        
        <Text style={styles.label}>Type of Place</Text>
        <TouchableOpacity 
          style={styles.dropdown}
          onPress={() => setPlaceTypeDropdownVisible(true)}
        >
          <Icon 
            name={getPlaceTypeIcon(placeType)} 
            size={18} 
            color="#00798C" 
            style={styles.dropdownIcon} 
          />
          <Text style={styles.dropdownText}>{placeType}</Text>
          <Icon name="angle-down" size={18} color="#999" style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>
        
        {/* Place Type Dropdown Modal */}
        <Modal
          visible={placeTypeDropdownVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setPlaceTypeDropdownVisible(false)}
        >
          <TouchableOpacity 
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setPlaceTypeDropdownVisible(false)}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Place Type</Text>
              <FlatList
                data={placeTypes}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.placeTypeItem}
                    onPress={() => selectPlaceType(item)}
                  >
                    <Icon 
                      name={getPlaceTypeIcon(item)} 
                      size={20} 
                      color="#00798C" 
                      style={{ marginRight: 12 }}
                    />
                    <Text style={styles.placeTypeName}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>
        
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Place name"
          value={name}
          onChangeText={setName}
        />
        
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Full address"
          value={address}
          onChangeText={setAddress}
          multiline
        />
        
        <View style={styles.rowContainer}>
          <View style={[styles.columnContainer, { marginRight: 10 }]}>
            <Text style={styles.label}>City</Text>
            <TextInput
              style={styles.input}
              placeholder="City"
              value={city}
              onChangeText={setCity}
            />
          </View>
          
          <View style={styles.columnContainer}>
            <Text style={styles.label}>Postal Code</Text>
            <TextInput
              style={styles.input}
              placeholder="ZIP/Postal code"
              value={postalCode}
              onChangeText={setPostalCode}
              keyboardType="number-pad"
            />
          </View>
        </View>
        
        <Text style={styles.label}>Country</Text>
        <View style={{ position: "relative", width: "100%" }}>
          <TextInput
            style={styles.input}
            placeholder="Country"
            value={country}
            onChangeText={(text) => {
              setCountry(text);
              const filtered = allCountries.filter((c) =>
                c.name.toLowerCase().startsWith(text.toLowerCase())
              );
              setFilteredCountries(filtered);
              if (text.length > 0) {
                setCountryDropdownVisible(true);
              } else {
                setCountryDropdownVisible(false);
              }
            }}
            onFocus={() => {
              if (country.length > 0) {
                setCountryDropdownVisible(true);
              }
            }}
          />
          <Icon 
            name="angle-down" 
            size={18} 
            color="#999" 
            style={styles.countryDropdownIcon} 
          />
          
          {countryDropdownVisible && (
            <View style={styles.countryDropdown}>
              <FlatList
                data={filteredCountries.length > 0 ? filteredCountries : allCountries}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.countryItem}
                    onPress={() => selectCountry(item)}
                  >
                    <Text style={styles.countryFlag}>{item.flag}</Text>
                    <Text style={styles.countryName}>{item.name}</Text>
                  </TouchableOpacity>
                )}
                style={{ maxHeight: 150 }}
              />
            </View>
          )}
        </View>
        
        <TouchableOpacity style={styles.locationButton} onPress={useCurrentLocation}>
          <Icon name="map-marker" size={16} color="#FFFFFF" />
          <Text style={styles.locationButtonText}>Use Current Location</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  // Step 2: Detailed Information
  const renderStep2 = () => {
    return (
      <View style={styles.stepContent}>
        {renderStepIndicators()}
        
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="+46 00 000 0000"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
        
        <Text style={styles.label}>Website</Text>
        <TextInput
          style={styles.input}
          placeholder="https://"
          value={website}
          onChangeText={setWebsite}
          keyboardType="url"
        />
        
        <Text style={styles.label}>Opening Times</Text>
        
        {openingHours.map((hours, index) => (
          <View key={index} style={styles.openingHoursRow}>
            <TouchableOpacity style={styles.dayDropdown}>
              <Text>{hours.day}</Text>
              <Icon name="angle-down" size={16} color="#999" style={{ marginLeft: 8 }} />
            </TouchableOpacity>
            
            <Text style={styles.timesSeparator}>—</Text>
            
            <TouchableOpacity style={styles.timeInput}>
              <Text>{hours.from}</Text>
              <Icon name="angle-down" size={16} color="#999" style={{ marginLeft: 8 }} />
            </TouchableOpacity>
            
            <Text style={styles.timesSeparator}>—</Text>
            
            <TouchableOpacity style={styles.timeInput}>
              <Text>{hours.to}</Text>
              <Icon name="angle-down" size={16} color="#999" style={{ marginLeft: 8 }} />
            </TouchableOpacity>
            
            {index === openingHours.length - 1 ? (
              <TouchableOpacity 
                style={styles.hoursButton}
                onPress={addOpeningHoursRow}
              >
                <Icon name="plus" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity 
                style={[styles.hoursButton, { backgroundColor: '#f44336' }]}
                onPress={() => removeOpeningHoursRow(index)}
              >
                <Icon name="minus" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    );
  };
  
  // Step 3: Upload Photos
  const renderStep3 = () => {
    return (
      <View style={styles.stepContent}>
        {renderStepIndicators()}
        
        <View style={styles.photoUploadArea}>
          <TouchableOpacity 
            style={styles.addPhotoButton}
            onPress={handleAddPhoto}
          >
            <Icon name="plus" size={24} color="#00798C" />
          </TouchableOpacity>
          
          <View style={styles.photoGrid}>
            {photos.map((photo, index) => (
              <View key={index} style={styles.photoContainer}>
                <Image source={{ uri: photo.uri }} style={styles.photo} />
                <TouchableOpacity 
                  style={styles.removePhotoButton}
                  onPress={() => removePhoto(index)}
                >
                  <Icon name="times" size={16} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  };
  
  // Step 4: Thank You Screen
  const renderStep4 = () => {
    return (
      <View style={styles.thankYouContainer}>
        {renderStepIndicators()}
        
        <View style={styles.profileImageContainer}>
          <Image 
            source={require("../assets/img/profile.png")} 
            style={styles.profileImage} 
          />
        </View>
        
        <View style={styles.thankYouContent}>
          <Text style={styles.thankYouText}>
            <Text>Thank you for </Text>
            <Text style={styles.contributingText}>Contributing!</Text>
          </Text>
          
          <View style={styles.pointsContainer}>
            <Image 
              source={require("../assets/img/coin.png")} 
              style={styles.coinIcon} 
            />
            <Text style={styles.pointsText}>+2</Text>
          </View>
          
          <View style={styles.userProfileCard}>
            <View style={styles.userInfoContainer}>
              <Text style={styles.usernameText}>Worldtraveler123</Text>
              <View style={styles.userStatsContainer}>
                <View style={styles.statItem}>
                  <Icon name="map-marker" size={16} color="#00798C" />
                  <Text style={styles.statText}>12</Text>
                </View>
                <View style={styles.statItem}>
                  <Icon name="star" size={16} color="#00798C" />
                  <Text style={styles.statText}>2</Text>
                </View>
                <View style={styles.statItem}>
                  <Icon name="comment" size={16} color="#00798C" />
                  <Text style={styles.statText}>4</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.levelBadge}>
              <Image 
                source={require("../assets/img/coin.png")} 
                style={styles.badgeCoinIcon} 
              />
              <Text style={styles.levelText}>17</Text>
            </View>
          </View>
          
          <View style={styles.achievementContainer}>
            <Icon name="check-circle" size={16} color="#00798C" />
            <Text style={styles.achievementText}>Added a Place</Text>
          </View>
          
          <View style={styles.placeContainer}>
            <Icon name="map-marker" size={16} color="#00798C" />
            <Text style={styles.placeText}>{name || "Lorem Ipsum Restaurant"}</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.doneButton}
            onPress={() => navigation.navigate('Contributions')}
          >
            <Text style={styles.doneButtonText}>Done!</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  // Render content based on current step
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return null;
    }
  };
  
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="light-content" translucent />
      
      {/* Header background */}
      {step < 4 ? (
        <View style={styles.header}>
          <TouchableOpacity onPress={goToPreviousStep} style={styles.closeButton}>
            <Icon name="times" size={20} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Adding a Place</Text>
          <View style={{ width: 40 }} />
        </View>
      ) : null}
      
      {step < 4 && <Text style={styles.stepTitle}>{getHeaderTitle()}</Text>}
      
      {/* Main content */}
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {renderStepContent()}
      </ScrollView>
      
      {/* Navigation buttons */}
      {step < 4 && (
        <View style={styles.navigationButtonsContainer}>
          {step > 1 ? (
            <TouchableOpacity 
              style={styles.backButton}
              onPress={goToPreviousStep}
            >
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          ) : (
            <View style={{ flex: 0.3 }} />
          )}
          
          <TouchableOpacity 
            style={styles.nextButton}
            onPress={step === 3 ? handleSubmit : goToNextStep}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.nextButtonText}>
                {step === 3 ? "Submit" : "Next"}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default AddPlaceScreen;