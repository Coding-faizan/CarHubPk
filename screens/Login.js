import {
  StyleSheet,
  TextInput,
  View,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/auth";

export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const [loginForm, setLoginForm] = useState({
    uname: "",
    password: "",
  });

  const changeHandler = (name, e) => {
    setLoginForm((prevdata) => ({
      ...prevdata,
      [name]: e,
    }));
  };

  const handleLogin = () => {
    if (loginForm.uname === "" || loginForm.password === "") {
      Alert.alert("Invalid Input", "All fields are required!", [
        { text: "Okay" },
      ]);
      return;
    }
    Alert.alert(`Welcome ${loginForm.uname}`);
    dispatch(setUser(loginForm));
    navigation.navigate("Tabs");
  };

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Log In</Text>
        </View>
        <View style={styles.formContainer}>
          <TextInput
            placeholder="Username"
            style={styles.input}
            onChangeText={changeHandler.bind(null, "uname")}
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry
            onChangeText={changeHandler.bind(null, "password")}
          />
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
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
});
