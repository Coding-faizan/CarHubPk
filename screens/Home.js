import { useEffect, useState } from "react";
import AdsList from "../components/Ads/AdsList";
import fetchAds from "../util/http";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/colors";
import { useIsFocused } from "@react-navigation/native";

function HomePage() {
  const [fetchedAds, setFetchedAds] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function getAds() {
      const ads = await fetchAds();
      setFetchedAds(ads);
    }

    if (isFocused) {
      getAds();
    }

    getAds();
  }, [isFocused]);

  if (!fetchedAds.length > 0) {
    return (
      <View style={styles.fallback}>
        <Text style={{ fontSize: 20 }}>Loading Ads...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text style={styles.header}>Recent Ads</Text>
      <View style={styles.container}>
        <AdsList style={styles.list} Ads={fetchedAds} />
      </View>
    </View>
  );
}

export default HomePage;

const styles = StyleSheet.create({
  container: {},
  header: {
    paddingTop: 40,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: Colors.primary200,
  },
  fallback: {
    flex: 1,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
