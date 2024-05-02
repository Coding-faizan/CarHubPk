import { useEffect, useState } from "react";
import {
  ScrollView,
  Image,
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";

import { Colors } from "../constants/colors";
import { fetchAdWithId } from "../util/http";
import { SliderBox } from "react-native-image-slider-box";

export default function AdDetails({ route }) {
  const selectedAdId = route.params.carId;
  const [fetchedAd, setFetchedAd] = useState();

  useEffect(() => {
    async function loadAdDetail() {
      const ad = await fetchAdWithId(selectedAdId);
      setFetchedAd(ad);
    }

    loadAdDetail();
  }, [selectedAdId]);

  if (!fetchedAd) {
    return (
      <View style={styles.fallback}>
        <Text style={{ fontSize: 18 }}>Loading Details...</Text>
      </View>
    );
  }

  const imagesToShow = fetchedAd.imageUrls.slice(1);

  return (
    <ScrollView>
      <SliderBox
        images={imagesToShow}
        sliderBoxHeight={250}
        onCurrentImagePressed={(index) =>
          console.warn(`image ${index} pressed`)
        }
        dotColor={Colors.primary100}
        inactiveDotColor="#111"
        dotStyle={{
          width: 15,
          height: 15,
          borderRadius: 15,
          marginHorizontal: 10,
          padding: 0,
          margin: 0,
        }}
      />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedAd.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  scrollView: {
    width: "100%",
    height: 200, // Adjust height as needed
  },
});
