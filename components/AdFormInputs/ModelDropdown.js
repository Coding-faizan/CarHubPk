import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Colors } from "../../constants/colors";
import { FontAwesome5 } from "@expo/vector-icons";

const ModelDropdown = ({ selectedBrand, onModelChange }) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [carModels, setCarModels] = useState([]);

  // Simulated car models data based on the selected brand
  useEffect(() => {
    // You can fetch the car models data from an API based on the selected brand
    // For simplicity, I'll use a static list of car models here
    let models = [];
    if (selectedBrand === "Toyota") {
      models = [
        { label: "Corolla", value: "Corolla" },
        { label: "Camry", value: "Camry" },
        { label: "Rav4", value: "Rav4" },
      ];
    } else if (selectedBrand === "Honda") {
      models = [
        { label: "Civic", value: "Civic" },
        { label: "Accord", value: "Accord" },
        { label: "CR-V", value: "CR-V" },
      ];
    } // Add more conditions for other brands as needed

    setCarModels(models);
  }, [selectedBrand]);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: Colors.primary }]}>
          Car Model
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: Colors.primary }]}
        data={carModels}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Car Model" : "..."}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
          onModelChange(item.value); // Call the onModelChange function with the selected value
        }}
        renderLeftIcon={() => (
          <FontAwesome5 style={styles.icon} name="car" size={20} />
        )}
      />
    </View>
  );
};

export default ModelDropdown;

const styles = StyleSheet.create({
  container: {
    marginTop: 6,
    borderRadius: 10,
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
});
