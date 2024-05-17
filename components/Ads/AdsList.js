import { View } from "react-native";
import AdItem from "./AdItem";
import ProductCard from "./AdItem";
import { StyleSheet, FlatList, ScrollView } from "react-native";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

function AdsList({ Ads }) {

  console.log("ADS>>>>", Ads);
  const navigation = useNavigation();

  function selectAdHandler(id, sellerId) {
    navigation.navigate("AdDetails", {
      carId: id,
      userId: sellerId,
    });
  }

  if (!Ads || Ads.length === 0) {
    return (
      <View style={styles.fallBackContainer}>
        <Text style={styles.fallBackText}>No Ads!</Text>
      </View>
    );
  }

  return (
    <>
      {Ads.length > 0 && <FlatList
        style={styles.list}
        data={Ads}
        keyExtractor={(item) => item.carId}
        renderItem={({ item, index }) => (
          <ProductCard key={index} ad={item} onSelect={selectAdHandler} />
        )}
        contentContainerStyle={styles.contentContainer}
      />}
    </>
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
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 1.2 },
    textShadowRadius: 4,
  },
});
