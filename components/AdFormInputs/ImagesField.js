import { View, Text, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { launchCameraAsync, launchImageLibraryAsync } from "expo-image-picker";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function imagesField() {
  const [selectedImages, setSelectedImages] = useState([]);

  const takeImageHanlder = async () => {
    const image = await launchCameraAsync({
      allowsEditing: true,
      quality: 0.5,
    });

    console.log(image);

    setSelectedImages((prevImages) => [...prevImages, image.assets[0].uri]);
  };

  const imageFromGalleryHandler = async () => {
    const image = await launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.5,
    });

    console.log(image);

    setSelectedImages((prevImages) => [...prevImages, image.assets[0].uri]);
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
        <Button title="Open camera" onPress={takeImageHanlder} />
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
});
