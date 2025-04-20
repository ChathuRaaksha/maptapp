import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";
import styles,{ WHITE } from '../Styles/ThankYouScreenStyles';

const { width, height } = Dimensions.get("window");
const TEAL = '#00798C';
const YELLOW = '#FB9C00';

// Define navigation type
type NavigationProp = StackNavigationProp<RootStackParamList, 'ThankYou'>;

const ThankYouScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  // Hardcoded demo values
  const username = "ChathuRaaksha";
  const userImage = require('../assets/img/supun.png');

  const handleDone = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="light-content" translucent />
      <Image source={require('../assets/img/top.png')} style={styles.curvedBackground} />

      <View style={styles.userImageContainer}>
        <Image source={userImage} style={styles.userImage} />
      </View>

      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>🎉 Thank you for Contributing! 🎉</Text>
      </View>
      <View style={styles.rewardContainer2}>
          <Icon name="money" size={24} color={YELLOW} />
          <Text style={styles.rewardText}>+2 coins</Text>
        </View>
      <View style={styles.card}>
        <Text style={styles.usernameText}>{username}</Text>
        
        <View style={styles.rewardContainer}>
          <Icon name="money" size={24} color={YELLOW} />
          <Text style={styles.rewardText}>17 coins</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Icon name="map-marker" size={18} color={TEAL} />
            <Text style={styles.statText}>12</Text>
          </View>
          
          <View style={styles.statItem}>
            <Icon name="plus" size={18} color={TEAL} />
            <Text style={styles.statText}>2</Text>
          </View>
          
          <View style={styles.statItem}>
            <Icon name="star" size={18} color={TEAL} />
            <Text style={styles.statText}>4 reviews</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ThankYouScreen;
