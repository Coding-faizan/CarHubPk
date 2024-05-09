import React, { useContext } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../store/auth-context";

export default function More() {
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);

  const navigateToTax = () => {
    navigation.navigate("Favourites");
  };
  const navigateToFavourites = () => {
    navigation.navigate("Favourites");
  };
  const navigateToFAQ = () => {
    navigation.navigate("FAQ");
  };
  const navigateToAbout = () => {
    navigation.navigate("About");
  };

  return (
    <View style={styles.all}>
      <View style={styles.more}>
        <Text style={styles.moreText}>More</Text>
      </View>
      <View style={styles.content}>
        <Pressable onPress={navigateToTax}>
          <LinearGradient
            style={styles.item}
            colors={[Colors.primary200, Colors.primary500, Colors.primary200]}
          >
            <Text style={styles.text}>Calculate Tax</Text>
          </LinearGradient>
        </Pressable>
        {authCtx.isAuthenticated && (
          <Pressable onPress={navigateToFavourites}>
            <LinearGradient
              style={styles.item}
              colors={[Colors.primary200, Colors.primary500, Colors.primary200]}
            >
              <Text style={styles.text}>Favourites</Text>
            </LinearGradient>
          </Pressable>
        )}
        <Pressable onPress={navigateToFAQ}>
          <LinearGradient
            style={styles.item}
            colors={[Colors.primary200, Colors.primary500, Colors.primary200]}
          >
            <Text style={styles.text}>F.A.Qs</Text>
          </LinearGradient>
        </Pressable>
        <Pressable onPress={navigateToAbout}>
          <LinearGradient
            style={styles.item}
            colors={[Colors.primary200, Colors.primary500, Colors.primary200]}
          >
            <Text style={styles.text}>About Us</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  more: {
    backgroundColor: "#ECECEC",
    // textAlign:"center",
    padding: 10,
    paddingTop: 15,
    marginTop: 40,
    marginBottom: 20,
  },

  moreText: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
  },
  content: {
    // flex:1,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
  },
  item: {
    padding: 20,
    borderWidth: 1,
    borderColor: "white",
    margin: 10,
    width: 300,
    borderRadius: 30,
    backgroundColor: Colors.primary400,
    elevation: 5,
  },
  text: {
    fontSize: 24,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
});
