import React, { useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { launchCameraAsync, launchImageLibraryAsync } from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ImagesField({ onChangeImages }) {
  const [selectedImages, setSelectedImages] = useState([]);

  const takeImageHandler = async () => {
    const image = await launchCameraAsync({
      allowsEditing: true,
      quality: 0.5,
    });

    if (!image.canceled) {
      setSelectedImages((prevImages) => [...prevImages, image.assets[0].uri]);
      console.log(selectedImages);
      onChangeImages([...selectedImages, image.assets[0].uri]);
    }
  };

  const imageFromGalleryHandler = async () => {
    const image = await launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.5,
    });

    if (!image.canceled) {
      setSelectedImages((prevImages) => [...prevImages, image.assets[0].uri]);

      onChangeImages([...selectedImages, image.assets[0].uri]);
    }
  };

  let imagePreview;

  if (selectedImages.length === 0) {
    imagePreview = (
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name="camera-plus-outline"
          size={48}
          color="black"
        />
        <Text style={styles.label}>Add Car Photo</Text>
      </View>
    );
  } else {
    imagePreview = (
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.imageContainer}
      >
        {selectedImages.map((imageUri, index) => (
          <Image key={index} source={{ uri: imageUri }} style={styles.img} />
        ))}
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      {imagePreview}
      <View style={styles.btnContainer}>
        <Button title="Open camera" onPress={takeImageHandler} />
        <Button title="Open Gallery" onPress={imageFromGalleryHandler} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: "#FAF9F6",
    borderRadius: 10,
    borderStyle: "dotted",
    borderWidth: 2,
  },
  imageContainer: {
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  img: {
    width: 120,
    height: 120,
    marginVertical: 10,
    marginLeft: 8,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 6,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 6,
  },
  label: {
    marginTop: 10,
  },
});
