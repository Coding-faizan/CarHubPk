import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./components/Navbar/TabNavigator";
import { KeyboardAvoidingView, Platform } from "react-native";
import fetchAds from "./util/http";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : null}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 60}
        >
          <TabNavigator />
        </KeyboardAvoidingView>
      </NavigationContainer>
    </>
  );
};

export default App;
