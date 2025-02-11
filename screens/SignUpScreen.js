import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const validateAndSignUp = () => {
    if (!username || username.length < 3) {
      setError("Username must be at least 3 characters long.");
      return;
    }
    if (!email.includes("@") || email.length < 5) {
      setError("Please enter a valid email.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError(""); // Clear error if validation passes
    alert("Signed Up Successfully!");
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/147/147144.png" }} style={styles.profileIcon} />
      <Text style={styles.title}>Sign Up</Text>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      
      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={24} color="#FFD700" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#bbb"
          value={username}
          onChangeText={(text) => {
            setUsername(text);
            setError("");
          }}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={24} color="#FFD700" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#bbb"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setError("");
          }}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={24} color="#FFD700" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#bbb"
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setError("");
          }}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={24} color="#FFD700" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#bbb"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            setError("");
          }}
        />
      </View>
      
      <TouchableOpacity style={styles.button} onPress={validateAndSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}> 
        <Text style={styles.registerText}>Already have an account? Login</Text>
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
    backgroundColor: "#1E1E2F",
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
    color: "#FFD700",
  },
  errorText: {
    color: "#FF4C4C",
    fontSize: 14,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "#FFD700",
    borderRadius: 10,
    backgroundColor: "#2A2A3C",
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
    color: "#FFF",
  },
  button: {
    backgroundColor: "#FFD700",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#1E1E2F",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerText: {
    marginTop: 20,
    color: "#FFD700",
    fontSize: 16,
  },
});