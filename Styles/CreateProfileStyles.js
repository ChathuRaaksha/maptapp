import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");
const TEAL = '#00798C'; // Teal color from your design
const WHITE = '#FFFFFF';
const DARK_TEAL = '#336749'; // Color for "in"
const LIGHT_GRAY = '#F5F5F5';
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
    marginBottom: 20,
    textAlign: "center",
  },
  imagePickerContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: WHITE,
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: LIGHT_GRAY,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: GRAY,
    borderStyle: 'dashed',
  },
  imagePlaceholderText: {
    marginTop: 5,
    color: TEXT_GRAY,
    fontSize: 14,
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: TEAL,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: WHITE,
  },
  label: {
    fontSize: 13,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: 10,
    paddingBottom: 3,
    marginTop: 10,
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: GRAY,
    borderRadius: 30,
    backgroundColor: WHITE,
    fontSize: 16,
    paddingLeft: 20,
    marginTop: 5,
  },
  helperText: {
    fontSize: 12,
    color: TEXT_GRAY,
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginTop: 5,
  },
  button: {
    backgroundColor: TEAL,
    padding: 15,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    marginTop: 30,
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
    marginRight: 8,
  },
  buttonIcon: {
    marginLeft: 5,
  },
  skipContainer: {
    marginTop: 15,
    padding: 5,
  },
  skipText: {
    fontSize: 16,
    color: TEAL,
    fontWeight: '500',
  },
});

export default styles;