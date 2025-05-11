import { StyleSheet } from 'react-native';

export const splashScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00798C', // Teal background color from the image
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
  //  color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  luggageIcon: {
    width: 200,
    height: 80,
    marginLeft: 5,
    // Remove tintColor if your PNG already has the right color
    tintColor: 'white',
  },

  logoText2: {
    color: '#336749', //#0077B5 Color for "in"
    fontSize: 58, // Slightly smaller than MAPT
    fontWeight: 'bold',
    marginLeft:-50,
    zIndex: 2, // Ensure text appears in front of the image
  },
  tagline: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
  },
});

export default splashScreenStyles;