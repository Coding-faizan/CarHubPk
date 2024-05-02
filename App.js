import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./components/Navbar/TabNavigator";
import AdDetails from "./screens/AdDetails";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Tabs" component={TabNavigator} />
          <Stack.Screen name="AdDetails" component={AdDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
