import React, { useContext, useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { setUser } from "../store/auth";
import { AuthContext } from "../store/auth-context";

import { Ionicons } from "@expo/vector-icons"; // Import Ionicons from @expo/vector-icons

export default function Signup({ navigation }) {
  const authCtx = useContext(AuthContext);

  const [signupForm, setSignupForm] = useState({
    uname: "",
    email: "",
    phoneNumber: "",
    password: "",
    location: "",
  });
  const [isLoading, setIsLoading] = useState(false); // State to manage loading state

  const changeHandler = (name, value) => {
    setSignupForm((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));
  };

  const handleSignup = async () => {
    if (
      signupForm.uname === "" ||
      signupForm.email === "" ||
      signupForm.phoneNumber === "" ||
      signupForm.password === "" ||
      signupForm.location === ""
    ) {
      Alert.alert("Invalid Input", "All fields are required!", [
        { text: "Okay" },
      ]);
      return;
    }

    // Set loading state to true
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://motorpak.000webhostapp.com/users_api/create_user_api.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: signupForm.uname,
            email: signupForm.email,
            phoneNumber: signupForm.phoneNumber,
            password: signupForm.password,
            location: signupForm.location,
          }),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        // If the response is successful, navigate to Login
        navigation.navigate("Login");
      } else {
        // If the response indicates an error, show an alert with the error message
        Alert.alert("Signup Failed", responseData.message);
      }
    } catch (error) {
      // If an error occurs during the fetch operation, show an alert with the error message
      Alert.alert("Error", "Already User Exists with Email or phonenumber !");
      //console.error("Error:", error);
    } finally {
      // Set loading state to false after API call is finished
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      )}
      <View style={styles.closeIcon}>
        <TouchableOpacity onPress={() => navigation.navigate("Tabs")}>
          <Ionicons name="close" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </View>
        <TextInput
          value={signupForm.uname}
          placeholder="Username"
          style={styles.input}
          onChangeText={(value) => changeHandler("uname", value)}
        />
        <TextInput
          value={signupForm.email}
          placeholder="Email"
          style={styles.input}
          onChangeText={(value) => changeHandler("email", value)}
        />
        <TextInput
          value={signupForm.phoneNumber}
          placeholder="Phone Number"
          keyboardType="numeric"
          style={styles.input}
          onChangeText={(value) => changeHandler("phoneNumber", value)}
        />
        <TextInput
          value={signupForm.password}
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          onChangeText={(value) => changeHandler("password", value)}
        />
        <TextInput
          value={signupForm.location}
          placeholder="Location"
          style={styles.input}
          onChangeText={(value) => changeHandler("location", value)}
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
          <Text style={styles.loginText}>Sign Up</Text>
        </TouchableOpacity>
        <Text onPress={() => navigation.navigate("Login")}>
          Already Have an account?
          <Text style={{ color: "#003b88", fontWeight: 600 }}> Log In!</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
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
    width: "100%", // Adjusted width for centering
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
  closeIcon: {
    position: "absolute",
    top: 40,
    right: 10,
    zIndex: 999,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
});
