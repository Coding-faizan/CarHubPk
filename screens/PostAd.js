//import { useIsFocused, useNavigation } from "@react-navigation/native";

import { useContext } from "react";
import AdForm from "../components/Ads/AdForm";
import { AuthContext } from "../store/auth-context";
import { useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";
import { Colors } from "../constants/colors";

export default function PostAd() {
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();

  if (!authCtx.isAuthenticated) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 20 }}>
          In order to sell, you have to Login First!
        </Text>
        <Text
          onPress={() => navigation.navigate("Login")}
          style={{ fontSize: 24, color: Colors.primary800, fontWeight: 700 }}
        >
          Log In
        </Text>
      </View>
    );
  }
  return <AdForm />;
}
