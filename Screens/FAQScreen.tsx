import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../Styles/FAQStyle";
import DrawerNavigator from "./DrawerNavigator";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  expanded: boolean;
}

interface CategoryItem {
  id: string;
  name: string;
  icon: string;
}

interface FAQScreenProps {
  navigation: any;
}

// FAQ Categories
const categories: CategoryItem[] = [
  { id: "all", name: "All FAQs", icon: "list" },
  { id: "booking", name: "Booking", icon: "calendar" },
  { id: "payment", name: "Payment", icon: "credit-card" },
  { id: "account", name: "Account", icon: "user" },
  { id: "service", name: "Services", icon: "suitcase" },
  { id: "refund", name: "Refunds", icon: "money" },
];

// Sample FAQ data
const faqData: FAQItem[] = [
  {
    id: "1",
    question: "How do I book a trip?",
    answer: "To book a trip, navigate to the destination page, select your preferred dates and number of travelers, then proceed to checkout. You can pay using various payment methods including credit cards, PayPal, or bank transfer.",
    category: "booking",
    expanded: false,
  },
  {
    id: "2",
    question: "Can I modify my booking after confirmation?",
    answer: "Yes, you can modify your booking up to 48 hours before your scheduled trip. Go to 'My Bookings' section in your profile, select the booking you want to modify, and click on 'Modify Booking'. Additional charges may apply based on the changes.",
    category: "booking",
    expanded: false,
  },
  {
    id: "3",
    question: "What payment methods are accepted?",
    answer: "We accept Visa, Mastercard, American Express, PayPal, and bank transfers. All payments are processed securely through our encrypted payment gateway.",
    category: "payment",
    expanded: false,
  },
  {
    id: "4",
    question: "How do I reset my password?",
    answer: "To reset your password, click on the 'Forgot Password' link on the login page. Enter your registered email address and follow the instructions sent to your email to create a new password.",
    category: "account",
    expanded: false,
  },
  {
    id: "5",
    question: "What is your cancellation policy?",
    answer: "Our cancellation policy varies depending on the type of booking. Generally, cancellations made 7 days before the trip are eligible for a full refund. Cancellations made 3-7 days before receive a 50% refund, and less than 3 days are non-refundable. Check the specific terms for your booking for exact details.",
    category: "refund",
    expanded: false,
  },
  {
    id: "6",
    question: "How do I earn and redeem points?",
    answer: "You earn points for every booking made through our platform. Standard bookings earn 1 point per dollar spent. You can redeem these points for discounts on future bookings, special experiences, or partner offers through the Rewards section in your profile.",
    category: "service",
    expanded: false,
  },
  {
    id: "7",
    question: "What should I do if I need assistance during my trip?",
    answer: "If you need assistance during your trip, you can contact our 24/7 customer support through the app or by calling our emergency hotline provided in your booking confirmation. Our local representatives are also available to assist at your destination.",
    category: "service",
    expanded: false,
  },
  {
    id: "8",
    question: "How long does the refund process take?",
    answer: "Once approved, refunds typically take 5-10 business days to appear in your account, depending on your payment method and financial institution. Credit card refunds usually process faster than bank transfers.",
    category: "refund",
    expanded: false,
  },
];

const FAQScreen: React.FC<FAQScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [faqs, setFaqs] = useState<FAQItem[]>(faqData);
  const handleLogout = () => {
    // Implement your logout logic here
    // For example:
    // AuthService.logout();
    navigation.navigate('Login'); // Navigate to login screen after logout
  };
  // Toggle FAQ expansion
  const toggleExpand = (id: string) => {
    const updatedFaqs = faqs.map((faq) =>
      faq.id === id ? { ...faq, expanded: !faq.expanded } : faq
    );
    setFaqs(updatedFaqs);
  };

  // Filter FAQs based on search and category
  const getFilteredFaqs = () => {
    return faqs.filter((faq) => {
      const matchesSearch =
        searchQuery === "" ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || faq.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  };

  const filteredFaqs = getFilteredFaqs();

  // Render category item
  const renderCategoryItem = ({ item }: { item: CategoryItem }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.id && styles.selectedCategoryItem,
      ]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <Icon
        name={item.icon}
        size={18}
        color={selectedCategory === item.id ? "#FFFFFF" : "#00798C"}
      />
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item.id && styles.selectedCategoryText,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  // Render FAQ item
  const renderFaqItem = ({ item }: { item: FAQItem }) => (
    <TouchableOpacity
      style={[styles.faqItem, item.expanded && styles.expandedFaqItem]}
      onPress={() => toggleExpand(item.id)}
      activeOpacity={0.7}
    >
      <View style={styles.faqHeader}>
        <Text style={styles.questionText}>{item.question}</Text>
        <Icon
          name={item.expanded ? "chevron-up" : "chevron-down"}
          size={16}
          color="#00798C"
        />
      </View>
      {item.expanded && (
        <View style={styles.answerContainer}>
          <Text style={styles.answerText}>{item.answer}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  // Contact support component
  const ContactSupport = () => (
    <View style={styles.contactSupportContainer}>
      <View style={styles.contactHeader}>
        <Icon name="headphones" size={24} color="#00798C" />
        <Text style={styles.contactTitle}>Still have questions?</Text>
      </View>
      <Text style={styles.contactSubtitle}>
        Our support team is here to help you
      </Text>
      <TouchableOpacity
        style={styles.contactButton}
        onPress={() => navigation.navigate("Support")}
      >
        <Text style={styles.contactButtonText}>Contact Support</Text>
      </TouchableOpacity>
    </View>
  );

  // FAQ screen content
  const FAQContent = () => (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Frequently Asked Questions</Text>
        <View style={styles.emptyView} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for questions..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => setSearchQuery("")}
          >
            <Icon name="times" size={18} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* FAQs List */}
      <ScrollView
        style={styles.faqListContainer}
        showsVerticalScrollIndicator={false}
      >
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => (
            <View key={faq.id}>
              {renderFaqItem({ item: faq })}
            </View>
          ))
        ) : (
          <View style={styles.noResultsContainer}>
            <Icon name="search" size={50} color="#DDDDDD" />
            <Text style={styles.noResultsText}>No FAQs found</Text>
            <Text style={styles.noResultsSubtext}>
              Try adjusting your search or category filter
            </Text>
          </View>
        )}

        {/* Contact Support Section */}
        <ContactSupport />
        
        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );

  // Wrap with DrawerNavigator
  return (
    <DrawerNavigator navigation={navigation} handleLogout={handleLogout}>
      <FAQContent />
    </DrawerNavigator>
  );
};

export default FAQScreen;