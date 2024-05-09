import { useEffect, useState } from "react";
import {
  ScrollView,
  Linking,
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
} from "react-native";

import { Colors } from "../constants/colors";
import { fetchAdWithId, fetchUserById } from "../util/http";
import { SliderBox } from "react-native-image-slider-box";
import LoadingCar from "../UI/LoadingCar";

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
    const message = `Hi there, I saw your ad '${fetchedAd.title}'. I want to talk about some more details.`;

    // Construct the WhatsApp URL with the phone number and message
    const url = `whatsapp://send?phone=${
      userDetails.PhoneNumber
    }&text=${encodeURIComponent(message)}`;

    Linking.openURL(url)
      .then((data) => {
        console.log("WhatsApp Opened");
      })
      .catch(() => {
        alert("Make sure WhatsApp is installed on your device.");
      });
  };

  const dialPhoneNumber = () => {
    const url = `tel:${userDetails.PhoneNumber}`;

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
    };

    fetchUserData();
  }, [selectedUserId]); // Corrected variable name

  if (!fetchedAd || !userDetails) {
    return (
      <View style={styles.fallback}>
        <LoadingCar />
      </View>
    );
  }

  const imagesToShow = fetchedAd.imageUrls.slice(1);

  return (
    <ScrollView>
      <SliderBox
        images={imagesToShow}
        sliderBoxHeight={280}
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

        <View style={styles.sellerInfo}>
          <Text style={{ fontSize: 14 }}>Seller</Text>
          <FontAwesome name="user-circle-o" size={25} color="black" />
          <Text style={{ fontSize: 16 }}>{userDetails.Name}</Text>
        </View>
      </View>

      <View style={styles.iconsContainer}>
        <View style={styles.iconContainer}>
          <Ionicons name="speedometer-outline" size={24} color="black" />
          <Text style={styles.textStyle}>{"20,000 km"}</Text>
        </View>
        <View style={styles.iconContainer}>
          <FontAwesome name="calendar" size={24} color="black" />
          <Text style={styles.textStyle}>{"2020"}</Text>
        </View>

        <View style={styles.iconContainer}>
          <Octicons name="gear" size={24} color="black" />
          <Text style={styles.textStyle}>{fetchedAd.transmission}</Text>
        </View>

        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="fuel" size={24} color="black" />
          <Text style={styles.textStyle}>{"Petrol"}</Text>
        </View>
      </View>
      <View style={styles.otherDetails}>
        <View style={styles.innerDetailContainer}>
          <Text style={styles.innerDetailText}>Registered In</Text>
          <Text style={styles.innerDetailText1}>{fetchedAd.location}</Text>
        </View>

        <View style={styles.innerDetailContainer}>
          <Text style={styles.innerDetailText}>Variant</Text>
          <Text style={styles.innerDetailText1}>{"Sedan"}</Text>
        </View>

        <View style={styles.innerDetailContainer}>
          <Text style={styles.innerDetailText}>Description</Text>
          <Text style={styles.innerDetailText1}>{fetchedAd.description}</Text>
        </View>

        <View style={styles.innerDetailContainer}>
          <Text style={styles.innerDetailText}>Mileage</Text>
          <Text style={styles.innerDetailText1}>
            {fetchedAd.mileage + " KM"}
          </Text>
        </View>
      </View>

      <View style={styles.contactContainer}>
        <Pressable onPress={openWhatsApp} style={styles.wappouter}>
          {/* <FontAwesome5 name="whatsapp-square" size={50} color="#25D366" /> */}
          <Text style={styles.wapp}>Whatsapp</Text>
        </Pressable>

        <Pressable onPress={dialPhoneNumber} style={styles.btnouter}>
          <Text style={styles.btn}>Call Owner</Text>
          {/* <Button
          title={"Call Owner"}
          onPress={dialPhoneNumber}
          style={styles.dialButton}
        /> */}
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  container: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  sellerInfo: {
    alignItems: "center",
    justifyContent: "center",
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
    borderColor: "#DDDDDD",
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
    borderColor: "#DDDDDD",
  },

  innerDetailText: {
    fontSize: 20,
    color: "black",
    fontWeight: "500",
  },
  innerDetailText1: {
    fontSize: 18,
    color: "#585050",
  },

  contactContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 20,
    marginTop: 20,
  },

  btnouter: {
    backgroundColor: "#0000CC",
    height: 50,
    padding: 8,
    width: 150,
    borderColor: "white",
    border: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  scrollView: {
    width: "100%",
    height: 200, // Adjust height as needed
  },
  wappouter: {
    backgroundColor: "#33CC33",
    height: 50,
    padding: 8,
    width: 150,
    borderColor: "white",
    border: 1,
    borderRadius: 8,
    // flex:1,
    alignItems: "center",
    justifyContent: "center",
  },
  wapp: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});
