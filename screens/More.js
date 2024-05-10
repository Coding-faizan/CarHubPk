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
      <View style={styles.two}></View>
      {/* <View style={styles.more}>
        <Text style={styles.moreText}>More</Text>
      </View> */}
      <View style={styles.content}>
        <Pressable onPress={navigateToTax}>
          <LinearGradient
            style={styles.item}
            colors={[Colors.primary400, Colors.primary700, Colors.primary400]}
          >
            <Text style={styles.text}>Calculate Tax</Text>
          </LinearGradient>
        </Pressable>
        {authCtx.isAuthenticated && (
          <Pressable onPress={navigateToFavourites}>
            <LinearGradient
              style={styles.item}
              colors={[Colors.primary400, Colors.primary700, Colors.primary400]}
            >
              <Text style={styles.text}>Favourites</Text>
            </LinearGradient>
          </Pressable>
        )}
        <Pressable onPress={navigateToFAQ}>
          <LinearGradient
            style={styles.item}
            colors={[Colors.primary400, Colors.primary700, Colors.primary400]}
          >
            <Text style={styles.text}>F.A.Qs</Text>
          </LinearGradient>
        </Pressable>
        <Pressable onPress={navigateToAbout}>
          <LinearGradient
            style={styles.item}
            colors={[Colors.primary400, Colors.primary700, Colors.primary400]}
          >
            <Text style={styles.text}>About Us</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  all:{
    height:"100%",
  },
  two:{
   backgroundColor:Colors.primary500,
   position:"absolute",
   top:"10%",
   left:0,
   right:0,
   bottom:"10%",
   opacity:0.4,
   borderBottomLeftRadius:1000,
   borderBottomRightRadius:0,
   borderTopRightRadius:1000,
 },
  content: {
    flex:1,
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
