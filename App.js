import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./components/Navbar/TabNavigator";
import AdDetails from "./screens/AdDetails";
import store from "./store/index";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import { StyleSheet } from "react-native";
import { Home } from "./screens";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
      <Provider store={store}>
        {/* <StatusBar style="dark" /> */}
        <NavigationContainer style={styles.container}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Tabs" component={TabNavigator} />
            <Stack.Screen name="AdDetails" component={AdDetails} />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </Provider>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop:100,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
