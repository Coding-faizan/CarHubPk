import React from "react";
import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "../../../constants/colors";

const ProfileIcon = ({ focused }) => (
  <View style={{ alignItems: "center", justifyContent: "center" }}>
    <FontAwesome
      name="user-circle-o"
      size={24}
      color={focused ? Colors.primary : "#111"}
    />
    <Text style={{ fontSize: 12, color: Colors.primary }}>Profile</Text>
  </View>
);

export default ProfileIcon;
