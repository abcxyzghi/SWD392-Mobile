import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { useNavigation } from '@react-navigation/native'; // Import navigation

const SettingsScreen = () => {
  const [isNotificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isDarkThemeEnabled, setDarkThemeEnabled] = useState(false);
  const navigation = useNavigation(); // Initialize navigation

  // Function to handle logout
  const handleLogout = async () => {
    try {
      // Clear any stored user data (like authentication token)
      await AsyncStorage.removeItem('token');
      
      alert('Successfully logged out.');

      // Navigate to login screen
      navigation.replace('LoginScreen');
    } catch (error) {
      alert('Error logging out: ' + error.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Settings</Text>
        
        <View style={styles.settingContainer}>
          <Text style={styles.settingText}>Notifications</Text>
          <Switch
            value={isNotificationsEnabled}
            onValueChange={setNotificationsEnabled}
          />
        </View>

        <View style={styles.settingContainer}>
          <Text style={styles.settingText}>Dark Theme</Text>
          <Switch
            value={isDarkThemeEnabled}
            onValueChange={setDarkThemeEnabled}
          />
        </View>

        <TouchableOpacity style={styles.settingContainer} onPress={() => alert('Account Settings')}>
          <Text style={styles.settingText}>Account Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingContainer} onPress={() => alert('Privacy Policy')}>
          <Text style={styles.settingText}>Privacy Policy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingContainer} onPress={() => alert('Terms of Service')}>
          <Text style={styles.settingText}>Terms of Service</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.settingContainer, styles.logoutButton]} onPress={handleLogout}>
          <Text style={[styles.settingText, styles.logoutText]}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  settingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  settingText: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    marginTop: 30,
    borderBottomWidth: 0,
  },
  logoutText: {
    color: '#f44336',
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
