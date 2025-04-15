import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

// Define theme colors
const TEAL = '#00798C'; // Maintaining existing theme color
const BLUE = '#1e4e94'; // Color from the image for headers/titles
const WHITE = '#FFFFFF';
const LIGHT_BLUE = '#e6f2f9';
const DARK_TEAL = '#336749';

const styles = StyleSheet.create({
    // Make colors accessible within the component
   
    container: {
        flex: 1,
        backgroundColor: LIGHT_BLUE,
    },
    // Top image styling
    topImageContainer: {
        height: height * 0.101, // Take up 1/4 of the screen height
        width: width,
        overflow: 'hidden',
    },
    topImage: {
        width: '100%',
        height: '100%',
        borderRadius:30,
    },
    background: {
        flex: 1,
        paddingTop: 20, // Reduced from 60 since we now have the image on top
        paddingHorizontal: 20,
        
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: 'bold',
       // color: BLUE,
        marginBottom: 10,
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginVertical: 10,
    },
    progressDot: {
        width: 15,
        height: 15,
        borderRadius: 7.5,
        backgroundColor: TEAL,
        marginHorizontal: 5,
    },
    progressBar: {
        height: 10,
        backgroundColor: TEAL,
        borderRadius: 5,
        width: width * 0.4,
    },
    subtitle: {
        fontSize: 18,
        color: '#555',
        textAlign: 'center',
        marginBottom: 30,
        paddingHorizontal: 10,
    },
    profileCard: {
        backgroundColor: WHITE,
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    profileImageContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: 'hidden',
        marginBottom: 10,
    },
    profileImage: {
        width: '100%',
        height: '100%',
    },
    profileImagePlaceholder: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
       // color: BLUE,
    },
    interestCard: {
        backgroundColor: WHITE,
        borderRadius: 20,
        padding: 14,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    questionText: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 5,
    },
    progressCounter: {
        fontSize: 18,
        fontWeight: 'bold',
        color: TEAL,
        position: 'absolute',
        right: 25,
        top: 25,
    },
    interestRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    interestIcon: {
        marginRight: 10,
    },
    interestName: {
        fontSize: 32,
        fontWeight: 'bold',
        color: TEAL,
    },
    emojiContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 30,
    },
    emoji: {
        fontSize: 80,
    },
    slider: {
        width: '100%',
        height: 40,
        marginVertical: 20,
    },
    button: {
        backgroundColor: TEAL,
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 6,
    },
    buttonText: {
        color: WHITE,
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default styles;