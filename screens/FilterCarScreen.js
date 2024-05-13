import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput,StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import SearchedData from './SearchedData';
import { useNavigation } from "@react-navigation/native";


const FilterCarScreen = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({
        priceMin: 100000,
        priceMax: 100000000,
        mileageMin: 0,
        mileageMax: 1000000,
        condition: "",
        location: "",
        maker: "",
        model: "",
        registeredIn: "",
        color: "",
        transmission: "",
        fuelType: "",
        engineCapacityMin: 400,
        engineCapacityMax: 2000,
        variant: "",
    });

    const [userInputs, setUserInputs] = useState([]);
    const [makers, setMakers] = useState([]);
    const [selectedMaker, setSelectedMaker] = useState("");
    const [models, setModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");

    useEffect(() => {
        fetchMakers();
    }, []);

    const fetchMakers = async () => {
        try {
            const response = await fetch("https://motorpak.000webhostapp.com/carfilters_api/fetch_makers_api.php");
            const data = await response.json();
            setMakers(data);
        } catch (error) {
            console.error("Error fetching makers:", error);
        }
    };

    const fetchModels = async (makerId) => {
        try {
            const response = await fetch("https://motorpak.000webhostapp.com/carfilters_api/fetch_models_api.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ m_id: makerId }),
            });
            const data = await response.json();
            setModels(data);
        } catch (error) {
            console.error("Error fetching models:", error);
        }
    };

    const handlePriceChange = (values) => {
        setFilters(prevState => ({
            ...prevState,
            priceMin: values[0],
            priceMax: values[1],
        }));
        setUserInputs(prevInputs => [...prevInputs, { field: 'priceMin', value: values[0] }, { field: 'priceMax', value: values[1] }]);
    };

    const handleMileageChange = (values) => {
        setFilters(prevState => ({
            ...prevState,
            mileageMin: values[0],
            mileageMax: values[1],
        }));
        setUserInputs(prevInputs => [...prevInputs, { field: 'mileageMin', value: values[0] }, { field: 'mileageMax', value: values[1] }]);
    };

    const handleInputChange = (fieldName, value) => {
        setFilters(prevState => ({
            ...prevState,
            [fieldName]: value,
        }));
        setUserInputs(prevInputs => [...prevInputs, { field: fieldName, value }]);
    };

    const handleConditionChange = (condition) => {
        setFilters(prevState => ({
            ...prevState,
            condition: condition,
        }));
        setUserInputs(prevInputs => [...prevInputs, { field: 'condition', value: condition }]);
    };

    const formatPrice = (value) => {
        if (value >= 10000000) {
            return `${value / 10000000} Crore`;
        } else if (value >= 100000) {
            return `${value / 100000} Lac`;
        } else {
            return `${value / 1000} Thousand`;
        }
    };

    const handleSearch = () => {
        navigation.navigate("SearchedData", {filters});
    };
    return (
    <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor="#b2d8ff" />
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.filtersContainer}>
                    <Text style={styles.sectionTitle}>Price Range</Text>
                    <View style={styles.sliderContainer}>
                        <Text style={styles.sliderText}>{`Min: ${formatPrice(filters.priceMin)}`}</Text>
                        <MultiSlider
                            values={[filters.priceMin, filters.priceMax]}
                            min={100000}
                            max={100000000}
                            step={50000}
                            sliderLength={300}
                            onValuesChange={handlePriceChange}
                            allowOverlap={false}
                            snapped
                            selectedStyle={{ backgroundColor: 'blue' }}
                            unselectedStyle={{ backgroundColor: 'silver' }}
                            containerStyle={{ height: 40 }}
                        />
                        <Text style={styles.sliderText}>{`Max: ${formatPrice(filters.priceMax)}`}</Text>
                    </View>
                    <Text style={styles.sectionTitle}>Mileage Range</Text>
                    <View style={styles.sliderContainer}>
                        <Text style={styles.sliderText}>{`Min: ${formatPrice(filters.mileageMin)} KM`}</Text>
                        <MultiSlider
                            values={[filters.mileageMin, filters.mileageMax]}
                            min={0}
                            max={1000000}
                            step={1000}
                            sliderLength={300}
                            onValuesChange={handleMileageChange}
                            allowOverlap={false}
                            snapped
                            selectedStyle={{ backgroundColor: 'blue' }}
                            unselectedStyle={{ backgroundColor: 'silver' }}
                            containerStyle={{ height: 40 }}
                        />
                        <Text style={styles.sliderText}>{`Max: ${formatPrice(filters.mileageMax)} KM`}</Text>
                    </View>
                    <Text style={styles.sectionTitle}>Engine Capacity Range</Text>
                    <View style={styles.sliderContainer}>
                        <Text style={styles.sliderText}>{`Min: ${filters.engineCapacityMin}`}</Text>
                        <MultiSlider
                            values={[filters.engineCapacityMin, filters.engineCapacityMax === 2000 ? 1999 : filters.engineCapacityMax]}
                            min={400}
                            max={2000}
                            step={1}
                            sliderLength={300}
                            onValuesChange={values => handleInputChange("engineCapacityMin", values[0])}
                            onValuesChangeFinish={values => setFilters(prevState => ({...prevState, engineCapacityMax: values[1]}))}
                            allowOverlap={false}
                            snapped
                            selectedStyle={{ backgroundColor: 'blue' }}
                            unselectedStyle={{ backgroundColor: 'silver' }}
                            containerStyle={{ height: 40 }}
                        />
                        <Text style={styles.sliderText}>{`Max: ${filters.engineCapacityMax === 2000 ? "Any" : filters.engineCapacityMax}`}</Text>
                    </View>
                    <Text style={styles.sectionTitle}>Condition</Text>
                    <View style={styles.tabsContainer}>
                        <TouchableOpacity
                            style={[styles.tabButton, filters.condition === "Both" && styles.selectedTab]}
                            onPress={() => handleConditionChange("Both")}
                        >
                            <Text style={styles.tabText}>Both</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tabButton, filters.condition === "Used" && styles.selectedTab]}
                            onPress={() => handleConditionChange("Used")}
                        >
                            <Text style={styles.tabText}>Used</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tabButton, filters.condition === "New" && styles.selectedTab]}
                            onPress={() => handleConditionChange("New")}
                        >
                            <Text style={styles.tabText}>New</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.sectionTitle}>Maker</Text>
                    <View style={styles.dropdownContainer}>
                        <Text style={styles.dropdownLabel}>Select Maker</Text>
                        <Picker
                            selectedValue={selectedMaker}
                            onValueChange={(itemValue, itemIndex) => {
                                setSelectedMaker(itemValue);
                                setSelectedModel("");
                                fetchModels(itemValue);
                                handleInputChange("maker", itemValue); // Added to update filters
                            }}
                            style={styles.picker}
                        >
                            <Picker.Item label="Select maker..." value="" />
                            {makers.map((maker) => (
                                <Picker.Item key={maker.id} label={maker.maker_name} value={maker.id} />
                            ))}
                        </Picker>
                    </View>
                    <Text style={styles.sectionTitle}>Model</Text>
                    <View style={styles.dropdownContainer}>
                        <Text style={styles.dropdownLabel}>Select Model</Text>
                        <Picker
                            selectedValue={selectedModel}
                            onValueChange={(itemValue, itemIndex) => {
                                setSelectedModel(itemValue);
                                handleInputChange("model", itemValue); // Added to update filters
                            }}
                            style={styles.picker}
                        >
                            <Picker.Item label="Select model..." value="" />
                            {models.map((model) => (
                                <Picker.Item key={model.id} label={model.model_name} value={model.model_name} />
                            ))}
                        </Picker>
                    </View>
                    <Text style={styles.sectionTitle}>Registered In</Text>
                    <View style={styles.dropdownContainer}>
                        <Text style={styles.dropdownLabel}>Select Location</Text>
                        <Picker
                            selectedValue={selectedLocation}
                            onValueChange={(itemValue, itemIndex) => {
                                setSelectedLocation(itemValue);
                                handleInputChange("registeredIn", itemValue); // Added to update filters
                            }}
                            style={styles.picker}
                        >
                            <Picker.Item label="Select location..." value="" />
                            <Picker.Item label="Islamabad" value="Islamabad" />
                            <Picker.Item label="Punjab" value="Punjab" />
                            <Picker.Item label="KPK" value="KPK" />
                            <Picker.Item label="Sindh" value="Sindh" />
                        </Picker>
                    </View>
                     </View>
            
                    <Text style={styles.sectionTitle}>Transmission</Text>
                    <View style={styles.tabsContainer}>
                        <TouchableOpacity
                            style={[styles.tabButton, filters.transmission === "Automatic" && styles.selectedTab]}
                            onPress={() => handleInputChange("transmission", "Automatic")}
                        >
                            <Text style={styles.tabText}>Automatic</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tabButton, filters.transmission === "Manual" && styles.selectedTab]}
                            onPress={() => handleInputChange("transmission", "Manual")}
                        >
                            <Text style={styles.tabText}>Manual</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.sectionTitle}>Fuel Type</Text>
                    <View style={styles.tabsContainer}>
                        <TouchableOpacity
                            style={[styles.tabButton, filters.fuelType === "Petrol" && styles.selectedTab]}
                            onPress={() => handleInputChange("fuelType", "Petrol")}
                        >
                            <Text style={styles.tabText}>Petrol</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tabButton, filters.fuelType === "Diesel" && styles.selectedTab]}
                            onPress={() => handleInputChange("fuelType", "Diesel")}
                        >
                            <Text style={styles.tabText}>Diesel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tabButton, filters.fuelType === "CNG" && styles.selectedTab]}
                            onPress={() => handleInputChange("fuelType", "CNG")}
                        >
                            <Text style={styles.tabText}>CNG</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tabButton, filters.fuelType === "Hybrid" && styles.selectedTab]}
                            onPress={() => handleInputChange("fuelType", "Hybrid")}
                        >
                            <Text style={styles.tabText}>Hybrid</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tabButton, filters.fuelType === "Electric" && styles.selectedTab]}
                            onPress={() => handleInputChange("fuelType", "Electric")}
                        >
                            <Text style={styles.tabText}>Electric</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.sectionTitle}>Variant</Text>
                    <View style={styles.tabsContainer}>
                        <TouchableOpacity
                            style={[styles.tabButton, filters.variant === "Sedan" && styles.selectedTab]}
                            onPress={() => handleInputChange("variant", "Sedan")}
                        >
                            <Text style={styles.tabText}>Sedan</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tabButton, filters.variant === "Hatchback" && styles.selectedTab]}
                            onPress={() => handleInputChange("variant", "Hatchback")}
                        >
                            <Text style={styles.tabText}>Hatchback</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tabButton, filters.variant === "SUV" && styles.selectedTab]}
                            onPress={() => handleInputChange("variant", "SUV")}
                        >
                            <Text style={styles.tabText}>SUV</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tabButton, filters.variant === "MPV" && styles.selectedTab]}
                            onPress={() => handleInputChange("variant", "MPV")}
                        >
                            <Text style={styles.tabText}>MPV</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tabButton, filters.variant === "Offroad" && styles.selectedTab]}
                            onPress={() => handleInputChange("variant", "Offroad")}
                        >
                            <Text style={styles.tabText}>Offroad</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tabButton, filters.variant === "Mini" && styles.selectedTab]}
                            onPress={() => handleInputChange("variant", "Mini")}
                        >
                            <Text style={styles.tabText}>Mini</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tabButton, filters.variant === "Truck" && styles.selectedTab]}
                            onPress={() => handleInputChange("variant", "Truck")}
                        >
                            <Text style={styles.tabText}>Truck</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tabButton, filters.variant === "Sports" && styles.selectedTab]}
                            onPress={() => handleInputChange("variant", "Sports")}
                        >
                            <Text style={styles.tabText}>Sports</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tabButton, filters.variant === "High Roof" && styles.selectedTab]}
                            onPress={() => handleInputChange("variant", "High Roof")}
                        >
                            <Text style={styles.tabText}>High Roof</Text>
                        </TouchableOpacity>
                        {/* Add more variants here */}
                    </View>
                    <Text style={styles.sectionTitle}>Color</Text>
                    <View style={styles.tabsContainer}>
                        <TouchableOpacity
                            style={[styles.colorTabButton, filters.color === "Red" && styles.selectedColorTab]}
                            onPress={() => handleInputChange("color", "Red")}
                        >
                            <View style={[styles.colorCircle, { backgroundColor: "red" }]} />
                            <Text style={styles.colorTabText}>Red</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.colorTabButton, filters.color === "Blue" && styles.selectedColorTab]}
                            onPress={() => handleInputChange("color", "Blue")}
                        >
                            <View style={[styles.colorCircle, { backgroundColor: "blue" }]} />
                            <Text style={styles.colorTabText}>Blue</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.colorTabButton, filters.color === "Black" && styles.selectedColorTab]}
                            onPress={() => handleInputChange("color", "Black")}
                        >
                            <View style={[styles.colorCircle, { backgroundColor: "black" }]} />
                            <Text style={styles.colorTabText}>Black</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.colorTabButton, filters.color === "White" && styles.selectedColorTab]}
                            onPress={() => handleInputChange("color", "White")}
                        >
                            <View style={[styles.colorCircle, { backgroundColor: "white" }]} />
                            <Text style={styles.colorTabText}>White</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.colorTabButton, filters.color === "Gray" && styles.selectedColorTab]}
                            onPress={() => handleInputChange("color", "Gray")}
                        >
                            <View style={[styles.colorCircle, { backgroundColor: "gray" }]} />
                            <Text style={styles.colorTabText}>Gray</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.colorTabButton, filters.color === "Silver" && styles.selectedColorTab]}
                            onPress={() => handleInputChange("color", "Silver")}
                        >
                            <View style={[styles.colorCircle, { backgroundColor: "silver" }]} />
                            <Text style={styles.colorTabText}>Silver</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.colorTabButton, filters.color === "Green" && styles.selectedColorTab]}
                            onPress={() => handleInputChange("color", "Green")}
                        >
                            <View style={[styles.colorCircle, { backgroundColor: "green" }]} />
                            <Text style={styles.colorTabText}>Green</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.searchButtonContainer}>
            <TouchableOpacity
                style={styles.searchButton}
                onPress={handleSearch}
            >
                <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
        </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    searchButton: {
        backgroundColor: 'blue',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    searchButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    filtersContainer: {
        padding: 20,
        backgroundColor: '#f2f2f2',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
    },
    sliderContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 20,
    },
    sliderText: {
        marginBottom: 5,
    },
    tabsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    tabButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        margin: 5,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
    selectedTab: {
        backgroundColor: '#2487e3',
    },
    tabText: {
        color: 'black',
    },
    colorTabButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        margin: 5,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
    selectedColorTab: {
        borderColor: 'blue',
    },
    colorCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginRight: 5,
    },
    colorTabText: {
        color: 'black',
    },
});

export default FilterCarScreen;
