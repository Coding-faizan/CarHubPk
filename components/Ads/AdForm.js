import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Input } from "react-native-elements";

import BrandDropdown from "../AdFormInputs/BrandDropdown";
import ModelDropdown from "../AdFormInputs/ModelDropdown";
import LocationDropdown from "../AdFormInputs/LocationDropdown";
import { FontAwesome } from "@expo/vector-icons";
import ImagesField from "../AdFormInputs/ImagesField";

const AdForm = () => {
  const [imagesUrl, setImagesUrl] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredRegistrationIn, setEnteredRegistrationIn] = useState("");
  const [enteredMilage, setEnteredMilage] = useState("");
  const [enteredTransmission, setEnteredTransmission] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredPrice, setEnteredPrice] = useState("");

  const handleImagesUrlChange = (newImagesUrl) => {
    setImagesUrl(newImagesUrl);
    console.log(newImagesUrl);
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
  };

  const handleModelChange = (model) => {
    setSelectedModel(model);
  };

  const handleTitleChange = (title) => {
    setEnteredTitle(title);
  };

  const handleRegistrationInChange = (registrationIn) => {
    setEnteredRegistrationIn(registrationIn);
  };

  const handleMilageChange = (milage) => {
    setEnteredMilage(milage);
  };

  const handleTransmissionChange = (transmission) => {
    setEnteredTransmission(transmission);
  };

  const handleDescriptionChange = (description) => {
    setEnteredDescription(description);
  };

  const handlePriceChange = (price) => {
    setEnteredPrice(price);
  };

  return (
    <ScrollView style={styles.form}>
      <ImagesField onChangeImages={handleImagesUrlChange} />
      <View style={styles.container}>
        <Input
          containerStyle={styles.containerStyle}
          inputStyle={styles.inputStyle}
          placeholder="Title"
          value={enteredTitle}
          onChangeText={handleTitleChange}
        />
      </View>
      <BrandDropdown onBrandChange={handleBrandChange} />
      <ModelDropdown
        selectedBrand={selectedBrand}
        onModelChange={handleModelChange}
      />
      <LocationDropdown onLocationChange={handleLocationChange} />
      <View style={styles.Rcontainer}>
        <Input
          label="Registration In"
          containerStyle={styles.containerStyle}
          inputStyle={styles.inputStyle}
          placeholder="e.g Punjab 2000"
          value={enteredRegistrationIn}
          onChangeText={handleRegistrationInChange}
        />
      </View>
      <View style={styles.container}>
        <Input
          containerStyle={styles.containerStyle}
          inputStyle={styles.inputStyle}
          placeholder="Milieage"
          value={enteredMilage}
          onChangeText={handleMilageChange}
          leftIcon={<FontAwesome name="tachometer" size={24} color="black" />}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.container}>
        <Input
          containerStyle={styles.containerStyle}
          inputStyle={styles.inputStyle}
          placeholder="Transmission"
          value={enteredTransmission}
          onChangeText={handleTransmissionChange}
          leftIcon={<FontAwesome name="gear" size={24} color="black" />}
        />
      </View>
      <View style={styles.container}>
        <Input
          containerStyle={styles.containerStyle}
          inputStyle={styles.inputStyle}
          placeholder="Description"
          value={enteredDescription}
          onChangeText={handleDescriptionChange}
        />
      </View>
      <View style={styles.last}>
        <Input
          containerStyle={styles.containerStyle}
          inputStyle={styles.inputStyle}
          placeholder="Price"
          value={enteredPrice}
          onChangeText={handlePriceChange}
          leftIcon={<FontAwesome name="dollar" size={24} color="black" />}
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
  Rcontainer: {
    marginTop: 6,
    marginBottom: 4,
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
  last: {
    marginTop: 6,
    marginBottom: 50,
    borderRadius: 10,
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
