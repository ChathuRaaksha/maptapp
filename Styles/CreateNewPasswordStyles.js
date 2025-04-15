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
    marginTop: -395,
    letterSpacing: 2,
  },
  luggageIcon: {
    width: 50,
    height: 70,
    marginLeft: 5,
    marginTop: -395,
    tintColor: WHITE,
  },
  logoText2: {
    color: DARK_TEAL,
    fontSize: 58,
    fontWeight: 'bold',
    marginTop: -395,
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
  label: {
    fontSize: 13,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: 10,
    paddingBottom: 3,
    marginTop: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    position: "relative",
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: GRAY,
    borderRadius: 30,
    backgroundColor: WHITE,
    fontSize: 16,
    paddingLeft: 20,
    paddingRight: 40,
    marginTop: 5,
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    top: 17,
  },
  strengthContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
    marginBottom: 5,
  },
  strengthBarBackground: {
    flex: 1,
    height: 4,
    backgroundColor: LIGHT_GRAY,
    borderRadius: 2,
    overflow: 'hidden',
  },
  strengthBar: {
    height: '100%',
    borderRadius: 2,
  },
  strengthText: {
    marginLeft: 10,
    fontSize: 12,
    fontWeight: '500',
    width: 70,
    textAlign: 'right',
  },
  requirementsContainer: {
    width: '100%',
    backgroundColor: LIGHT_GRAY,
    borderRadius: 8,
    padding: 10,
    marginVertical: 15,
  },
  requirementsTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#555',
  },
  requirementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  requirementText: {
    fontSize: 13,
    color: TEXT_GRAY,
    marginLeft: 8,
  },
  matchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginLeft: 10,
    alignSelf: 'flex-start',
  },
  matchText: {
    fontSize: 13,
    marginLeft: 6,
  },
  button: {
    backgroundColor: TEAL,
    padding: 15,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    marginTop: 20,
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
});

export default styles;