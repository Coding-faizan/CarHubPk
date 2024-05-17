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
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../store/auth-context";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

const ProductCard = ({ ad, onSelect }) => {
  console.log("AD>>>>", ad);
  if (!!ad.ImageUrls && ad.ImageUrls.length > 0)
    console.log("AD URL>>>>", ad?.ImageUrls[0].ImageUrl);


  const [favoriteAds, setFavoriteAds] = useState([]);
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    // Save favorite ads to AsyncStorage whenever it changes
    saveFavoriteAds();
  }, [favoriteAds]);

  const saveFavoriteAds = async () => {
    try {
      await AsyncStorage.setItem("favoriteAds", JSON.stringify(favoriteAds));
    } catch (error) {
      console.error("Error saving favorite ads:", error);
    }
  };

  const favouriteHandler = () => {
    if (authCtx.isAuthenticated) {
      if (!favoriteAds.includes(ad.carId)) {
        setFavoriteAds((prevFavorites) => {
          const updatedFavorites = [...prevFavorites, ad.carId];
          console.log(updatedFavorites); // Log the updated array
          ToastAndroid.show("Added to Favorites!", ToastAndroid.BOTTOM);
          navigation.setParams({ favoriteAds: updatedFavorites });
          return updatedFavorites; // Return the updated array
        });
      } else {
        setFavoriteAds((prevFavorites) => {
          const updatedFavorites = prevFavorites.filter(
            (id) => id !== ad.carId
          );
          console.log(updatedFavorites); // Log the updated array
          navigation.setParams({ favoriteAds: updatedFavorites });
          return updatedFavorites; // Return the updated array
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
        <Image source={{ uri: (!!ad.ImageUrls && ad.ImageUrls.length > 0) ? ad.ImageUrls[0].ImageUrl : ad.imageUrls[0] }} style={styles.image} />
        <View style={styles.content}>
          <View>
            <Text style={styles.title}>{ad.title}</Text>
            <Text style={styles.price}>{"Rs. " + displayPrice}</Text>
            <Text style={styles.registrationYear}>{ad.registrationYear}</Text>
          </View>

          <Pressable style={styles.favourite} onPress={favouriteHandler}>
            {favoriteAds.includes(ad.carId) && (
              <AntDesign name="heart" size={24} color="red" />
            )}
            {!favoriteAds.includes(ad.carId) && (
              <AntDesign name="hearto" size={24} color="black" />
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
