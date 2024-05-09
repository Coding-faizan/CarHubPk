import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import ProductCard from "../components/Ads/AdItem";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Colors } from "../constants/colors";

const Favourites = () => {
  const route = useRoute();
  const favoriteAds = route.params?.favoriteAds || [];
  const navigation = useNavigation();

  if (favoriteAds.length === 0) {
    return (
      <View style={styles.fallback}>
        <Text style={{ fontSize: 24 }}>No Favourite Ads!</Text>
        <Pressable onPress={() => navigation.navigate("Home")}>
          <Text
            style={{ fontSize: 24, color: Colors.primary800, fontWeight: 500 }}
          >
            Home
          </Text>
        </Pressable>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={favoriteAds}
        keyExtractor={(item) => item.carId}
        renderItem={({ item }) => (
          <ProductCard ad={item} onSelect={selectPlaceHandler} />
        )}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    flex: 1,
    width: "100%",
  },
  contentContainer: {
    paddingVertical: 10,
  },
});

export default Favourites;
