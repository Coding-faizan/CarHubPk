import React, { useContext, useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { Colors } from "../constants/colors";
import { AuthContext } from "../store/auth-context";
import LoginFallBack from "../components/LoginFallBack";
import { fetchAdsWithSellerId, deleteAd } from "../util/http";
import { useIsFocused } from "@react-navigation/native";
import MyAdList from "../components/Ads/MyAdList";

const MyAds = () => {
  const authCtx = useContext(AuthContext);
  const isFocused = useIsFocused();
  const [fetchedAds, setFetchedAds] = useState([]);
  const [loading, setLoading] = useState(false);

  if (!authCtx.isAuthenticated) {
    return <LoginFallBack />;
  }

  useEffect(() => {
    if (isFocused) {
      getAds();
    }
  }, [isFocused]);

  const getAds = async () => {
    try {
      setLoading(true);
      const ads = await fetchAdsWithSellerId(authCtx.token);
      setFetchedAds(ads);
    } catch (error) {
      console.error("Error fetching ads:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAd = async (carId) => {
    try {
      setLoading(true);
      await deleteAd(carId);
      // If deletion succeeds, refetch ads
      getAds();
    } catch (error) {
      console.error("Error deleting ad:", error);
    } finally {
      setLoading(false);
    }
  };

  if (fetchedAds.length === 0) {
    return (
      <>
        <View style={styles.two}></View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 24, color: "white" }}>
            You have not posted any ad yet!
          </Text>
        </View>
      </>
    );
  }
  return (
    <>
      <View style={styles.two}></View>
      <View style={styles.container1}>
        {loading ? (
          <View style={styles.fallback}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={{ fontSize: 20 }}>Loading...</Text>
          </View>
        ) : (
          <MyAdList Ads={fetchedAds} onDelete={handleDeleteAd} />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    margin: 5,
  },
  two: {
    backgroundColor: Colors.primary200,
    position: "absolute",
    top: "0%",
    left: 0,
    right: 0,
    bottom: "30%",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    zIndex: -1,
  },
  container1: {
    marginTop: 40,
    flexDirection: "column",
    alignItems: "center",
  },
});

export default MyAds;
