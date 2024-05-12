import { View } from "react-native";
import { StyleSheet, FlatList, ScrollView } from "react-native";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MyAdItem from "./MyAdItem";

function AdsList({ Ads, onDelete }) {
  const navigation = useNavigation();

  function selectAdHandler(id, sellerId) {
    navigation.navigate("AdDetails", {
      carId: id,
      userId: sellerId,
    });
  }

  if (Ads.length === 0) {
    return (
      <>
        <View style={styles.two}></View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 24, fontWeight: "350", color: "white" }}>
            You have not posted any ad yet!
          </Text>
        </View>
      </>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={Ads}
      keyExtractor={(item) => item.carId}
      renderItem={({ item }) => <MyAdItem ad={item} onDel={onDelete} />}
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
