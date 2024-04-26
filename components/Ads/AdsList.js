import { View } from "react-native";
import AdItem from "./AdItem";
import ProductCard from "./ProductCard";
import { StyleSheet, FlatList } from "react-native";
import { Text } from "react-native";

function AdsList({ Ads }) {
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
      renderItem={({ item }) => <ProductCard ad={item} />}
      numColumns={2}
      contentContainerStyle={styles.contentContainer}
    />
  );
}

export default AdsList;

const styles = StyleSheet.create({
  list: {
    margin: 15,
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
