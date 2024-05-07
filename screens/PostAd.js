import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import AdForm from "../components/Ads/AdForm";
import { useNavigation } from "@react-navigation/native";

export default function PostAd() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigation = useNavigation();

  return (
    <View >
      {isAuthenticated ? (
        <AdForm />
      ) : (
        <View style={styles.loginContainer}>
          <Text style={styles.emoji}>😔</Text>
          <Text style={styles.loginText}>Login to Post Your Ad</Text>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
 
  loginContainer: {
    marginTop:270,
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: {
    fontSize: 48,
    marginBottom: 20,
  },
  loginText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
