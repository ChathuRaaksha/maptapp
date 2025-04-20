import { StyleSheet, Dimensions, StatusBar, Platform } from "react-native";

const { width, height } = Dimensions.get("window");
const TEAL = '#00798C'; // Teal color 
const WHITE = '#FFFFFF';
const LIGHT_BACKGROUND = 'rgba(255, 255, 255, 0.8)';

// Safe handling of StatusBar height for cross-platform compatibility
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT_BACKGROUND,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: statusBarHeight + 15,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#10243F',
  },
  emptyRightSpace: {
    width: 40, // Balance for the back button
  },
  bookmarkContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  bookmarkIcon: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesList: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: WHITE,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  activeCategoryButton: {
    backgroundColor: TEAL,
    borderColor: TEAL,
  },
  categoryIcon: {
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    color: TEAL,
    fontWeight: '500',
  },
  activeCategoryText: {
    color: WHITE,
  },
  savedItemsGrid: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  savedItemCard: {
    flex: 1,
    margin: 6,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: WHITE,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    position: 'relative',
  },
  savedItemImage: {
    width: '100%',
    height: width * 0.35,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#F5F5F5', // Placeholder background color
  },
  // Style for emojis on the left
  emojisContainerLeft: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  emojiText: {
    fontSize: 16,
    marginRight: 2,
  },
  // New style for match indicator container with circle and percentage
  matchIndicatorContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  // Circular progress container
  circularProgressContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  progressCircleBackground: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#E5E7EB',
  },
  progressCircleFill: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 3,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    transform: [{ rotateZ: '-45deg' }],
  },
  progressCircleInner: {
    position: 'absolute',
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'white',
  },
  // Separated percentage text style (next to circle)
  percentageTextSeparate: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#444',
    marginLeft: 4,
  },
  // Legacy percentage text style (for backward compatibility)
  percentageText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#444',
    textAlign: 'center',
  },
  savedItemInfo: {
    padding: 10,
  },
  savedItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10243F',
    marginBottom: 6,
  },
  distanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  distanceText: {
    fontSize: 14,
    color: '#666',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    padding: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 15,
  }
});

export default styles;