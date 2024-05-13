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
        setFavoriteAds(ads.map((ad) => ({ ...ad, isFavorite: true })));
      }
    } catch (error) {
      console.error("Error loading favorite ads:", error);
    }
  };

  const toggleFavorite = (id) => {
    setFavoriteAds((prevAds) =>
      prevAds.map((ad) =>
        ad.carId === id ? { ...ad, isFavorite: !ad.isFavorite } : ad
      )
    );
  };

  return (
    <View style={styles.container}>
      {favoriteAds.length === 0 ? (
        <Text style={styles.emptyText}>No favorite ads!</Text>
      ) : (
        <FlatList
          style={styles.list}
          data={favoriteAds}
          keyExtractor={(item) => item.carId.toString()}
          renderItem={({ item }) => (
            <ProductCard
              ad={item}
              onSelect={selectAdHandler}
              isFavorite={item.isFavorite}
              onToggleFavorite={() => toggleFavorite(item.carId)}
            />
          )}
          contentContainerStyle={styles.contentContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  emptyText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  list: {
    flex: 1,
    width: "100%",
  },
  contentContainer: {
    paddingBottom: 20,
  },
});

export default Favourites;
