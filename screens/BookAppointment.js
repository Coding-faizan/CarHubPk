import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function BookingScreen({ route, navigation }) {
  const { workshop } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking for {workshop.name}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Service: <Text style={styles.infoValue}>{workshop.service}</Text>
        </Text>
        <Text style={styles.infoText}>
          Price: <Text style={styles.priceValue}>{workshop.price}</Text>
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => alert("Appointment Confirmed!")}>
        <Text style={styles.buttonText}>Confirm Booking</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back to List</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B1F3B",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFC107",
    textAlign: "center",
    marginBottom: 20,
  },
  infoContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  infoText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  infoValue: {
    fontWeight: "bold",
    color: "#333",
  },
  priceValue: {
    fontWeight: "bold",
    color: "#28a745",
  },
  button: {
    backgroundColor: "#FFC107",
    padding: 14,
    borderRadius: 8,
    marginTop: 20,
    width: "80%",
    alignItems: "center",
    shadowColor: "#FFC107",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: "#1B1F3B",
    fontWeight: "bold",
    fontSize: 16,
  },
  backButton: {
    marginTop: 15,
    padding: 10,
  },
  backButtonText: {
    color: "#FFC107",
    fontSize: 16,
    fontWeight: "bold",
  },
});
