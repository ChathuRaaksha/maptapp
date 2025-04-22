import { StyleSheet, Dimensions, StatusBar, Platform } from "react-native";

const { width } = Dimensions.get("window");
const TEAL = '#00798C'; // Teal color consistent with the app
const WHITE = '#FFFFFF';
const LIGHT_GRAY = '#F5F5F5';
const DARK_GRAY = '#666';

// Safe handling of StatusBar height for cross-platform compatibility
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: TEAL,
    paddingTop: statusBarHeight + 15,
    paddingBottom: 15,
    paddingHorizontal: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginTop:50,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: WHITE,
  },
  rightPlaceholder: {
    width: 36,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: WHITE,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: TEAL,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: DARK_GRAY,
  },
  activeTabText: {
    color: TEAL,
    fontWeight: 'bold',
  },
  bookingsList: {
    padding: 15,
  },
  bookingCard: {
    backgroundColor: WHITE,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 3,
    overflow: 'hidden',
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  bookingTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookingType: {
    marginLeft: 5,
    fontSize: 13,
    fontWeight: '500',
    color: TEAL,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  upcomingBadge: {
    backgroundColor: 'rgba(0, 121, 140, 0.1)', // Teal with opacity
  },
  completedBadge: {
    backgroundColor: 'rgba(75, 181, 67, 0.1)', // Green with opacity
  },
  cancelledBadge: {
    backgroundColor: 'rgba(255, 99, 71, 0.1)', // Red with opacity
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  bookingContent: {
    flexDirection: 'row',
    padding: 15,
  },
  bookingImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  bookingInfo: {
    flex: 1,
    marginLeft: 15,
  },
  bookingName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  locationText: {
    marginLeft: 5,
    fontSize: 13,
    color: DARK_GRAY,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  dateText: {
    marginLeft: 5,
    fontSize: 13,
    color: DARK_GRAY,
  },
  timeIcon: {
    marginLeft: 10,
  },
  guestsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  guestsText: {
    marginLeft: 5,
    fontSize: 13,
    color: DARK_GRAY,
  },
  bookingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  confirmationLabel: {
    fontSize: 11,
    color: DARK_GRAY,
  },
  confirmationCode: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
  },
  priceLabel: {
    fontSize: 11,
    color: DARK_GRAY,
    textAlign: 'right',
  },
  priceValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: TEAL,
    textAlign: 'right',
  },
  actionButtons: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  modifyButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 121, 140, 0.05)', // Light teal
  },
  modifyButtonText: {
    color: TEAL,
    fontWeight: '500',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 99, 71, 0.05)', // Light red
  },
  cancelButtonText: {
    color: '#FF6347', // Tomato red
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: DARK_GRAY,
    marginTop: 10,
    marginBottom: 20,
  },
  exploreButton: {
    backgroundColor: TEAL,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  exploreButtonText: {
    color: WHITE,
    fontWeight: '500',
  }
});

export default styles;