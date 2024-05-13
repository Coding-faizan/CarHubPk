import { View } from "react-native";
import AdItem from "./AdItem";
import ProductCard from "./AdItem";
import { StyleSheet, FlatList, ScrollView } from "react-native";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

function AdsList({ Ads }) {
  const navigation = useNavigation();

  function selectAdHandler(id, sellerId) {
    navigation.navigate("AdDetails", {
      carId: id,
      userId: sellerId,
    });
  }

  const handleToggleFavorite = async (adId) => {
    try {
      await toggleFavorite(adId); // Call the API to toggle favorite status
      // Update the local state of ads after toggling favorite status
      setAds((prevAds) =>
        prevAds.map((ad) =>
          ad.carId === adId ? { ...ad, isFavorite: !ad.isFavorite } : ad
        )
      );
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  if (!Ads || Ads.length === 0) {
    return (
      <View style={styles.fallBackContainer}>
        <Text style={styles.fallBackText}>No Ads Posted!</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={Ads}
      keyExtractor={(item) => item.carId}
      renderItem={({ item }) => (
        <ProductCard
          ad={item}
          onSelect={selectAdHandler}
          isFavorite={item.isFavorite || false}
          onToggleFavorite={() => handleToggleFavorite(item.carId)}
        />
      )}
      contentContainerStyle={styles.contentContainer}
    />
  );
}

export default AdsList;

const styles = StyleSheet.create({
  list: {
    margin: 5,
  },
  contentContainer: {
    padding: 10,
  },

  fallBackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  fallBackText: {
    fontSize: 16,
  },
});
