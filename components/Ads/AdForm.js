import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Input } from "react-native-elements";

import BrandDropdown from "../AdFormInputs/BrandDropdown";
import ModelDropdown from "../AdFormInputs/ModelDropdown";
import { Colors } from "../../constants/colors";
import { FontAwesome } from "@expo/vector-icons";
import ImagesField from "../AdFormInputs/ImagesField";

const AdForm = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [kmDriven, setKmDriven] = useState("");

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
    console.log(brand);
  };

  const handleModelChange = (brand) => {
    setSelectedModel(brand);
    console.log(brand);
  };

  const handleKmDrivenChange = (km) => {
    setKmDriven(km);
  };

  return (
    <ScrollView style={styles.form}>
      <ImagesField />
      <View style={styles.container}>
        <Input
          containerStyle={styles.containerStyle}
          inputStyle={styles.inputStyle}
          placeholder="Title"
          value={kmDriven}
          onChangeText={handleKmDrivenChange}
        />
      </View>
      <BrandDropdown onBrandChange={handleBrandChange} />
      <ModelDropdown
        selectedBrand={selectedBrand}
        onModelChange={handleModelChange}
      />
      <View style={styles.container}>
        <Input
          containerStyle={styles.containerStyle}
          inputStyle={styles.inputStyle}
          placeholder="Price"
          value={kmDriven}
          onChangeText={handleKmDrivenChange}
          leftIcon={<FontAwesome name="dollar" size={20} color="black" />}
        />
      </View>
    </ScrollView>
  );
};

export default AdForm;

const styles = StyleSheet.create({
  form: {
    padding: 24,
  },
  container: {
    marginTop: 6,
    borderRadius: 10,
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  input: {
    height: 40,
    borderColor: "gray",
    fontSize: 16,
    fontWeight: "500",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  containerStyle: {
    height: 50, // Adjust the height of the container
    paddingHorizontal: 0, // Optional: Remove horizontal padding
  },
  inputStyle: {
    fontSize: 16, // Optional: Adjust the font size
  },
});
