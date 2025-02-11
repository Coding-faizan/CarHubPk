import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import workshopLogo from "../assets/workshop.png"; // Import workshop logo from assets

export default function FirstScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Workshop Logo */}
      <Image source={workshopLogo} style={styles.workshopLogo} />

      <Text style={styles.title}>Welcome to Workshop Hub</Text>

      {/* Introduction */}
      <Text style={styles.description}>
        Find workshops nearby, compare service rates, and book appointments directly through our platform. Whether you're looking for a tuning service, repairs, or something else, we’ve got you covered.
      </Text>

      {/* Service Provider Option */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ServiceProvider")}
      >
        <Text style={styles.buttonText}>Register as a Service Provider</Text>
      </TouchableOpacity>

      {/* Customer Option */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Select")}
      >
        <Text style={styles.buttonText}>As a Customer</Text>
      </TouchableOpacity>

      {/* Login Option */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#1E1E2F", // Navy background
  },
  workshopLogo: {
    width: 150,
    height: 80,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FFC300", // Gold title
  },
  description: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 40,
    color: "#EAEAEA", // Light grey text
  },
  button: {
    backgroundColor: "#FFC300", // Gold buttons
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#0A1931", // Navy text on buttons
    fontSize: 18,
    fontWeight: "bold",
  },
});
