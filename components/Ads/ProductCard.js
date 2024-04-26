import { View, Image, Text, StyleSheet, Pressable } from "react-native"; // Replace with your chosen library components

const ProductCard = ({ ad }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
    >
      <View style={styles.card}>
        <Image source={{ uri: ad.imageUrls[1][0] }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>{ad.title}</Text>
          <Text style={styles.price}>{ad.price}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff", // White background
    borderRadius: 8,
    shadowColor: "#ccc", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 2, // Shadow blur radius
    // Margin for spacing between cards
    margin: 5,
    borderWidth: 1,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    width: 150, // Adjust width as needed
    height: 150, // Adjust height as needed
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  content: {
    padding: 10, // Padding for content within the card
  },
  title: {
    fontSize: 16, // Title font size
    fontWeight: "bold", // Bold title
  },
  price: {
    fontSize: 14, // Price font size
    color: "#333", // Price text color
  },
});

export default ProductCard;
