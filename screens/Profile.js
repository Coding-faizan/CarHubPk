import { useContext } from "react";
import { View, Text } from "react-native";
import { AuthContext } from "../store/auth-context";
import LoginFallBack from "../components/LoginFallBack";

export default function Profile() {
  const authCtx = useContext(AuthContext);

  if (!authCtx.isAuthenticated) {
    return <LoginFallBack />;
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Profile</Text>
    </View>
  );
}
