import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');
const HEADER_HEIGHT = Platform.OS === 'ios' ? 90 : 80;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 44 : 0;

// Colors
const TEAL = '#4FBBB2';
const LIGHT_TEAL = '#9DD9E0';
const DARK_TEAL = '#3A8A84';
const BOOKING_COLOR = '#4FBBB2';  // teal
const PROMO_COLOR = '#FF9F1C';    // orange
const SYSTEM_COLOR = '#636E72';   // slate
const REWARD_COLOR = '#F172A1';   // pink
const LIGHT_GRAY = '#F2F2F2';
const GRAY = '#DDDDDD';
const MEDIUM_GRAY = '#999999';
const DARK_GRAY = '#555555';
const TEXT_COLOR = '#333333';
const WHITE = '#FFFFFF';
const UNREAD_COLOR = '#F0F9FA';

// Define the styles with explicit typing
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  header: {
    height: HEADER_HEIGHT,
    paddingTop: STATUS_BAR_HEIGHT,
    backgroundColor: WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: GRAY,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: TEXT_COLOR,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  settingsButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  actionsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: WHITE,
  },
  notificationCount: {
    fontSize: 14,
    color: MEDIUM_GRAY,
    fontWeight: '500',
  },
  markAllReadButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: LIGHT_GRAY,
  },
  markAllReadText: {
    fontSize: 12,
    fontWeight: '500',
    color: TEAL,
  },
  listContainer: {
    paddingBottom: 20,
  },
  notificationItem: {
    backgroundColor: WHITE,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: GRAY,
    overflow: 'hidden',
  },
  unreadNotification: {
    backgroundColor: UNREAD_COLOR,
    borderColor: LIGHT_TEAL,
  },
  notificationContent: {
    flexDirection: 'row',
    padding: 16,
  },
  unreadDot: {
    position: 'absolute',
    top: 16,
    left: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: TEAL,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notificationTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: TEXT_COLOR,
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: DARK_GRAY,
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 12,
    color: MEDIUM_GRAY,
  },
  notificationImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  deleteButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#FFF0F0',
    borderTopWidth: 1,
    borderTopColor: GRAY,
  },
  emptyStateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: DARK_GRAY,
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: MEDIUM_GRAY,
    textAlign: 'center',
    marginTop: 8,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: GRAY,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryName: {
    fontSize: 16,
    color: TEXT_COLOR,
    marginLeft: 12,
  },
  // Type-specific container colors
  bookingIconContainer: {
    backgroundColor: BOOKING_COLOR,
  },
  promoIconContainer: {
    backgroundColor: PROMO_COLOR,
  },
  systemIconContainer: {
    backgroundColor: SYSTEM_COLOR,
  },
  rewardIconContainer: {
    backgroundColor: REWARD_COLOR,
  },
});

export default styles;