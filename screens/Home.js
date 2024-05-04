import { useEffect, useState } from "react";
import AdsList from "../components/Ads/AdsList";
import fetchAds from "../util/http";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Colors } from "../constants/colors";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Button } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";

function HomePage() {
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
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate("Search")}>
        <View style={styles.header}>
          <Button
            title={"Sign Up"}
            onPress={() => navigation.navigate("Signup")}
          />
          <View style={styles.searchContainer}>
            <FontAwesome name="search" size={24} color="black" />
            <Text>Search Car</Text>
          </View>
        </View>
      </Pressable>
      <View style={styles.recentContainer}>
        <Text style={styles.recentText}>Recent Ads</Text>
      </View>
      <View style={styles.container}>
        <AdsList style={styles.list} Ads={fetchedAds} />
      </View>
    </View>
  );
}

export default HomePage;

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
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
    backgroundColor: "#FFFFF0",
    padding: 10,
  },

  recentText: {
    fontSize: 24,
  },
});
