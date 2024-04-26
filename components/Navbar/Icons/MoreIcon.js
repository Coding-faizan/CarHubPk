import React from "react";
import { View, Text } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Colors } from "../../../constants/colors";

const MoreIcon = ({ focused }) => (
  <View style={{ alignItems: "center", justifyContent: "center" }}>
    <SimpleLineIcons
      name="menu"
      size={24}
      color={focused ? Colors.primary500 : "#111"}
    />
    <Text style={{ fontSize: 12, color: Colors.primary500 }}>More</Text>
  </View>
);

export default MoreIcon;
