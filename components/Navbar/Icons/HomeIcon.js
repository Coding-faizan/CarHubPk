import React from "react";
import { View, Text } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Colors } from "../../../constants/colors";

const HomeIcon = ({ focused }) => (
  <View style={{ alignItems: "center", justifyContent: "center" }}>
    <Entypo
      name="home"
      size={24}
      color={focused ? Colors.primary500 : "#111"}
    />
    <Text style={{ fontSize: 12, color: Colors.primary500 }}>Home</Text>
  </View>
);

export default HomeIcon;
