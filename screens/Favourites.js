import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { fetchAdsWithIds } from "../util/http";
import ProductCard from "../components/Ads/AdItem"; // Assuming ProductCard component is imported correctly

const FavouritesScreen = () => {
  function selectAdHandler(id, sellerId) {
    navigation.navigate("AdDetails", {
      carId: id,
      userId: sellerId,
    });
  }
  const route = useRoute();
  const favoriteIds = route.params?.favoriteAds || [];
  const [favoriteAds, setFavoriteAds] = useState([]);

  useEffect(() => {
    const fetchFavoriteAds = async () => {
      const ads = await fetchAdsWithIds(favoriteIds);
      setFavoriteAds(ads);
    };

    fetchFavoriteAds();
  }, [favoriteIds]);

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
            <ProductCard ad={item} onSelect={selectAdHandler} />
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
    paddingVertical: 10,
  },
});

export default FavouritesScreen;
