import { Pressable, View, Text, StyleSheet, Image } from "react-native";

import { Colors } from "../../constants/colors";

export default function AdItem({ ad, onSelect }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
      onPress={onSelect}
    >
      <Image style={styles.image} source={{ uri: ad.imageUrls[1][0] }} />
      <View style={styles.info}>
        <Text style={styles.title}>{ad.title}</Text>
        <Text style={styles.address}>{ad.price}</Text>
        <Text style={styles.address}>{ad.registrationYear}</Text>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: Colors.primary50,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: 100,
  },
  info: {
    flex: 2,
    padding: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: Colors.gray700,
  },
  address: {
    fontSize: 12,
    color: Colors.gray700,
  },
});
