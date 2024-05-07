import { View } from "react-native";
import AdItem from "./AdItem";
import ProductCard from "./AdItem";
import { StyleSheet, FlatList } from "react-native";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

function AdsList({ Ads }) {
  const navigation = useNavigation();

  function selectPlaceHandler(id, sellerId) {
    navigation.navigate("AdDetails", {
      carId: id,
      userId: sellerId,
    });
  }

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
        <ProductCard ad={item} onSelect={selectPlaceHandler} />
      )}
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
