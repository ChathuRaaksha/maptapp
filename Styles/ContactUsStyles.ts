import { StyleSheet, Dimensions } from "react-native";

const TEAL = '#00798C';
const WHITE = '#FFFFFF';
const LIGHT_GRAY = '#F5F5F5';
const DARK_GRAY = '#666';
const { width, height } = Dimensions.get("window");

const contactUsStyles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: WHITE,
    flexGrow: 1,
  },
  header: {
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: WHITE,
    textAlign: 'center',
  },
  introText: {
    marginTop: 130,
    fontSize: 15,
    color: DARK_GRAY,
    marginBottom: 24,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 30,
  },
  formGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 15,
    color: DARK_GRAY,
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    backgroundColor: LIGHT_GRAY,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#222',
  },
  textArea: {
    minHeight: 100,
    maxHeight: 180,
  },
  button: {
    backgroundColor: TEAL,
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
  curvedBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width, // full width
    height: height * 0.25,
    resizeMode: 'cover',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    zIndex: 0,
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  infoText: {
    fontSize: 15,
    color: DARK_GRAY,
    marginLeft: 10,
  },
});

export default contactUsStyles;
