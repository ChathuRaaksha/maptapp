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
    paddingTop: statusBarHeight,
  },
  header: {
    marginTop:30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
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
    color: '#333',
  },
  rightPlaceholder: {
    width: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: WHITE,
    borderRadius: 25,
    marginHorizontal: 20,
    marginVertical: 15,
    paddingHorizontal: 15,
    height: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  sectionContainer: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  citiesList: {
    paddingHorizontal: 20,
  },
  cityCard: {
    width: 150,
    height: 100,
    borderRadius: 15,
    marginRight: 15,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
  },
  selectedCityCard: {
    borderWidth: 3,
    borderColor: TEAL,
  },
  cityImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  cityInfoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  cityName: {
    color: WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
  cityRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  cityRatingText: {
    color: WHITE,
    fontSize: 12,
    marginLeft: 4,
  },
  durationFilterContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  durationOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  durationOption: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: LIGHT_GRAY,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedDurationOption: {
    backgroundColor: TEAL,
  },
  durationOptionText: {
    fontSize: 14,
    color: DARK_GRAY,
  },
  selectedDurationOptionText: {
    color: WHITE,
    fontWeight: '500',
  },
  travelPlansContainer: {
    paddingBottom: 30,
  },
  travelPlanWrapper: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  travelPlanCard: {
    borderRadius: 15,
    backgroundColor: WHITE,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  travelPlanImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  travelPlanOverlay: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  durationBadge: {
    backgroundColor: TEAL,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  durationText: {
    color: WHITE,
    fontSize: 12,
    fontWeight: '600',
  },
  travelPlanContent: {
    padding: 15,
  },
  travelPlanTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  travelPlanDescription: {
    fontSize: 14,
    color: DARK_GRAY,
    marginBottom: 15,
  },
  travelPlanFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  travelPlanPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: TEAL,
  },
  bookButton: {
    backgroundColor: TEAL,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  bookButtonText: {
    color: WHITE,
    fontSize: 14,
    fontWeight: '600',
  },
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  noResultsText: {
    fontSize: 16,
    color: DARK_GRAY,
    marginTop: 15,
    marginBottom: 20,
  },
  resetButton: {
    backgroundColor: TEAL,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  resetButtonText: {
    color: WHITE,
    fontSize: 14,
    fontWeight: '600',
  },
  clearButton: {
    padding: 8,
    position: 'absolute',
    right: 8,
    top: '50%',
    marginTop: -16,
    zIndex: 1,
  },
});

export default styles;