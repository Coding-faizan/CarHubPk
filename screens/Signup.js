import { StyleSheet, TextInput, View, ScrollView, Text, Alert, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/auth";

export default function Signup({ navigation }) {
  const dispatch = useDispatch();
  const [signupForm, setSignupForm] = useState({
    uname: "",
    email: "",
    phoneNumber: "",
    password: "",
    location: "",
    registrationDate: ""
  })

  const changeHandler = (name, e) => {
    setSignupForm((prevdata)=>({
      ...prevdata,
      [name]:e
    }))
  }

  const handleSignup = () => {
if(signupForm.uname === "" || signupForm.email === "" || signupForm.phoneNumber === "" || signupForm.password === "" || signupForm.location === "" || signupForm.registrationDate === "") {
      Alert.alert('Invalid Input', 'All fields are required!', [{ text: 'Okay' }]);
      return;
}
    Alert.alert('Signup Attempt', `Username: ${signupForm.uname}\nPassword: ${signupForm.password}\nEmail: ${signupForm.email}\nPhone Number: ${signupForm.phoneNumber}\nLocation: ${signupForm.location}\nRegistration Date: ${signupForm.registrationDate}`);
    dispatch(setUser(signupForm));
    navigation.navigate("Login");
  }

  return (
    <ScrollView style={styles.scroll}>
          <View style={styles.container}>
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Sign Up</Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          value={signupForm.uname}
          placeholder="Username"
          style={styles.input}
          onChangeText={ changeHandler.bind(null,"uname")}
        />
        <TextInput
          value={signupForm.email}
          placeholder="Email"
          style={styles.input}
          onChangeText={changeHandler.bind(null, "email")}
        />
        <TextInput
          value={signupForm.phoneNumber}
          placeholder="Phone_Number"
          keyboardType="numeric"
          style={styles.input}
          onChangeText={changeHandler.bind(null, "phoneNumber")}
        />
        <TextInput
          value={signupForm.password}
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          onChangeText={changeHandler.bind(null, "password")}
        />
        <TextInput
          value={signupForm.location}
          placeholder="Location"
          style={styles.input}
          onChangeText={changeHandler.bind(null, "location")}
        />
        <TextInput
          value={signupForm.registrationDate}
          placeholder="Registration_Date"
          style={styles.input}
          onChangeText={changeHandler.bind(null, "registrationDate")}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
          <Text style={styles.loginText}>Sign Up</Text>
        </TouchableOpacity>
        <Text onPress={() => navigation.navigate("Login")}>Already Have an account? Log In!</Text>
      </View>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll:{
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  signUpContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },

  signUpText: {
    color: '#007AFF',
    fontSize: 46,
    fontWeight: "bold",
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10
  },
  formContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: '100%',
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
  },
});
