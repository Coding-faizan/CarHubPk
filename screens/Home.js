import { useContext, useEffect, useState } from "react";
import AdsList from "../components/Ads/AdsList";
import fetchAds from "../util/http";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Colors } from "../constants/colors";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { AuthContext } from "../store/auth-context";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";

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
      <Pressable>
        <View style={styles.header}>
          {!authCtx.isAuthenticated && (
            <>
              <Pressable
                style={styles.loginBtn}
                onPress={() => navigation.navigate("Login")}
              >
                <LinearGradient
                  style={styles.item}
                  colors={[
                    Colors.primary500,
                    Colors.primary700,
                    Colors.primary500,
                  ]}
                >
                  <Text
                    style={{ fontSize: 20, fontWeight: 500, color: "white" }}
                  >
                    Login
                  </Text>
                </LinearGradient>
              </Pressable>
              <Pressable style={styles.searchContainer} onPress={() => navigation.navigate("Search")}>
                <FontAwesome
                  style={styles.icon}
                  name="search"
                  size={24}
                  color="black"
                />
                <Text style={styles.txt}>Search Car</Text>
              </Pressable>
            </>
          )}
          {authCtx.isAuthenticated && (
            <>
            <Pressable
                style={styles.loginBtn}
                onPress={() => navigation.navigate("FilterCarScreen")}
              >
                <LinearGradient
                  style={styles.item}
                  colors={[
                    Colors.primary500,
                    Colors.primary700,
                    Colors.primary500,
                  ]}
                >
                  <Text
                    style={{ fontSize: 20, fontWeight: 500, color: "white" }}
                  >
                  Filter Search
                  </Text>
                </LinearGradient>
              </Pressable>
              <Pressable style={styles.searchContainer}  onPress={() => navigation.navigate("Search")}>
              <FontAwesome
                style={styles.icon}
                name="search"
                size={24}
                color="black"
              />
              <Text style={styles.txt}>Search Car</Text>
            </Pressable>
            </>
          )}
        </View>
      </Pressable>
      <View style={styles.two}></View>
      <View style={styles.row}>
        <Text style={styles.data}>Recent Ads </Text>
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
  loginBtn: {},
  item: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 10,
    color: "white",
  },

  searchContainer: {
    // flex:1,
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
  icon: {
    marginLeft: 10,
  },
  txt: {
    marginLeft: 10,
    color: "#B0B0B0",
  },
  two: {
    backgroundColor: Colors.primary200,
    position: "absolute",
    top: "11%",
    left: 0,
    right: 0,
    bottom: "30%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    zIndex: -1,
  },
  row: {
    marginTop: 5,
    marginLeft: 15,
  },
  data: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "left",
    paddingLeft: 10,
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 1.2 },
    textShadowRadius: 4,
  },
  container1: {
    marginTop: 0,
    flexDirection: "column",
    alignItems: "center",
    height: "81%",
  },
});
