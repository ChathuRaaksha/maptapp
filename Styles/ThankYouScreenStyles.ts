import { StyleSheet, Dimensions, Platform, StatusBar } from "react-native";

const { width, height } = Dimensions.get("window");

// Theme colors
export const TEAL = '#00798C';
export const WHITE = '#FFFFFF';
export const LIGHT_GRAY = '#F5F5F5';
export const DARK_GRAY = '#666';
export const YELLOW = '#fef08a';

// Safe handling of StatusBar height
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    alignItems: 'center',
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
  userImageContainer: {
    marginTop: statusBarHeight + 190,
    alignItems: 'center',
    zIndex: 10,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: WHITE,
    
  },
  messageContainer: {
    marginTop: 30,
    marginBottom: 20,
    alignItems: 'center',
    borderRadius: 50,
   
  },

  messageText: {
    fontSize: 24,
    fontWeight: 'bold',
   // color: WHITE,
    textAlign: 'center',
    
  },
  card: {
    backgroundColor: WHITE,
    borderRadius: 30,
    padding: 25,
    width: width - 40,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 4,
  },
  usernameText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2d3748',
    marginBottom: 15,
  },
  rewardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(224, 210, 118, 0.3)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 20,
  },
  rewardContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(217, 199, 37, 0.3)',
    paddingVertical: 8,
    paddingHorizontal: 136,
    borderRadius: 20,
    marginBottom: 20,
  },
  rewardText: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: '600',
    color: '#8B6D00',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: LIGHT_GRAY,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 8,
    fontSize: 16,
    color: DARK_GRAY,
    fontWeight: '500',
  },
  doneButton: {
    backgroundColor: TEAL,
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 160,
    marginTop: 40,
    marginVertical:10,
  },
  doneButtonText: {
    color: WHITE,
    fontWeight: '600',
    fontSize: 18,

  },
});

export default styles;