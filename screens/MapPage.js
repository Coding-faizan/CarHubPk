import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function MapScreen({ route }) {
  const { workshop } = route.params;
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required to show your position.");
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setLoading(false);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#FFC107" />
      ) : (
        <MapView
          style={styles.map}
          showsUserLocation={true} // Displays the user's current location
          followsUserLocation={true} // Keeps the map centered on the user
          initialRegion={{
            latitude: userLocation?.latitude || workshop.location.latitude,
            longitude: userLocation?.longitude || workshop.location.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {/* Workshop Location Marker */}
          <Marker coordinate={workshop.location} title={workshop.name} />

          {/* User Location Marker */}
          {userLocation && (
            <Marker coordinate={userLocation} title="Your Location" pinColor="blue" />
          )}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: "100%", height: "100%" },
});
