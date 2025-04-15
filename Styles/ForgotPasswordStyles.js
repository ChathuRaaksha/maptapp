import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");
const TEAL = '#00798C'; // Teal color from your design
const WHITE = '#FFFFFF';
const DARK_TEAL = '#336749'; // Color for "in"

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
    marginBottom: 20,
    marginTop: 10,
  },
  button: {
    backgroundColor: TEAL,
    padding: 12,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize: 16,
    paddingLeft: 80,
    paddingRight: 80,
    marginBottom: 10,
    marginTop: 10,
  },
  buttonText: {
    color: WHITE,
    fontSize: 18,
    marginRight: 10,
  },
  sendIcon: {
    marginLeft: 5,
  },
  backToLoginText: {
    marginTop: 20,
    fontSize: 16,
    color: TEAL,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default styles;