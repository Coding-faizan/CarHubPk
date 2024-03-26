import React from "react";
import { View, Text, Platform } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../../../constants/colors";

const PostAdIcon = ({ focused }) => (
  <View
    style={{
      alignItems: "center",
      justifyContent: "center",
      top: Platform.OS === "ios" ? -10 : -20,
      width: Platform.OS === "ios" ? 50 : 60,
      height: Platform.OS === "ios" ? 50 : 60,
      borderRadius: Platform.OS === "ios" ? 25 : 30,
      backgroundColor: Colors.primary,
    }}
  >
    <AntDesign name="pluscircle" size={24} color={"#111"} />
  </View>
);

export default PostAdIcon;
