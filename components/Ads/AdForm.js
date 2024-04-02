import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";
import BrandDropdown from "../AdFormInputs/BrandDropdown";
import ModelDropdown from "../AdFormInputs/ModelDropdown";
import LocationDropdown from "../AdFormInputs/LocationDropdown";
import { FontAwesome } from "@expo/vector-icons";
import ImagesField from "../AdFormInputs/ImagesField";
import { Colors } from "../../constants/colors";
//import axios from 'axios';
import { Alert } from 'react-native';
import { Buffer } from 'buffer';
import { useNavigation } from '@react-navigation/native';

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

const cloudName = 'dcp21awsm';
const apiKey = '397776926763822';
const apiSecret = 'bdtY4Wxb80BowEgVAoKaqqJe4MI';
const uploadPreset = 'car_images';

const uploadImageToCloudinary = async (imageUri) => {
    try {
        const formData = new FormData();
        formData.append('file', { uri: imageUri, name: 'image.jpg', type: 'image/jpeg' });
        formData.append('upload_preset', uploadPreset);

        const base64Credentials = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': 'Basic ' + base64Credentials
            },
        });

        if (response.ok) {
            const data = await response.json();
            if (data && data.secure_url) {
                //console.log('Image uploaded successfully:', data.secure_url);
                
                return data.secure_url;
            } else {
                console.error('Failed to retrieve image URL from response:', data);
                Alert.alert('Error', 'Failed to retrieve image URL from response. Please try again.');
                return null;
            }
        } else {
            console.error('Failed to upload image:', response.statusText);
            Alert.alert('Error', 'Failed to upload image. Please try again.');
            return null;
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        Alert.alert('Error', 'An error occurred while uploading image. Please try again.');
        return null;
    }
};


const handleUploadImages = async (carID, imagesUrl, callback) => {
    // Check if carID is fetched successfully
    if (!carID) {
        console.error("Error: Car ID is not fetched successfully");
        return;
    }

    // Check if imagesUrl is defined and not empty
    if (!imagesUrl || imagesUrl.length === 0) {
        console.error("Error: imagesUrl is not properly defined or is empty");
        return;
    }

    try {
        const uploadedImageUrls = [];

        // Iterate through each image URL
        for (let i = 0; i < imagesUrl.length; i++) {
            const imageUrl = imagesUrl[i];
            // Split the image URL by '/' to get the filename
            const imageName = imageUrl.split('/').pop();
            
            // Construct the new filename with carID + imageName
            const newFilename = `${carID}_${imageName}`;

            // Upload image to Cloudinary and get the URL
            const uploadedImageUrl = await uploadImageToCloudinary(imageUrl);
            
            // If upload successful, add URL to the array
            if (uploadedImageUrl) {
                uploadedImageUrls.push(uploadedImageUrl);
            }
        }

        // Execute the callback with the array of uploaded image URLs
        callback(uploadedImageUrls);

    } catch (error) {
        console.error('Error uploading image:', error);
        Alert.alert('Error', 'An error occurred while uploading image. Please try again.');
    }
};



const handleSubmit = () => {
  const navigation = useNavigation();
    let brandName = null;
    let carID = null;

    // Fetch brand name
    fetch('https://motorpak.000webhostapp.com/carfilters_api/fetch_makers_with_id_api.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: selectedBrand }), // Assuming 'selectedBrand' contains the brand ID
    })
    .then(response => response.json())
    .then(data => {
      // Assuming the API returns the name in the 'maker_name' field
      if (Array.isArray(data) && data.length > 0 && data[0].maker_name) {
        brandName = data[0].maker_name;
        
        // Fetch car ID
        fetch('https://motorpak.000webhostapp.com/car_api/fetch_car_id_api.php')
        .then(response => response.json())
        .then(data => {
          // Assuming the API returns the car ID in the 'LastCarID' field
          if (data && data.LastCarID) {
            // Log the car ID plus 1
            carID = parseInt(data.LastCarID) + 1;
            
            console.log('Car ID :', carID);
            
            // Call function to handle image upload to Cloudinary
            
            handleUploadImages(carID, imagesUrl, (uploadedUrls) => {
              // This code block is executed after the upload operation completes
              if (!uploadedUrls || !enteredTitle || !selectedLocation || !brandName || !selectedModel || !enteredMilage || !enteredDescription || !enteredPrice) {
                Alert.alert("Please fill all fields.");
              } else {
                console.log('Uploaded image URLs:', uploadedUrls);
                console.log("Title:", enteredTitle);
                console.log("Selected Location:", selectedLocation);
                            console.log("Selected Brand:", brandName);
                            console.log("Selected Model:", selectedModel);
                            console.log("Milage:", enteredMilage);
                            console.log("Description:", enteredDescription);
                            console.log("Price:", enteredPrice);

                            const apiEndpoint = 'https://motorpak.000webhostapp.com/car_api/post_car_api.php';

                            const data = {
                                makerName: brandName,
                                modelName: selectedModel,
                                variant: '', // You can add this if you have a variant field
                                registrationYear:enteredRegistrationIn, // Add registration year if available
                                price: enteredPrice,
                                mileage: enteredMilage,
                                fuelType: '', // Add fuel type if available
                                transmission: enteredTransmission, // Add transmission type if available
                                carCondition: 'Used', // Assuming car condition is always 'Used'
                                description: enteredDescription,
                                sellerID: 1001, // Hardcoding sellerID to 1001
                                location: selectedLocation,
                                carStatus: 'Active', // Assuming car status is always 'Active'
                                images: uploadedUrls,
                                title: enteredTitle
                            };

                            fetch(apiEndpoint, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(data)
                            })
                            .then(response => response.json())
                            .then(responseData => {
                                console.log('Response from server:', responseData);
                                // Handle success or failure based on responseData

                                // Example:
                                if (responseData.success) {
                                    // Success
                                     Alert.alert('Success', 'Ad posted successfully.', [
                                            {
                                                text: 'OK',
                                                onPress: () => {
                                          navigation.navigate('Home');
                                                    
                                                }
                                            }
                                        ]);
                                } else {
                                    // Failure
                                    Alert.alert('Error', 'Failed to post ad. Please try again.');
                                }
                            })
                            .catch(error => {
                                console.error('Error posting data:', error.message);
                                Alert.alert('Error', 'Failed to post data to the server. Please try again later.');
                            });
                        }
                    });
                } else {
                    console.error("Error: Invalid API response format for car ID");
                }
            })
            .catch(error => console.error("Error fetching car ID:", error));
        } else {
            console.error("Error: Invalid API response format for brand name");
        }
    })
    .catch(error => console.error("Error fetching brand name:", error));
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
          keyboardType="numeric"
        />
      </View>

      <Button
              title="Post Ad"
              onPress={handleSubmit}
              buttonStyle={styles.submitButton}
            
            />
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
    marginBottom: 6,
    borderRadius: 10,
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  submitButton: {
    marginTop: 5, // Adjust as needed
    marginBottom: 60,
    backgroundColor: Colors.secondary, // Change the color as needed
  },
});
