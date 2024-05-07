import React, { useState, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  TextInput,
  View,
  Alert,
  Text,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../store/auth-context";
import LoadingCar from "../UI/LoadingCar";

export default function Login() {
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();

  const [loginForm, setLoginForm] = useState({
    uname: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

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
      // Simulate login verification delay for 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // In a real app, you would perform actual login verification here
      // For demonstration, I'm just setting dummy user details
      const dummyUserDetails = {
        username: loginForm.uname,
        // Other user details...
      };

      if (dummyUserDetails) {
        authCtx.authenticate(dummyUserDetails.username);
        Alert.alert("Success", "Login Successfully", [{ text: "Okay" }]);
        navigation.navigate("Tabs");
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
          placeholder="Email or Mobile No"
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
          Don't Have an account?
          <Text style={styles.signUpLink}> Sign Up!</Text>
        </Text>
      </View>
      {loading && (
        <View style={styles.loadingContainer}>
          <LoadingCar />
          <Text style={{ fontSize: 24 }}>Logging In...</Text>
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
  signUpLink: {
    color: "#003b88",
    fontWeight: "600",
  },
});
