import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
  StatusBar,
  ScrollView,
  Alert,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../Styles/SignUpScreen";
import { LinearGradient } from "expo-linear-gradient";

const { height } = Dimensions.get("window");

interface Country {
  name: string;
  flag: string;
}

const SignupScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

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

  const handleSignup = () => {
    if (!name || !email || !phoneNumber || !country || !password || !agreeToTerms) {
      Alert.alert("Incomplete Information", "Please fill in all fields and agree to the terms.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Password Too Short", "Password should be at least 6 characters long.");
      return;
    }

    Alert.alert("Success", "Your account has been created!", [
      { text: "Continue", onPress: () => navigation.navigate("CreateProfile") },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

          <ImageBackground
            source={require("../assets/img/start5.png")}
            style={styles.background}
            resizeMode="cover"
          >
            <View style={styles.languageContainer}>
              <Text style={styles.languageText}>English</Text>
            </View>

            <View style={styles.logoContainer}>
              <Image source={require("../assets/img/logo4.png")} style={styles.logo} />
            </View>

            <LinearGradient
              colors={["rgba(166, 22, 22, 0)", "rgba(219, 233, 235, 0.95)", "rgb(215, 160, 160)"]}
              style={styles.bottomCard}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            >
              <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtitle}>Please fill in the details to create your account</Text>

                <Text style={styles.label}>NAME</Text>
                <TextInput
                  style={styles.input}
                  placeholder="John Doe"
                  autoCapitalize="words"
                  value={name}
                  onChangeText={setName}
                />

                <Text style={styles.label}>EMAIL</Text>
                <TextInput
                  style={styles.input}
                  placeholder="example@gmail.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />

                <Text style={styles.label}>PHONE NUMBER</Text>
                <TextInput
                  style={styles.input}
                  placeholder="+1 123 456 7890"
                  keyboardType="phone-pad"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                />

                <Text style={styles.label}>COUNTRY</Text>
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
                    }}
                  />

                  {filteredCountries.length > 0 && (
                    <View
                      style={{
                        position: "absolute",
                        top: 50,
                        width: "100%",
                        backgroundColor: "#fff",
                        borderRadius: 8,
                        maxHeight: 150,
                        zIndex: 10,
                        elevation: 4,
                      }}
                    >
                      {filteredCountries.map((item) => (
                        <TouchableOpacity
                          key={item.name}
                          onPress={() => {
                            setCountry(`${item.flag} ${item.name}`);
                            setFilteredCountries([]);
                          }}
                          style={{
                            padding: 10,
                            borderBottomWidth: 0.5,
                            borderColor: "#ccc",
                          }}
                        >
                          <Text>{item.flag} {item.name}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>

                <Text style={styles.label}>PASSWORD</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="********"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
                    <Icon name={showPassword ? "eye" : "eye-slash"} size={20} color="gray" />
                  </TouchableOpacity>
                </View>

                <View style={styles.termsContainer}>
                  <TouchableOpacity style={styles.checkboxContainer} onPress={() => setAgreeToTerms(!agreeToTerms)}>
                    <View style={[styles.checkbox, agreeToTerms && styles.checkboxChecked]} />
                    <Text style={styles.termsText}>
                      I agree to the <Text style={styles.termsHighlight}>Terms & Conditions</Text>
                    </Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={handleSignup}>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                    <Image source={require("../assets/img/plane.png")} style={styles.airplaneIcon} />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.footerText}>
                    Already have an account? <Text style={styles.signInText}>SIGN IN</Text>
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </LinearGradient>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
