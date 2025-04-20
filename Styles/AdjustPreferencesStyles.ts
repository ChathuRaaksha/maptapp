import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

// Define theme colors (consistent with your existing styles)
const TEAL = '#00798C';
const BLUE = '#1e4e94';
const WHITE = '#FFFFFF';
const LIGHT_BLUE = '#e6f2f9';
const DARK_TEAL = '#336749';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT_BLUE,
  },
  // Top image styling
  topImageContainer: {
    height: height * 0.101,
    width: width,
    overflow: 'hidden',
  },
  topImage: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  background: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingTop: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  placeholder: {
    width: 42, // Same width as back button for balance
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
   // color: BLUE,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  listContainer: {
    paddingBottom: 100, // Ensure space at the bottom for the save button
  },
  interestCard: {
    backgroundColor: WHITE,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  interestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  interestTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  interestIcon: {
    marginRight: 10,
  },
  interestName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: TEAL,
  },
  emojiIndicator: {
    fontSize: 24,
  },
  ratingLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  emojiRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 4,
  },
  emojiRangeText: {
    fontSize: 12,
    color: '#666',
  },
  saveButton: {
    backgroundColor: TEAL,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  saveButtonDisabled: {
    backgroundColor: '#AAAAAA',
  },
  saveButtonText: {
    color: WHITE,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;