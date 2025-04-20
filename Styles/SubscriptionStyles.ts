// SubscriptionStyles.ts

import { StyleSheet } from 'react-native';

const TEAL = '#00798C';
const WHITE = '#FFFFFF';
const LIGHT_GRAY = '#F5F5F5';
const DARK_GRAY = '#666';
const GOLD = '#FFD700';

const subscriptionStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        padding: 20,
    },
    header: {
        marginTop:-30,
        fontSize: 24,
        fontWeight: 'bold',
        color: TEAL,
        marginBottom: 20,
        textAlign: 'center',
    },
    planContainer: {
        backgroundColor: 'rgba(215, 237, 238, 0.8)', 
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
    },
    planTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: TEAL,
        marginBottom: 10,
        textAlign: 'center',
    },
    price: {
        fontSize: 28,
        fontWeight: 'bold',
        color: DARK_GRAY,
        marginBottom: 10,
        textAlign: 'center',
    },
    backButton: {
        marginTop:50,
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
        zIndex: 1,
      },
    description: {
        fontSize: 16,
        color: DARK_GRAY,
        marginBottom: 15,
        textAlign: 'center',
    },
    benefitsContainer: {
        marginBottom: 15,
    },
    benefit: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    benefitText: {
        fontSize: 15,
        color: DARK_GRAY,
        marginLeft: 8,
    },
    button: {
        backgroundColor: TEAL,
        borderRadius: 25,
        paddingVertical: 12,
        alignItems: 'center',
    },
    buttonText: {
        color: WHITE,
        fontSize: 16,
        fontWeight: 'bold',
    },
    goldStar: {
        color: GOLD,
    },
});

export default subscriptionStyles;
