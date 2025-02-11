import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";

export default function WorkshopRegistration() {
  const [workshopName, setWorkshopName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [workshopType, setWorkshopType] = useState("");
  const [services, setServices] = useState([{ id: 1, category: "", name: "" }]);

  const addService = () => {
    setServices([...services, { id: services.length + 1, category: "", name: "" }]);
  };

  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...services];
    updatedServices[index][field] = value;
    setServices(updatedServices);
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Please enable location services.");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    let { latitude, longitude } = location.coords;

    let reverseGeocode = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (reverseGeocode.length > 0) {
      let locationAddress = `${reverseGeocode[0].name}, ${reverseGeocode[0].street}, ${reverseGeocode[0].city}, ${reverseGeocode[0].region}, ${reverseGeocode[0].country}`;
      setAddress(locationAddress);
    } else {
      Alert.alert("Error", "Unable to get address.");
    }
  };

  const handleSubmit = () => {
    console.log("Workshop Registered:", {
      workshopName,
      ownerName,
      phone,
      address,
      workshopType,
      services,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Workshop Registration</Text>

      <TextInput
        style={styles.input}
        placeholder="Workshop Name"
        value={workshopName}
        onChangeText={setWorkshopName}
        placeholderTextColor="#FFFFFF"
      />

      <TextInput
        style={styles.input}
        placeholder="Owner Name"
        value={ownerName}
        onChangeText={setOwnerName}
        placeholderTextColor="#FFFFFF"
      />

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
        placeholderTextColor="#FFFFFF"
      />

      <View style={styles.locationContainer}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Workshop Address"
          value={address}
          onChangeText={setAddress}
          placeholderTextColor="#FFFFFF"
        />
        <TouchableOpacity style={styles.locationButton} onPress={getCurrentLocation}>
          <Ionicons name="location-outline" size={24} color="#FFD700" />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Workshop Type</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={workshopType} onValueChange={setWorkshopType} style={styles.picker}>
          <Picker.Item label="Select Workshop Type" value="" color={workshopType === "" ? "#FFFFFF" : "#FFD700"} />
          <Picker.Item label="Car Workshop" value="car" color="#FFD700" />
          <Picker.Item label="Bike Workshop" value="bike" color="#FFD700" />
          <Picker.Item label="General Workshop" value="general" color="#FFD700" />
        </Picker>
      </View>

      <Text style={styles.label}>Services Offered</Text>
      {services.map((service, index) => (
        <View key={service.id} style={styles.serviceContainer}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={service.category}
              onValueChange={(value) => handleServiceChange(index, "category", value)}
              style={styles.picker}
            >
              <Picker.Item label="Select Category" value="" color={service.category === "" ? "#FFFFFF" : "#FFD700"} />
              <Picker.Item label="Engine Repair" value="engine" color="#FFD700" />
              <Picker.Item label="Electrical Work" value="electrical" color="#FFD700" />
              <Picker.Item label="Bodywork" value="bodywork" color="#FFD700" />
              <Picker.Item label="General Maintenance" value="general" color="#FFD700" />
            </Picker>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Service Name"
            value={service.name}
            onChangeText={(value) => handleServiceChange(index, "name", value)}
            placeholderTextColor="#FFFFFF"
          />
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={addService}>
        <Ionicons name="add-circle-outline" size={24} color="#FFD700" />
        <Text style={styles.addButtonText}>Add Service</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Register Workshop</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#1E1E2F",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FFD700",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#FFD700",
    borderRadius: 5,
    backgroundColor: "#2A2A3C",
    color: "#FFFFFF",
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#ffffff",
  },
  pickerContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#FFD700",
    borderRadius: 5,
    backgroundColor: "#2A2A3C",
    marginBottom: 15,
  },
  serviceContainer: {
    width: "100%",
    marginBottom: 10,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  locationButton: {
    marginLeft: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#112240",
    borderWidth: 1,
    borderColor: "#FFD700",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  addButtonText: {
    color: "#FFD700",
    fontSize: 16,
    marginLeft: 5,
  },
  button: {
    backgroundColor: "#FFD700",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#0A192F",
    fontSize: 18,
    fontWeight: "bold",
  },
  picker: {
    color: "#FFD700",
  },
});
