import { useContext } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { Colors } from "../constants/colors";
import { AuthContext } from "../store/auth-context";
import LoginFallBack from "../components/LoginFallBack";
import { fetchAdsWithSellerId } from "../util/http";
import { useIsFocused } from "@react-navigation/native";
import { useState } from "react";
import { useEffect } from "react";
import AdsList from "../components/Ads/AdsList";

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
      const ads = await fetchAdsWithSellerId(authCtx.token);
      setFetchedAds(ads);
    }

    if (isFocused) {
      getAds();
    }
  }, [isFocused]);

  // if (fetchedAds.length === 0) {
  //   // Check the length of fetchedAds
  //   return (
  //     <View style={styles.fallback}>
  //       <Text style={{ fontSize: 24 }}>You have'nt posted any ad yet!</Text>
  //     </View>
  //   );
  // }

  if (!fetchedAds) {
    return (
      <View style={styles.fallback}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ fontSize: 20 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <>     
     <View style={styles.two}></View>
    <View style={styles.container1}>
      <AdsList style={styles.list} Ads={fetchedAds} />
    </View>
    </>

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

  list: {
    margin: 5,
  },
  two:{
    backgroundColor:Colors.primary200,
    position:"absolute",
    top:"0%",
    left:0,
    right:0,
    bottom:"30%",
    borderBottomLeftRadius:40,
    borderBottomRightRadius:40,
    zIndex:-1
  },
  container1: {
    marginTop: 40,
    flexDirection: "column",
    alignItems: "center",
  },
});
