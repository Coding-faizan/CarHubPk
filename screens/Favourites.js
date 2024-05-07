import { useContext } from "react";
import { View, Text } from "react-native";
import { AuthContext } from "../store/auth-context";
import { useNavigation } from "@react-navigation/native";

export default function Favourites() {
  const authCtx = useContext(AuthContext);

  if (!authCtx.isAuthenticated) {
    useNavigation().navigate("Login");
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 24 }}>Favourites screen</Text>
    </View>
  );
}
