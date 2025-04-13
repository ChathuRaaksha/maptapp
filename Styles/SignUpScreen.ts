import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");
const TEAL = '#00798C'; // Teal color from your design
const WHITE = '#FFFFFF';
const DARK_TEAL = '#336749'; // Color for "in"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'rgba(255, 255, 255, 0.8)',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 20, // Add some space at the bottom for scrolling
  },
  topBackground: {
    width: "100%",
    height: height * 0.375, // 1.5/4 of the screen height (Top Black Area)
    backgroundColor:'rgba(255, 255, 255, 0.8)',
    alignItems: "center",
    justifyContent: "center",
  },
  topImage: {
    width: "100%",  // Ensure it takes full width of its container
    height: "110%", // Ensure it takes full height of the black section
    resizeMode: "cover",  // Stretch the image to fill the area
  },
  logoContainer: {
    position: 'absolute',
    top: height * 0.01, // Position logo at approximately 12% from the top of screen
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5, 
  },
  logo: {
    width: 270, // Adjust the size of the logo
    height: 270, // Adjust the size of the logo
    resizeMode: "contain", // Ensure the logo scales properly
  },
  socialLoginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10, // Adjust spacing
  },
  
  socialButton: {
    width: 50,  // Circular button size
    height: 50, // Circular button size
    borderRadius: 25, // Makes it round
    backgroundColor: "#fff", // White background
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10, // Space between buttons
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Android shadow
  },
  
  socialIcon: {
    width: 50, // Icon size
    height: 50, // Icon size
    resizeMode: "contain",
  },
  
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 13,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: 10,
    paddingBottom: 3,
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 30,
    backgroundColor: "#fff",
    fontSize: 16,
    paddingLeft: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    position: "relative",
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 30,
    backgroundColor: "#fff",
    fontSize: 16,
    paddingLeft: 20,
    paddingRight: 40,
    marginTop: 10
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginRight: 8,
  },
  
  checkboxChecked: {
    backgroundColor: "orange", // Change to your theme color
    borderColor: "orange",
  },
  
  termsText: {
    fontSize: 14,
    color: "gray",
    flexShrink: 1,
  },
  
  termsHighlight: {
    color: "orange",
    fontWeight: "bold",
  },
  
  eyeIcon: {
    position: "absolute",
    right: 15,
    top: 22, // Adjusted to align with input
  },
  loginButton: {
    marginTop: 20,
    alignItems: "center",
  },
  loginImage: {
    width: 50,
    height: 60,
    resizeMode: "contain",
    borderRadius: 45
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: "gray",
    marginBottom: 2,
  },
  signInText: {
    color: "orange",
    fontWeight: "bold",
    padding: 15,
  },
  button: {
    backgroundColor: TEAL,
    padding: 12,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize: 16,
    paddingLeft: 110,
    paddingRight: 110,
    marginBottom: 1,
    marginTop: 10,
  },
  buttonText: {
    color: WHITE,
    fontSize: 18,
    marginRight: 10,
  },
  airplaneIcon: {
    width: 20,
    height: 20,
  },
  
  background: {
    flex: 1,
  },
  languageContainer: {
    position: 'absolute',
    top: 40, // Adjusted for status bar
    right: 20,
  },
  languageText: {
    color: WHITE,
    fontSize: 16,
  },
  
  logoText: {
    color: WHITE,
    fontSize: 48,
    fontWeight: 'bold',
    marginTop: -325,
    letterSpacing: 2,
  },
  luggageIcon: {
    width: 50,
    height: 70,
    marginLeft: 5,
    marginTop: -325,
    tintColor: WHITE,
  },
  logoText2: {
    color: DARK_TEAL,
    fontSize: 58,
    fontWeight: 'bold',
    marginTop: -325,
    marginLeft: -50,
    zIndex: 2,
  },
  bottomCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: "75%", // A bit taller than the login screen to accommodate more fields
    padding: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

export default styles;