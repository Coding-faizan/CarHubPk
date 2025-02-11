import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateAndLogin = () => {
    if (!email.includes("@") || email.length < 5) {
      setError("Please enter a valid email.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setError(""); // Clear error if validation passes
    alert("Logged In Successfully!");
    
    // Navigate to HomeScreen after successful login
    navigation.navigate("Welcome");
  };

  return (
    <View style={styles.container}>
      {/* Profile Icon */}
      <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/147/147144.png" }} style={styles.profileIcon} />

      <Text style={styles.title}>Login</Text>

      {/* Error Message */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={24} color="#FFD700" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#D3D3D3"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setError(""); // Clear error when typing
          }}
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={24} color="#FFD700" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#D3D3D3"
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setError(""); // Clear error when typing
          }}
        />
      </View>

      {/* Login Button */}

      <TouchableOpacity style={styles.button} onPress={validateAndLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Navigate to Register */}
      <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}>
        <Text style={styles.registerText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#1E1E2F", // Navy Blue
  },
  profileIcon: {
    width: 80,
    height: 80,
    marginBottom: 20,
    borderRadius: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FFD700", // Gold
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "#FFD700", // Gold
    borderRadius: 10,
    backgroundColor: "#2A2A3C", // Dark Navy
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#FFF", // White text
  },
  button: {
    backgroundColor: "#FFD700", // Gold
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
    color: "#001F3F", // Navy Blue
    fontSize: 18,
    fontWeight: "bold",
  },
  registerText: {
    marginTop: 20,
    color: "#FFD700", // Gold
    fontSize: 16,
  },
});
