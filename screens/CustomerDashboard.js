import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function CustomerDashboard({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Heading with Icon */}
      <View style={styles.header}>
        <Icon name="person-circle-outline" size={50} color="#fff" />
        <Text style={styles.heading}>Customer Dashboard</Text>
      </View>

      {/* Dashboard Buttons */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FindWorkshops')}>
        <Text style={styles.buttonText}>Find Workshops</Text>
        <Icon name="chevron-forward" size={24} color="#fff" style={styles.arrowIcon} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Appointments')}>
        <Text style={styles.buttonText}>View Appointments</Text>
        <Icon name="chevron-forward" size={24} color="#fff" style={styles.arrowIcon} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.buttonText}>Settings</Text>
        <Icon name="chevron-forward" size={24} color="#fff" style={styles.arrowIcon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E2C',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 12,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 10,
  },

  arrowIcon: {
    marginLeft: 10,
  },
});
