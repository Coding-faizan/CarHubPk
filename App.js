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
import { NumberOfAdsProvider } from "./store/noOfAdsContext";

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
