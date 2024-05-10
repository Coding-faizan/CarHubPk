import { useContext } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { Colors } from "../constants/colors";
import { AuthContext } from "../store/auth-context";
import LoginFallBack from "../components/LoginFallBack";
import { fetchAdsWithSellerId } from "../util/http";
import { useIsFocused } from "@react-navigation/native";
import { useState } from "react";
import { useEffect } from "react";

export default function MyAds() {
  const authCtx = useContext(AuthContext);
  const isFocused = useIsFocused();
  const [fetchedAds, setFetchedAds] = useState([]);

  if (!authCtx.isAuthenticated) {
    return <LoginFallBack />;
  }

  console.log(authCtx.token);

  useEffect(() => {
    async function getAds() {
      const ads = await fetchAdsWithSellerId("1001");
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
        <Text style={{ fontSize: 24 }}>You have'nt posted any ad yet!</Text>
      </View>
    );
  }

  if (!fetchedAds) {
    return (
      <View style={styles.fallback}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ fontSize: 20 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container1}>
      <AdsList style={styles.list} Ads={fetchedAds} />
    </View>
  );
}

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    ...StyleSheet.absoluteFillObject, // Cover the entire screen
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Semi-transparent white background
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    paddingTop: 30,
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary800,
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 10,
    color: "white",
  },

  searchContainer: {
    backgroundColor: "#FFF",
    height: 40,
    width: 150,
    flexDirection: "row",
    borderRadius: 10,
    justifyContent: "space-around",
    alignItems: "center",
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
