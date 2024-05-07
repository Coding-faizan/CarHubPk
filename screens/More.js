import React from "react";
import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function More() {
  const navigation = useNavigation();

  const navigateToFavourites = () => {
    navigation.navigate("Favourites");
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Pressable onPress={navigateToFavourites}>
        <View style={{ borderStyle: "solid", borderWidth: 1 }}>
          <Text style={{ fontSize: 24 }}>Favourites</Text>
        </View>
      </Pressable>
    </View>
  );
}
