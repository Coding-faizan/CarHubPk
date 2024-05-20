import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CalculateTax = () => {
  const [taxPayerStatus, setTaxPayerStatus] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [commercialVehicleType, setCommercialVehicleType] = useState('');
  const [ladenWeight, setLadenWeight] = useState('');
  const [numSeats, setNumSeats] = useState('');
  const [engineCapacity, setEngineCapacity] = useState('');
  const [taxPeriod, setTaxPeriod] = useState('');
  const [charges, setCharges] = useState([]);

  const handleCalculateTax = () => {
    const motorVehicleTax = calculateMotorVehicleTax();
    const yearsDifference = calculateYearsDifference(taxPeriod);
    const quartersDifference = calculateQuartersDifference(taxPeriod);
    const arrears = motorVehicleTax * yearsDifference;
    const penalty = quartersDifference * 100;
    const withholdingTaxMultiplier = (taxPayerStatus === "2") ? 2 : 1;
    const row3Amount = calculateRow3Amount(withholdingTaxMultiplier);
    const row4Amount = row3Amount * yearsDifference;

    const totalAmount = motorVehicleTax + arrears + penalty + row3Amount + row4Amount;

    const chargesDetails = [
      { type: 'Token Tax Current', amount: motorVehicleTax },
      { type: 'Token Tax Arrears', amount: arrears },
      { type: 'Withholding Tax Current', amount: row3Amount },
      { type: 'Withholding Tax Arrears', amount: row4Amount },
      { type: 'Late Payment Surcharge', amount: penalty },
      { type: 'Estimated Total', amount: totalAmount }
    ];

    setCharges(chargesDetails);
    Alert.alert("Tax Calculated", "Please check the charges details.");
  };

  const calculateMotorVehicleTax = () => {
    if (vehicleType === "1") {
      switch (commercialVehicleType) {
        case "1":
          return 1600;
        case "2":
          return 4000;
        case "3":
          return 4800;
        case "4":
          return 5200;
        case "5":
          return numSeats * 100;
        case "6":
        case "7":
          return numSeats * 60;
        default:
          return 0;
      }
    } else {
      if (engineCapacity >= 200 && engineCapacity <= 1000) return 1000;
      if (engineCapacity >= 1001 && engineCapacity <= 1500) return 1200;
      if (engineCapacity >= 1501 && engineCapacity <= 2000) return 1500;
      if (engineCapacity >= 2001) return 1800;
      return 0;
    }
  };

  const calculateYearsDifference = (taxPeriod) => {
    return Math.floor(taxPeriod / 12);
  };

  const calculateQuartersDifference = (taxPeriod) => {
    return Math.floor(taxPeriod / 3);
  };

  const calculateRow3Amount = (multiplier) => {
    if (vehicleType === "1") {
      if (numSeats >= 4 && numSeats <= 9) return numSeats * 200 * multiplier;
      if (numSeats >= 10 && numSeats <= 19) return numSeats * 500 * multiplier;
      if (numSeats >= 20) return numSeats * 1000 * multiplier;
    } else {
      if (engineCapacity <= 1000) return 800 * multiplier;
      if (engineCapacity >= 1001 && engineCapacity <= 1199) return 1500 * multiplier;
      if (engineCapacity >= 1200 && engineCapacity <= 1299) return 1750 * multiplier;
      if (engineCapacity >= 1300 && engineCapacity <= 1499) return 2500 * multiplier;
      if (engineCapacity >= 1500 && engineCapacity <= 1599) return 3750 * multiplier;
      if (engineCapacity >= 1600 && engineCapacity <= 1999) return 4500 * multiplier;
      if (engineCapacity >= 2000) return 10000 * multiplier;
      return ladenWeight * 2.5 * multiplier;
    }
    return 0;
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.label}>Tax Payer Status:</Text>
      <Picker
        selectedValue={taxPayerStatus}
        onValueChange={(itemValue) => setTaxPayerStatus(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Status" value="" />
        <Picker.Item label="Owner" value="1" />
        <Picker.Item label="Lessee" value="2" />
      </Picker>

      <Text style={styles.label}>Vehicle Type:</Text>
      <Picker
        selectedValue={vehicleType}
        onValueChange={(itemValue) => setVehicleType(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Vehicle Type" value="" />
        <Picker.Item label="Private" value="0" />
        <Picker.Item label="Commercial" value="1" />
      </Picker>

      {vehicleType === '1' && (
        <>
          <Text style={styles.label}>Commercial Vehicle Type:</Text>
          <Picker
            selectedValue={commercialVehicleType}
            onValueChange={(itemValue) => setCommercialVehicleType(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Commercial Vehicle Type" value="" />
            <Picker.Item label="Truck" value="1" />
            <Picker.Item label="Bus" value="2" />
            <Picker.Item label="Taxi" value="3" />
            <Picker.Item label="Rickshaw" value="4" />
            <Picker.Item label="Minivan" value="5" />
            <Picker.Item label="Van" value="6" />
            <Picker.Item label="Other" value="7" />
          </Picker>

          <Text style={styles.label}>Laden Weight:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={ladenWeight}
            onChangeText={setLadenWeight}
          />
        </>
      )}

      {vehicleType === '0' && (
        <>
          <Text style={styles.label}>Engine Capacity (cc):</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={engineCapacity}
            onChangeText={setEngineCapacity}
          />
        </>
      )}

      <Text style={styles.label}>Number of Seats:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={numSeats}
        onChangeText={setNumSeats}
      />

      <Text style={styles.label}>Tax Period (Months):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={taxPeriod}
        onChangeText={setTaxPeriod}
      />

      <Button title="Calculate Tax" onPress={handleCalculateTax} />

      {charges.length > 0 && (
        <View style={styles.chargesContainer}>
          <Text style={styles.chargesTitle}>Charges Details:</Text>
          {charges.slice(0, charges.length - 1).map((charge, index) => (
                <View key={index} style={styles.chargeItem}>
              <Text style={styles.chargeType}>{charge.type}</Text>
              <Text style={styles.chargeAmount}>{charge.amount.toFixed(2)}</Text>
              </View>
              ))}

          <View style={styles.chargeItem}>
            <Text style={[styles.chargeType, styles.boldText,styles.greenText]}>Estimated Total:</Text>
            <Text style={[styles.chargeAmount, styles.boldText,styles.greenText]}>{charges[charges.length - 1].amount.toFixed(2)}</Text>
          </View>
         <View style={styles.chargeItem}>
            <Text style={[styles.chargeType, styles.boldText]}>
          Estimated Total if <Text style={styles.redText}>Late</Text> Payment:
          </Text>
          <Text style={[styles.chargeAmount, styles.boldText,styles.redText]}>
          {(charges[charges.length - 1].amount + charges.find(c => c.type === 'Late Payment Surcharge').amount).toFixed(2)}
          </Text>
        </View>

        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 30, // Margin at the bottom
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 32,
    paddingLeft: 8,
    borderRadius: 5,
  },
  picker: {
    height: 40,
    marginBottom: 12,
  },
  chargesContainer: {
    marginTop: 30,
    marginBottom:42,
  },
  chargesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chargeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 7,
  },
  chargeType: {
    fontSize: 16,
  },
  chargeAmount: {
    fontSize: 16,
  },
  boldText: {
    fontWeight: 'bold',
  },
   redText: {
    color: 'red',
  },
  greenText: {
    color: 'green',
  },
});

export default CalculateTax;
