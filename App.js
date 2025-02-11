import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppLoading from "expo-app-loading";
import AsyncStorage from "@react-native-async-storage/async-storage";

import TabNavigator from "./components/Navbar/TabNavigator";
import AdDetails from "./screens/AdDetails";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Favourites from "./screens/Favourites";
import About from "./screens/About";
import FAQ from "./screens/FAQ";
import TaxCalculatorScreen from "./screens/TaxCalculatorScreen";
import FilterCarScreen from "./screens/FilterCarScreen";
import SearchedData from "./screens/SearchedData";
import Search from "./screens/Search"

import { NumberOfAdsProvider } from "./store/noOfAdsContext";




import CustomerDashboard from "./screens/CustomerDashboard";
import SignUpScreen from "./screens/SignUpScreen";
import LoginScreen from "./screens/LoginScreen";
import FirstScreen from "./screens/FirstScreen";
import ServiceProvider from "./screens/ServiceProvider";
import WorkshopDetailsScreen from "./screens/WorkshopDashboard";
import BookingScreen from "./screens/BookAppointment";
import SelectionScreen from "./screens/SelectionPage";
import MapScreen from "./screens/MapPage";

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
      <Stack.Screen name="TaxCalculatorScreen" component={TaxCalculatorScreen} />
      <Stack.Screen name="FilterCarScreen" component={FilterCarScreen} />
      <Stack.Screen name="SearchedData" component={SearchedData} />
      <Stack.Screen name="Search" component={Search} />
      
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: "Login" }} />

        <Stack.Screen name="Welcrome" component={FirstScreen} options={{ title: "Workshop Hub" }} />
          <Stack.Screen name="Select" component={SelectionScreen} options={{ title:"Workshop Hub" }} />
        <Stack.Screen name="SeriviceProvider" component={ServiceProvider} options={{ title: "Service Provider" }} />
        <Stack.Screen name="WorkshopDetailsScreen" component={WorkshopDetailsScreen} options={{ title: "Workshop Details" }} />
        <Stack.Screen name="BookingScreen" component={BookingScreen} options={{ title: "Book Appointment" }} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ title: "Sign Up" }} />
        <Stack.Screen name="Customer Dashboard" component={CustomerDashboard} options={{ title: "Dashboard" }} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
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
      <Stack.Screen name="TaxCalculatorScreen" component={TaxCalculatorScreen} />
      <Stack.Screen name="FilterCarScreen" component={FilterCarScreen} />
      <Stack.Screen name="SearchedData" component={SearchedData} />
      <Stack.Screen name="Search" component={Search} />
       <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: "Login" }} />

        <Stack.Screen name="Welcrome" component={FirstScreen} options={{ title: "Workshop Hub" }} />
          <Stack.Screen name="Select" component={SelectionScreen} options={{ title:"Workshop Hub" }} />
        <Stack.Screen name="SeriviceProvider" component={ServiceProvider} options={{ title: "Service Provider" }} />
        <Stack.Screen name="WorkshopDetailsScreen" component={WorkshopDetailsScreen} options={{ title: "Workshop Details" }} />
        <Stack.Screen name="BookingScreen" component={BookingScreen} options={{ title: "Book Appointment" }} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ title: "Sign Up" }} />
        <Stack.Screen name="Customer Dashboard" component={CustomerDashboard} options={{ title: "Dashboard" }} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
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

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        authCtx.authenticate(storedToken);
      }

      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);

  if (isTryingLogin) {
    return <AppLoading />;
  }

  return <Navigation />;
}

const App = () => {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <NumberOfAdsProvider>
          <Root />
        </NumberOfAdsProvider>
      </AuthContextProvider>
    </>
  );
};

export default App;
