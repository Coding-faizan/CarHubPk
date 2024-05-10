import { View, Text } from "react-native";
import { Colors } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";

export default function LoginFallBack() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20 }}>Please Login First!</Text>
      <Text
        onPress={() => navigation.navigate("Login")}
        style={{ fontSize: 24, color: Colors.primary800, fontWeight: 700 }}
      >
        Log In
      </Text>
    </View>
  );
}
