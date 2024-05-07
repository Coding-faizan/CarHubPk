import { useEffect, useState } from "react";
import {
  ScrollView,
  Linking,
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";

import { Colors } from "../constants/colors";
import { fetchAdWithId, fetchUserById } from "../util/http";
import { SliderBox } from "react-native-image-slider-box";

import { EvilIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Button } from "react-native-elements";

export default function AdDetails({ route }) {
  const formatPrice = (price) => {
    const significantDigits = 2;
    const priceInLacs = price / 100000;
    const roundedPrice = priceInLacs.toFixed(significantDigits);
    return `PKR ${roundedPrice} Lacs`;
  };

  const openWhatsApp = () => {
    const phoneNumber = "+923085540609";
    const url = `whatsapp://send?phone=${phoneNumber}`;

    Linking.openURL(url)
      .then((data) => {
        console.log("WhatsApp Opened");
      })
      .catch(() => {
        alert("Make sure WhatsApp is installed on your device.");
      });
  };

  const dialPhoneNumber = () => {
    const url = `tel:${"03085540609"}`;

    Linking.openURL(url)
      .then((data) => {
        console.log("Phone Call Initiated");
      })
      .catch(() => {
        alert("Could not initiate the phone call.");
      });
  };

  const selectedAdId = route.params.carId;
  const selectedUserId = route.params.userId;

  console.log(selectedUserId);

  const [fetchedAd, setFetchedAd] = useState();
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    async function loadAdDetail() {
      const ad = await fetchAdWithId(selectedAdId);
      setFetchedAd(ad);
    }

    loadAdDetail();
  }, [selectedAdId]);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await fetchUserById(selectedUserId);
      setUserDetails(userData);
      console.log(userDetails);
    };

    fetchUserData();
  }, [selectedUserId]); // Corrected variable name

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

      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={{ fontWeight: 700, fontSize: 20 }}>
            {fetchedAd.title}
          </Text>
          <Text style={{ fontWeight: 700, fontSize: 24 }}>
            {formatPrice(fetchedAd.price)}
          </Text>
          <View style={styles.locationContainer}>
            <EvilIcons name="location" size={20} color="black" />
            <Text style={{ fontWeight: 400, fontSize: 20 }}>
              {fetchedAd.location}
            </Text>
          </View>
        </View>

        <View style={styles.sellerInfo}></View>
      </View>

      <View style={styles.iconsContainer}>
        <View style={styles.iconContainer}>
          <Ionicons name="speedometer-outline" size={30} color="black" />
          <Text style={styles.textStyle}>{"20,000 km"}</Text>
        </View>
        <View style={styles.iconContainer}>
          <FontAwesome name="calendar" size={30} color="black" />
          <Text style={styles.textStyle}>{"2020"}</Text>
        </View>

        <View style={styles.iconContainer}>
          <Octicons name="gear" size={30} color="black" />
          <Text style={styles.textStyle}>{fetchedAd.transmission}</Text>
        </View>

        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="fuel" size={30} color="black" />
          <Text style={styles.textStyle}>{"Petrol"}</Text>
        </View>
      </View>
      <View style={styles.otherDetails}>
        <View style={styles.innerDetailContainer}>
          <Text style={styles.innerDetailText}>Registered In</Text>
          <Text style={styles.innerDetailText}>{fetchedAd.location}</Text>
        </View>

        <View style={styles.innerDetailContainer}>
          <Text style={styles.innerDetailText}>Variant</Text>
          <Text style={styles.innerDetailText}>{"Sedan"}</Text>
        </View>

        <View style={styles.innerDetailContainer}>
          <Text style={styles.innerDetailText}>Description</Text>
          <Text style={styles.innerDetailText}>{fetchedAd.description}</Text>
        </View>

        <View style={styles.innerDetailContainer}>
          <Text style={styles.innerDetailText}>Mileage</Text>
          <Text style={styles.innerDetailText}>
            {fetchedAd.mileage + " KM"}
          </Text>
        </View>
      </View>

      <View style={styles.contactContainer}>
        <Pressable onPress={openWhatsApp}>
          <FontAwesome5 name="whatsapp-square" size={50} color="#25D366" />
        </Pressable>

        <Button
          title={"Call Owner"}
          onPress={dialPhoneNumber}
          style={styles.dialButton}
        />
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
    flexDirection: "row",
    alignItems: "center",
  },
  headerContainer: {
    padding: 20,
  },

  textStyle: {
    color: "#585050",
    fontSize: 15,
  },
  iconsContainer: {
    marginHorizontal: 20,
    marginTop: 10,
    borderBottomWidth: 1.5,
    paddingBottom: 5,
    justifyContent: "space-between",
    flexDirection: "row",
  },

  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  otherDetails: {
    paddingHorizontal: 20,
  },

  innerDetailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1.5,
    paddingVertical: 10,
  },

  innerDetailText: {
    fontSize: 20,
    color: "#585050",
  },

  contactContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 20,
  },

  dialButton: {
    backgroundColor: Colors.primary400,
    height: 45,
  },
  scrollView: {
    width: "100%",
    height: 200, // Adjust height as needed
  },
});
