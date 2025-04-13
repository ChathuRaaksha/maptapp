import { StyleSheet } from 'react-native';

// Define color constants
const TEAL = '#00798C'; // Teal color from your design
const WHITE = '#FFFFFF';
const DARK_TEAL = '#336749'; // Color for "in"

export const splashScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
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
  logoContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5, // Add spacing between text and icon (RN >= 0.71)
  },
  
  logoText: {
    color: WHITE,
    fontSize: 48,
    fontWeight: 'bold',
    marginTop:-325,
    letterSpacing: 2,
  },
  luggageIcon: {
    width: 50,
    height: 70,
    marginLeft: 5,
   marginTop:-325,
    tintColor: WHITE,
  },
  logoText2: {
    color: DARK_TEAL,
    fontSize: 58,
    fontWeight: 'bold',
  marginTop:-325,
    marginLeft: -50,
    zIndex: 2,
  },
  bottomCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    // Semi-transparent white
    padding: 70,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
  },
  questionText: {
    color: TEAL,
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: TEAL,
    padding: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
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
});

export default splashScreenStyles;