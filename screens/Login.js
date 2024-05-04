import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  TextInput,
  View,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useDispatch } from "react-redux";
import { setUser } from "../store/auth";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loginForm, setLoginForm] = useState({
    uname: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const changeHandler = (name, value) => {
    setLoginForm((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    if (loginForm.uname === "" || loginForm.password === "") {
      Alert.alert("Invalid Input", "All fields are required!", [
        { text: "Okay" },
      ]);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://motorpak.000webhostapp.com/users_api/login_verify_api.php",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: loginForm.uname,
            password: loginForm.password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.success) {
        setUserDetails(data.userDetails); // Store user details in userDetails state
        dispatch(setUser(data.userDetails)); // Optionally, store user details in Redux
        Alert.alert("Success", "Login Successfully", [{ text: "Okay" }]);
        navigation.navigate("Home");
      } else {
        Alert.alert("Error", "Invalid email or password!", [{ text: "Okay" }]);
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "An error occurred. Please try again later.", [
        { text: "Okay" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.closeIcon}>
        <TouchableOpacity onPress={() => navigation.navigate("Tabs")}>
          <Ionicons name="close" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Log In</Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Username or Mobile No"
          style={styles.input}
          onChangeText={(value) => changeHandler("uname", value)}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          onChangeText={(value) => changeHandler("password", value)}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>
        <Text onPress={() => navigation.navigate("Signup")}>
          Don't Have an account? Sign Up!
        </Text>
      </View>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
  },
  signUpContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  signUpText: {
    color: "#007AFF",
    fontSize: 46,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  formContainer: {
    alignItems: "center",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: "100%",
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: "#007AFF",
    borderRadius: 5,
    padding: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject, // Cover the entire screen
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Semi-transparent white background
    alignItems: "center",
    justifyContent: "center",
  },
  closeIcon: {
    position: "absolute",
    top: 40,
    right: 10,
    zIndex: 999,
  },
});
