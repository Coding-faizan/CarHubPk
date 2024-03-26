import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../../../constants/colors";

const AdsIcon = ({ focused }) => (
  <View style={{ alignItems: "center", justifyContent: "center" }}>
    <MaterialCommunityIcons
      name="advertisements"
      size={24}
      color={focused ? Colors.primary : "#111"}
    />
    <Text style={{ fontSize: 12, color: Colors.primary }}>Ads</Text>
  </View>
);

export default AdsIcon;
