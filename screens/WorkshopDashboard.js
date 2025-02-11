import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";

const workshopImages = {
  autoCare: require("../assets/w1.jpg"),
  speedyMotors: require("../assets/w2.jpg"),
  quickFix: require("../assets/w3.jpg"),
  proAuto: require("../assets/w2.jpg"),
};

// Add location coordinates for workshops
const workshops = [
  { id: "1", name: "Auto Care Workshop", service: "Tuning", price: "$50", description: "Expert tuning services to keep your car running smoothly and efficiently.", image: workshopImages.autoCare, location: { latitude: 37.7749, longitude: -122.4194 } },
  { id: "2", name: "Speedy Motors", service: "Oil Change", price: "$30", description: "Quick and professional oil change to ensure optimal engine performance.", image: workshopImages.speedyMotors, location: { latitude: 34.0522, longitude: -118.2437 } },
  { id: "3", name: "Quick Fix Garage", service: "Brake Service", price: "$40", description: "Reliable brake service for enhanced safety and control on the road.", image: workshopImages.quickFix, location: { latitude: 40.7128, longitude: -74.0060 } },
  { id: "4", name: "Pro Auto Repair", service: "Engine Check", price: "$60", description: "Comprehensive engine diagnostics and repairs to keep your vehicle in top shape.", image: workshopImages.proAuto, location: { latitude: 51.5074, longitude: -0.1278 } },
];

export default function WorkshopDetailsScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Find the Best Car Workshops</Text>
        <Text style={styles.pageDescription}>
          Compare prices, services, and quality before booking an appointment. Your car deserves the best care!
        </Text>
      </View>

      <FlatList
        data={workshops}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.workshopName}>{item.name}</Text>
            <Text style={styles.serviceText}>Service: <Text style={styles.serviceValue}>{item.service}</Text></Text>
            <Text style={styles.serviceText}>Price: <Text style={styles.priceValue}>{item.price}</Text></Text>
            <Text style={styles.description}>{item.description}</Text>

            {/* Book Appointment Button */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("BookingScreen", { workshop: item })}
            >
              <Text style={styles.buttonText}>Book Appointment</Text>
            </TouchableOpacity>

            {/* See Location Button */}
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#28a745", marginTop: 8 }]}
              onPress={() => navigation.navigate("MapScreen", { workshop: item })}
            >
              <Text style={[styles.buttonText, { color: "#fff" }]}>See Location</Text>
            </TouchableOpacity>
          </View>
        )}
        scrollEnabled={false} 
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1B1F3B" },
  header: { padding: 20, backgroundColor: "#FFC107", borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  title: { fontSize: 26, fontWeight: "bold", color: "#1B1F3B", textAlign: "center", marginBottom: 5 },
  pageDescription: { fontSize: 14, color: "#333", textAlign: "center", paddingHorizontal: 15, opacity: 0.9 },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    margin: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  image: { width: "100%", height: 180, borderRadius: 12, marginBottom: 10 },
  workshopName: { fontSize: 20, fontWeight: "bold", marginBottom: 5, color: "#1B1F3B" },
  serviceText: { fontSize: 14, color: "#555", marginBottom: 3 },
  serviceValue: { fontWeight: "bold", color: "#333" },
  priceValue: { fontWeight: "bold", color: "#28a745" },
  description: { fontSize: 14, color: "#555", marginVertical: 8, fontStyle: "italic" },
  button: {
    backgroundColor: "#FFC107",
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
    shadowColor: "#FFC107",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: { color: "#1B1F3B", fontWeight: "bold", fontSize: 16 },
});
