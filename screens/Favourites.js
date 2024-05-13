import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { fetchAdsWithIds } from "../util/http";
import ProductCard from "../components/Ads/AdItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Favourites = () => {
  const [favoriteAds, setFavoriteAds] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    loadFavoriteAds();
  }, []);

  function selectAdHandler(id, sellerId) {
    navigation.navigate("AdDetails", {
      carId: id,
      userId: sellerId,
    });
  }

  const loadFavoriteAds = async () => {
    try {
      const storedFavoriteAds = await AsyncStorage.getItem("favoriteAds");
      if (storedFavoriteAds !== null) {
        const favoriteIds = JSON.parse(storedFavoriteAds);
        const ads = await fetchAdsWithIds(favoriteIds);
        // Set the initial state of favorite ads
        setFavoriteAds(ads);
      }
    } catch (error) {
      console.error("Error loading favorite ads:", error);
    }
  };

  if (favoriteAds.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No favorite ads!</Text>
      </View>
    );
  }
  return (
    <FlatList
      style={styles.list}
      data={favoriteAds}
      keyExtractor={(item) => item.carId.toString()}
      renderItem={({ item }) => (
        <ProductCard ad={item} onSelect={selectAdHandler} />
      )}
      contentContainerStyle={styles.contentContainer}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  list: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Favourites;
