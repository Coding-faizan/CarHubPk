//import { useIsFocused, useNavigation } from "@react-navigation/native";

import { useContext } from "react";
import AdForm from "../components/Ads/AdForm";
import { AuthContext } from "../store/auth-context";
import { useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";
import { Colors } from "../constants/colors";
import LoginFallBack from "../components/LoginFallBack";

export default function PostAd() {
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();

  if (!authCtx.isAuthenticated) {
    return <LoginFallBack />;
  }
  return <AdForm />;
}
