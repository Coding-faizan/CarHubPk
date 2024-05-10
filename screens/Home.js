import { useContext, useEffect, useState } from "react";
import AdsList from "../components/Ads/AdsList";
import fetchAds from "../util/http";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Colors } from "../constants/colors";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { AuthContext } from "../store/auth-context";
import { LinearGradient } from "expo-linear-gradient";

function HomePage() {
  const authCtx = useContext(AuthContext);
  const [fetchedAds, setFetchedAds] = useState([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    async function getAds() {
      const ads = await fetchAds();
      setFetchedAds(ads);
    }

    if (isFocused) {
      getAds();
    }
  }, [isFocused]);

  if (fetchedAds.length === 0) {
    // Check the length of fetchedAds
    return (
      <View style={styles.fallback}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ fontSize: 20 }}>Loading Ads</Text>
      </View>
    );
  }

  return (
    <View>
      <Pressable onPress={() => navigation.navigate("Search")}>
        <View style={styles.header}>
          {!authCtx.isAuthenticated && (
            <>
            <Pressable
              style={styles.loginBtn}
              onPress={() => navigation.navigate("Login")}
            >
               <LinearGradient
            style={styles.item}
            colors={[Colors.primary500, Colors.primary700, Colors.primary500]}
          >
              <Text style={{ fontSize: 20, fontWeight: 500, color: "white" }}>
                Login
              </Text>
              </LinearGradient>
            </Pressable>
          <View style={styles.searchContainer}>
            <FontAwesome style={styles.icon} name="search" size={24} color="black" />
            <Text style={styles.txt}>Search Car</Text>
          </View>
        </>
          )}
          {authCtx.isAuthenticated&&
          <View style={styles.searchContainer1}>
            <FontAwesome  style={styles.icon} name="search" size={24} color="black" />
            <Text style={styles.txt}>Search Car</Text>
          </View>}
        </View>
      </Pressable>
      <View style={styles.recentContainer}>
        <Text style={styles.recentText}>Recent Ads</Text>
      </View>
      <View style={styles.container1}>
        <AdsList style={styles.list} Ads={fetchedAds} />
      </View>
    </View>
  );
}

export default HomePage;

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    ...StyleSheet.absoluteFillObject, // Cover the entire screen
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Semi-transparent white background
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    paddingTop: 40,
    paddingVertical: 10,
    backgroundColor: Colors.primary200,
    flexDirection: "row",
    justifyContent: "space-around",
  },

  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  loginBtn: {
  },
  item:{
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: Colors.primary700,
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 10,
    color: "white",

  },

  searchContainer: {
    backgroundColor: "white",
    height: 40,
    width: "55%",
    flexDirection: "row",
    borderRadius: 20,
    alignItems: "center",
  },
  searchContainer1: {
    backgroundColor: "white",
    height: 40,
    width: "85%",
    flexDirection: "row",
    borderRadius: 20,
    alignItems: "center",
  },
  icon:{
    marginLeft:10
  },
  txt:{
    marginLeft:10,
    color:"#B0B0B0"

  },

  recentContainer: {
    backgroundColor: "#ECECEC",
    // textAlign:"center",
    padding: 10,
    paddingTop: 15,
  },

  recentText: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "left",
    paddingLeft: 20,
  },
  container1: {
    marginTop: 0,
    flexDirection: "column",
    alignItems: "center",
  },
});
