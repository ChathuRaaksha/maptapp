import { StyleSheet, Dimensions, StatusBar, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

// Theme colors - matching home screen styles
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
    //backgroundColor: WHITE,
    zIndex: 10,
    marginTop:30,
  },
  curvedBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: height * 0.25, // Adjust height as needed
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
  bookmarkButton: {
    width: 40,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  verificationText: {
    marginLeft: 6,
    color: WHITE,
    fontSize: 14,
  },
  scrollView: {
    flex: 1,
  },
  sliderCard: {
    marginHorizontal: 15,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: 'rgba(235, 245, 248, 0.8)',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginTop: 15,
  },
  
  sliderContainer: {
    
    height: height * 0.25,
    backgroundColor: LIGHT_GRAY,
   
  
  },
  sliderImage: {
    width: width,
    height: '100%',
    
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: TEAL,
  },
  infoCard: {
    backgroundColor: WHITE, 
    borderRadius: 30,
    padding: 15,
    margin: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#2d3748',
  },
  scheduleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 5,
    marginLeft: 5,
  },
  scheduleItem: {
    flexDirection: 'row',
    backgroundColor: LIGHT_GRAY,
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight:1,
  },
  scheduleDay: {
    fontSize: 14,
    color: DARK_GRAY,
    marginRight: 5,
  },
  scheduleHours: {
    fontSize: 14,
    color: DARK_GRAY,
  },
  matchContainer: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  matchCircle: {
    width: 60,
    height: 60,
    borderRadius: 35,
    backgroundColor: WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: TEAL,
  },
  matchPercentage: {
    fontSize: 22,
    fontWeight: 'bold',
    color: TEAL,
  },
  matchLabel: {
    fontSize: 12,
    color: TEAL,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  actionButton: {
    flexDirection: 'row',
    backgroundColor: TEAL,
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    color: WHITE,
    marginLeft: 10,
    fontWeight: '600',
    fontSize: 16,
  },
  roundButton: {
    width: 45,
    height: 45,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundButtonShare: {
    backgroundColor: TEAL,
  },
  roundButtonGlobe: {
    backgroundColor: TEAL,
  },
  roundButtonPhone: {
    backgroundColor: TEAL,
  },
  sectionContainer: {
    padding: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: DARK_GRAY,
  },
  emojiContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  emojiItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: LIGHT_GRAY,
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  emoji: {
    fontSize: 18,
    marginRight: 5,
  },
  emojiCount: {
    fontSize: 14,
    color: DARK_GRAY,
  },
  reviewsScrollView: {
    marginVertical: 10,
  },
  reviewsScrollContent: {
    paddingRight: 15,
  },
  reviewCard: {
    backgroundColor: YELLOW,
    borderRadius: 10,
    padding: 15,
    marginRight: 15,
    width: width * 0.7, // Set a fixed width for each review card
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  reviewAvatar: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginRight: 10,
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3748',
  },
  reviewDate: {
    fontSize: 12,
    color: DARK_GRAY,
  },
  reviewEmoji: {
    marginLeft: 'auto',
  },
  reviewText: {
    fontSize: 14,
    color: '#2d3748',
    lineHeight: 20,
  },
 
  feelingsContainer: {
    backgroundColor: WHITE,
    borderRadius: 15,
    padding: 15,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  feelingsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 15,
  },
  emoticonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  emoticon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: LIGHT_GRAY,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: TEAL,
  },
  emoticonText: {
    fontSize: 20,
  },
  leaveReviewButton: {
    flexDirection: 'row',
    backgroundColor: TEAL,
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leaveReviewText: {
    color: WHITE,
    fontWeight: '600',
    fontSize: 16,
    marginRight: 10,
  },
});

export default styles;