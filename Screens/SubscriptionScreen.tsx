import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../Styles/SubscriptionStyles';

interface SubscriptionPlan {
    title: string;
    price: string;
    description: string;
    benefits: string[];
}

interface SubscriptionScreenProps {
    navigation: any;
}

const SubscriptionScreen: React.FC<SubscriptionScreenProps> = ({ navigation }) => {
    const plans: SubscriptionPlan[] = [
        {
            title: 'Utforskare (Explorer)',
            price: '99 SEK/month',
            description: 'Perfect for exploring Sweden',
            benefits: [
                'Personalized travel recommendations for Sweden',
                'Basic automated booking assistance',
                'Exclusive deals within Sweden',
                'Travel points for every booking',
            ],
        },
        {
            title: 'Äventyrare (Adventurer)',
            price: '249 SEK/month',
            description: 'Elevate your Swedish adventures',
            benefits: [
                'All Explorer benefits',
                'Advanced personalized recommendations',
                'Priority booking assistance',
                'Free cancellation insurance (Sweden)',
                'Increased travel points',
                'Early access to flash sales',
            ],
        },
        {
            title: 'Globetrotter',
            price: '499 SEK/month',
            description: 'Unlock global travel experiences',
            benefits: [
                'All Adventurer benefits',
                'Global travel recommendations',
                'Dedicated travel concierge',
                'Free travel insurance (Global)',
                'Lounge access (Swedish airports)',
                'Highest travel points',
                'Exclusive VIP events',
            ],
        },
    ];

    const handleChoosePlan = (planTitle: string) => {
        Alert.alert(
            'Confirm Subscription',
            `Are you sure you want to subscribe to ${planTitle}?`,
            [
                { text: 'Cancel', style: 'cancel' },
                { 
                    text: 'Subscribe', 
                    onPress: () => {
                        Alert.alert('Subscription Successful', `You are now subscribed to ${planTitle}!`);
                    }
                },
            ]
        );
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity 
                style={styles.backButton} 
                onPress={handleGoBack}
            >
                <Icon name="chevron-left" size={22} color="#00798C" />
            </TouchableOpacity>
            
            <Text style={styles.header}>Choose Your Travel Plan</Text>
            
            {plans.map((plan, index) => (
                <View key={index} style={styles.planContainer}>
                    <Text style={styles.planTitle}>{plan.title}</Text>
                    <Text style={styles.price}>{plan.price}</Text>
                    <Text style={styles.description}>{plan.description}</Text>
                    <View style={styles.benefitsContainer}>
                        {plan.benefits.map((benefit, i) => (
                            <View key={i} style={styles.benefit}>
                                <Icon name="check" size={16} color="#00798C" />
                                <Text style={styles.benefitText}>{benefit}</Text>
                            </View>
                        ))}
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleChoosePlan(plan.title)}
                    >
                        <Text style={styles.buttonText}>Choose Plan</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
    );
};

export default SubscriptionScreen;
