import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Colors } from "../../constants/colors";
import { FontAwesome5 } from "@expo/vector-icons";

const ModelDropdown = ({ selectedBrand }) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [carModels, setCarModels] = useState([]);

  useEffect(() => {
    if (selectedBrand) {
      console.log("Brand ID that comes from BrandDropdown is --", selectedBrand);
      fetchModels(selectedBrand);
    }
  }, [selectedBrand]);

  const fetchModels = (brandId) => {
    fetch('https://motorpak.000webhostapp.com/carfilters_api/fetch_models_api.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ m_id: brandId }),
    })
      .then(response => response.json())
      .then(data => {
        //console.log("Fetched model data:", data);
        
        const modelData = data.map(item => ({
          label: item.model_name,
          value: item.model_name
        }));
        setCarModels(modelData);
      })
      .catch(error => console.error("Error fetching car models:", error));
  };

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
