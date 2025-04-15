import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");
const TEAL = '#00798C'; // Teal color from your design
const WHITE = '#FFFFFF';
const DARK_TEAL = '#336749'; // Color for "in"
const LIGHT_GRAY = '#F1F1F1';
const GRAY = '#CCCCCC';
const TEXT_GRAY = '#888888';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
    gap: 5,
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
    padding: 40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: TEXT_GRAY,
    marginBottom: 25,
    textAlign: "center",
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  digitInput: {
    width: width * 0.14,
    height: width * 0.14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: GRAY,
    backgroundColor: LIGHT_GRAY,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 25,
  },
  timerText: {
    fontSize: 14,
    color: TEXT_GRAY,
  },
  resendButton: {
    padding: 5,
  },
  disabledResendButton: {
    opacity: 0.5,
  },
  resendText: {
    color: TEAL,
    fontSize: 14,
    fontWeight: 'bold',
  },
  disabledResendText: {
    color: TEXT_GRAY,
  },
  button: {
    backgroundColor: TEAL,
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: WHITE,
    fontSize: 18,
    fontWeight: '600',
  },
  backText: {
    marginTop: 15,
    fontSize: 16,
    color: TEAL,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default styles;