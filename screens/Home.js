import { useEffect, useState } from "react";
import AdsList from "../components/Ads/AdsList";
import fetchAds from "../util/http";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/colors";

function HomePage() {
  const [fetchedAds, setFetchedAds] = useState([]);

  useEffect(() => {
    async function getAds() {
      const ads = await fetchAds();
      setFetchedAds(ads);
    }

    getAds();
  }, []);

  console.log(fetchedAds);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recent Ads</Text>
      <AdsList Ads={fetchedAds} />
    </View>
  );
}

export default HomePage;

const styles = StyleSheet.create({
  container: {
    paddingTop: 28,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    borderRadius: 70,
    backgroundColor: Colors.primary200,
  },
});
