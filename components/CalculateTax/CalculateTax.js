import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const CalculateTax = () => {
  const [province, setProvince] = useState('');
  const [engineCapacity, setEngineCapacity] = useState('');
  const [carType, setCarType] = useState('');
  const [carMake, setCarMake] = useState('');
  const [carModel, setCarModel] = useState('');
  const navigation = useNavigation();

  const handleCalculateTax = () => {
    Alert.alert("Calculate Tax", "Yet to implement");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.field}>
          <Text style={styles.label}>Select Province:</Text>
          <View style={styles.dropdownContainer}>
            <Picker
              style={styles.input}
              selectedValue={province}
              onValueChange={(itemValue) => setProvince(itemValue)}>
              {/* <Picker.Item label="Select Province" value="" /> */}
              <Picker.Item label="Punjab" value="Punjab" />
              <Picker.Item label="Sindh" value="Sindh" />
              <Picker.Item label="Khyber Pakhtunkhwa" value="KPK" />
              <Picker.Item label="Balochistan" value="Balochistan" />
              <Picker.Item label="Gilgit-Baltistan" value="GB" />
              <Picker.Item label="Azad Kashmir" value="AJK" />
            </Picker>
          </View>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Enter Engine Capacity:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter engine capacity"
            value={engineCapacity}
            onChangeText={setEngineCapacity}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Select Car Type:</Text>
          <View style={styles.dropdownContainer}>
            <Picker
              style={styles.input}
              selectedValue={carType}
              onValueChange={(itemValue) => setCarType(itemValue)}>
              <Picker.Item label="Sedan" value="Sedan" />
              <Picker.Item label="SUV" value="SUV" />
              <Picker.Item label="Coupe" value="Coupe" />
              <Picker.Item label="Hatchback" value="Hatchback" />
              <Picker.Item label="Van" value="Van" />
              <Picker.Item label="Crossover" value="Crossover" />
              <Picker.Item label="Pickup" value="Pickup" />
              <Picker.Item label="HighRoof" value="HighRoof" />
            </Picker>
          </View>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Enter Car Make:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter car make"
            value={carMake}
            onChangeText={setCarMake}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Enter Car Model:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter car model"
            value={carModel}
            onChangeText={setCarModel}
          />
        </View>
        <Button title="Calculate Tax" onPress={handleCalculateTax} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  },
  content: {
    width: 300, padding: 20
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    width: '100%',
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
});

export default CalculateTax;

