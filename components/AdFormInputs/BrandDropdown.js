import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "../../constants/colors";
import { FontAwesome5 } from "@expo/vector-icons";

const BrandDropdown = ({ onBrandChange }) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const carBrands = [
    { label: "Toyota", value: "Toyota" },
    { label: "Honda", value: "Honda" },
    { label: "Ford", value: "Ford" },
    { label: "Chevrolet", value: "Chevrolet" },
    { label: "Nissan", value: "Nissan" },
    { label: "BMW", value: "BMW" },
    { label: "Mercedes-Benz", value: "Mercedes-Benz" },
    { label: "Audi", value: "Audi" },
    { label: "Hyundai", value: "Hyundai" },
    { label: "Kia", value: "Kia" },
  ];

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: Colors.primary }]}>
          Car Brand
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
        data={carBrands}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Car Brand" : "..."}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
          onBrandChange(item.value); // Call the onBrandChange function with the selected value
        }}
        renderLeftIcon={() => (
          <FontAwesome5 style={styles.icon} name="car" size={20} />
        )}
      />
    </View>
  );
};

export default BrandDropdown;

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
