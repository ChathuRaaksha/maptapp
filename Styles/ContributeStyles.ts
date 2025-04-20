import { StyleSheet, Dimensions, StatusBar, Platform } from "react-native";

const { width, height } = Dimensions.get("window");
const TEAL = '#00798C'; // Teal color
const WHITE = '#FFFFFF';
const LIGHT_GRAY = '#F5F5F5';
const DARK_GRAY = '#666';
const LIGHT_TEXT = '#999';

// Safe handling of StatusBar height for cross-platform compatibility
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  // Curved background image style
  curvedBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: height * 0.3, // Adjust height as needed
    resizeMode: 'cover',
    zIndex: 0,
  },
  header: {
    paddingTop: statusBarHeight + 20,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1, // Make header appear above the curved background
  },
  // Menu button style
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 17,
  },
  userInfo: {
    flex: 1,
    marginLeft: 10, // Add spacing between menu button and user info
    marginTop: 27,
  },
  greeting: {
    marginTop: 23,
    fontSize: 24,
    fontWeight: 'bold',
    color: WHITE,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
  },
  pointsText: {
    color: WHITE,
    marginLeft: 5,
    fontSize: 14,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 30,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  
  // New styles for scrollable content
  scrollContent: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: height * 0.05, // Push content below the curved top image
  },
  
  // Card styles
  card: {
    backgroundColor: WHITE,
    borderRadius: 30,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 16,
  },
  cardContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E8F5F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    alignSelf: 'center',
  },
  emojiContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
    alignSelf: 'center',
  },
  emoji: {
    fontSize: 24,
    marginHorizontal: 5,
  },
  cardTextContainer: {
    alignItems: 'center',
    width: '100%',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  cardButton: {
    backgroundColor: TEAL,
    borderRadius: 25,
    paddingVertical: 13,
    paddingHorizontal: 16,
    width: width * 0.6,
    alignItems: 'center',
  },
  cardButtonText: {
    color: WHITE,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  
  // Contribution History section
  historySection: {
    marginTop: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: WHITE,
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  historyIcon: {
    marginRight: 16,
    marginTop: 3,
  },
  historyDetails: {
    flex: 1,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  historyPlace: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  historyDate: {
    fontSize: 12,
    color: LIGHT_TEXT,
    marginTop: -15,
    marginLeft: 250,
  },
  historyStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  historyStatusText: {
    fontSize: 13,
    color: DARK_GRAY,
    marginLeft: 4,
  },
  coinsContainer: {
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight:14,
  },
  coinsText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFA000',
  },
});

export default styles;