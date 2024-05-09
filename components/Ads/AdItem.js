import {
  View,
  Image,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  ToastAndroid,
} from "react-native"; // Replace with your chosen library components
import { AntDesign } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { AuthContext } from "../../store/auth-context";
import { useNavigation } from "@react-navigation/native";

const ProductCard = ({ ad, onSelect }) => {
  const [favoriteAds, setFavoriteAds] = useState([]);
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();

  const favouriteHandler = () => {
    if (authCtx.isAuthenticated) {
      if (!favoriteAds.includes(ad.carId)) {
        setFavoriteAds((prevFavorites) => [...prevFavorites, ad.carId]);
        ToastAndroid.show("Added to Favorites!", ToastAndroid.BOTTOM);
        navigation.setParams({ favoriteAds: [...favoriteAds, ad.carId] });
      } else {
        setFavoriteAds((prevFavorites) =>
          prevFavorites.filter((id) => id !== ad.carId)
        );
        navigation.setParams({
          favoriteAds: favoriteAds.filter((id) => id !== ad.carId),
        });
      }
    } else {
      navigation.navigate("Login");
    }
  };

  let displayPrice = parseInt(ad.price).toLocaleString();
  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
      onPress={onSelect.bind(this, ad.carId, ad.sellerId)}
    >
      <View style={styles.card}>
        <Image source={{ uri: ad.imageUrls[1] }} style={styles.image} />
        <View style={styles.content}>
          <View>
            <Text style={styles.title}>{ad.title}</Text>
            <Text style={styles.price}>{"Rs. " + displayPrice}</Text>
            <Text style={styles.registrationYear}>{ad.registrationYear}</Text>
          </View>

          <Pressable style={styles.favourite} onPress={favouriteHandler}>
            {!favoriteAds.includes(ad.carId) && (
              <AntDesign name="hearto" size={24} color="black" />
            )}
            {favoriteAds.includes(ad.carId) && (
              <AntDesign name="heart" size={24} color="black" />
            )}
          </Pressable>
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
    width: 300,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    width: "auto", // Adjust width as needed
    height: 150, // Adjust height as needed
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  content: {
    padding: 10, // Padding for content within the card
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16, // Title font size
    fontWeight: "bold", // Bold title
  },
  price: {
    fontSize: 14, // Price font size
    color: "#333", // Price text color
  },
  registrationYear: {
    fontSize: 14,
    display: "flex",
  },

  favourite: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductCard;
