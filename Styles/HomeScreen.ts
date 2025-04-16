import { StyleSheet, Dimensions, StatusBar, Platform } from "react-native";

const { width, height } = Dimensions.get("window");
const TEAL = '#00798C'; // Teal color 
const WHITE = '#FFFFFF';
const LIGHT_GRAY = '#F5F5F5';
const DARK_GRAY = '#666';

// Safe handling of StatusBar height for cross-platform compatibility
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  // Add the curved background image style
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
  userInfo: {
    flex: 1,
  },
  greeting: {
    marginTop:17,
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
    marginTop:30,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: WHITE,
    borderRadius: 25,
    marginHorizontal: 20,
    marginTop: 10, // Adjusted margin
    paddingHorizontal: 15,
    height: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1, // Make search bar appear above the curved background
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#333',
  },
  scrollView: {
    flex: 1,
    zIndex: 1, // Make scroll view appear above the curved background
  },
  carouselSection: {
    borderTopEndRadius:30,
    borderTopLeftRadius:30,
    paddingTop: 15,
    backgroundColor: 'rgba(235, 245, 248, 0.8)',  // Light teal for carousel section
    paddingBottom: 20,
    marginTop:10,
    
  },
  matchTitleContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  matchTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  carouselItem: {
    width: width * 0.8,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: WHITE,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
  },
  carouselImage: {
    width: '100%',
    height: width * 0.5,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  carouselContent: {
    padding: 15,
  },
  carouselTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 14,
    color: DARK_GRAY,
  },
  tagsContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  tagItem: {
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 15,
    marginRight: 8,
  },
  tagText: {
    fontSize: 12,
    color: DARK_GRAY,
  },
  etaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  etaText: {
    marginLeft: 5,
    fontSize: 12,
    color: DARK_GRAY,
    flex: 1,
  },
  distanceText: {
    fontSize: 12,
    color: DARK_GRAY,
  },
  navOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: WHITE,
  },
  navOption: {
    alignItems: 'center',
  },
  navIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: LIGHT_GRAY,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  navText: {
    fontSize: 12,
    color: DARK_GRAY,
  },
  sectionContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    fontSize: 14,
    color: TEAL,
    fontWeight: '500',
  },
  destinationList: {
    paddingRight: 20,
  },
  destinationCard: {
    width: width * 0.6,
    marginRight: 15,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: WHITE,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  destinationImage: {
    width: '100%',
    height: width * 0.4,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  destinationInfo: {
    padding: 12,
  },
  destinationName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  destinationLocation: {
    fontSize: 12,
    color: DARK_GRAY,
    marginBottom: 5,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceLabel: {
    fontSize: 11,
    color: DARK_GRAY,
  },
  priceText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
  },
  durationBadge: {
    backgroundColor: TEAL,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 15,
  },
  durationText: {
    color: WHITE,
    fontSize: 12,
    fontWeight: '500',
  },
  hotelList: {
    paddingRight: 20,
    paddingBottom: 20,
  },
  hotelCard: {
    width: width - 40,
    marginRight: 15,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: WHITE,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    flexDirection: 'row',
    marginBottom: 15,
  },
  hotelImage: {
    width: 100,
    height: 100,
  },
  hotelInfo: {
    flex: 1,
    padding: 10,
  },
  hotelName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  hotelLocation: {
    fontSize: 12,
    color: DARK_GRAY,
    marginBottom: 5,
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starText: {
    marginLeft: 5,
    fontSize: 12,
    color: DARK_GRAY,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: WHITE,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  navItem: {
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  navItemText: {
    fontSize: 12,
    color: DARK_GRAY,
    marginTop: 3,
  },
  activeNavText: {
    color: TEAL,
    fontWeight: 'bold',
  }
});

export default styles;