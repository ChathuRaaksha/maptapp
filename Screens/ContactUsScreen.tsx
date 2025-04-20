import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import contactUsStyles from '../Styles/ContactUsStyles';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface ContactUsProps {
  navigation: any;
}

const ContactUsScreen: React.FC<ContactUsProps> = ({ navigation }) => {
  const [form, setForm] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    if (!validateEmail(form.email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Thank you!', 'Your message has been sent.');
      setForm({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#FFFFFF' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={contactUsStyles.container} keyboardShouldPersistTaps="handled">
        <Image
          source={require('../assets/img/login.png')}
          style={contactUsStyles.curvedBackground}
        />

        <View style={contactUsStyles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={contactUsStyles.headerTitle}>Contact Us</Text>
          <View style={{ width: 24 }} />
        </View>

        <Text style={contactUsStyles.introText}>
          We'd love to hear from you! Please fill out the form below and we'll get back to you as soon as possible.
        </Text>

        <View style={contactUsStyles.card}>
          <View style={contactUsStyles.formGroup}>
            <Text style={contactUsStyles.label}>Name</Text>
            <TextInput
              style={contactUsStyles.input}
              placeholder="Your Name"
              value={form.name}
              onChangeText={text => handleChange('name', text)}
              autoCapitalize="words"
              returnKeyType="next"
            />
          </View>

          <View style={contactUsStyles.formGroup}>
            <Text style={contactUsStyles.label}>Email</Text>
            <TextInput
              style={contactUsStyles.input}
              placeholder="you@example.com"
              value={form.email}
              onChangeText={text => handleChange('email', text)}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
            />
          </View>

          <View style={contactUsStyles.formGroup}>
            <Text style={contactUsStyles.label}>Message</Text>
            <TextInput
              style={[contactUsStyles.input, contactUsStyles.textArea]}
              placeholder="Your Message"
              value={form.message}
              onChangeText={text => handleChange('message', text)}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity
            style={[contactUsStyles.button, loading && { backgroundColor: '#666' }]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={contactUsStyles.buttonText}>{loading ? 'Sending...' : 'Send Message'}</Text>
          </TouchableOpacity>
        </View>

        <View style={contactUsStyles.infoSection}>
          <Icon name="envelope" size={18} color="#00798C" />
          <Text style={contactUsStyles.infoText}>support@maptgo.com</Text>
        </View>
        <View style={contactUsStyles.infoSection}>
          <Icon name="phone" size={18} color="#00798C" />
          <Text style={contactUsStyles.infoText}>+46 762 646 237</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ContactUsScreen;
