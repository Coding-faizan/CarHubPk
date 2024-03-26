import { View } from "react-native";
import AdItem from "./AdItem";
import { StyleSheet } from "react-native";
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
      data={Ads}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <AdItem ad={item} />}
    />
  );
}

export default AdsList;

const styles = StyleSheet.create({
  fallBackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  fallBackText: {
    fontSize: 16,
  },
});
