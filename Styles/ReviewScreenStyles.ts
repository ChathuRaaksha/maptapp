import { StyleSheet, Dimensions, StatusBar, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

// Theme colors - matching restaurant detail screen styles
export const TEAL = '#00798C';
export const WHITE = '#FFFFFF';
export const LIGHT_GRAY = '#F5F5F5';
export const DARK_GRAY = '#666';
export const BLUE = '#1a56db';
export const YELLOW = '#fef08a';

// Safe handling of StatusBar height for cross-platform compatibility
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: statusBarHeight + 20,
    paddingHorizontal: 20,
    zIndex: 10,
    marginTop: 30,
  },
  curvedBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: height * 0.25,
    resizeMode: 'cover',
    zIndex: 0,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: LIGHT_GRAY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: WHITE,
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
    height: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 15,
    paddingBottom: 40,
    justifyContent: 'center', // Center content vertically
    minHeight: height - (height * 0.05 + 90), // Subtract header height and curved background
  },
  card: {
    backgroundColor: WHITE,
    borderRadius: 30,
    padding: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 20,
  },
  emojiContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  emojiButton: {
    width: width / 5 - 16,
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedEmojiButton: {
    backgroundColor: 'rgba(0, 121, 140, 0.05)',
    borderRadius: 10,
    padding: 5,
  },
  emojiText: {
    fontSize: 32,
    marginBottom: 5,
  },
  emojiLabel: {
    fontSize: 12,
    color: DARK_GRAY,
  },
  reviewInput: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 15,
    padding: 15,
    height: 150,
    fontSize: 16,
    color: '#2d3748',
    backgroundColor: LIGHT_GRAY,
  },
  submitButton: {
    flexDirection: 'row',
    backgroundColor: TEAL,
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#aaa',
    opacity: 0.7,
  },
  submitButtonText: {
    color: WHITE,
    fontWeight: '600',
    fontSize: 16,
    marginRight: 10,
  },
});

export default styles;