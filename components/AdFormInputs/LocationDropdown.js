import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import { Colors } from "../../constants/colors";
import { Entypo } from "@expo/vector-icons";

const LocationDropdown = ({ onLocationChange }) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const cities = [
    { label: "Karachi", value: "Karachi" },
    { label: "Lahore", value: "Lahore" },
    { label: "Islamabad", value: "Islamabad" },
    { label: "Rawalpindi", value: "Rawalpindi" },
    { label: "Faisalabad", value: "Faisalabad" },
    { label: "Multan", value: "Multan" },
    { label: "Hyderabad", value: "Hyderabad" },
    { label: "Peshawar", value: "Peshawar" },
    { label: "Quetta", value: "Quetta" },
    { label: "Sialkot", value: "Sialkot" },
  ];

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: Colors.primary }]}>
          Location
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
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={cities}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Location" : "..."}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
          onLocationChange(item.value); // Call the onLocationChange function with the selected value
        }}
        renderLeftIcon={() => (
          <Entypo
            style={styles.icon}
            color={isFocus ? Colors.primary : "black"}
            name="location-pin"
            size={20}
          />
        )}
      />
    </View>
  );
};

export default LocationDropdown;

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
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
