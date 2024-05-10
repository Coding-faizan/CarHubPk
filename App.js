import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabNavigator from "./components/Navbar/TabNavigator";
import AdDetails from "./screens/AdDetails";
import Home from "./screens/Home";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { PostAd } from "./screens";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Favourites from "./screens/Favourites";
import About from "./screens/About";
import FAQ from "./screens/FAQ";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="AdDetails" component={AdDetails} />
      <Stack.Screen name="Favourites" component={Favourites} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="FAQ" component={FAQ} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    >
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="AdDetails" component={AdDetails} />
      <Stack.Screen name="Favourites" component={Favourites} />
    <Stack.Screen name="About" component={About} />
    <Stack.Screen name="FAQ" component={FAQ} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

const App = () => {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </>
  );
};

export default App;
