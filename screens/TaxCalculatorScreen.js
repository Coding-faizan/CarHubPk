import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Make sure you have installed @expo/vector-icons
import CalculateTax from '../components/CalculateTax/CalculateTax';
import { Colors } from '../constants/colors';

const TaxCalculatorScreen = () => {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.two}></View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.row}>
          <Text style={styles.data}>Calculate Tax</Text>
        </View>
        <View style={styles.con}>
          <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
            <CalculateTax />
          </ScrollView>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  two: {
    backgroundColor: Colors.primary200,
    position: "absolute",
    top: "0%",
    left: 0,
    right: 0,
    bottom: "40%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    zIndex: -1,
  },
  container: {
    flex: 1,
    marginTop: 30,
   
  },
  backButton: {
    position: 'absolute',
    top: 35,
    left: 15,
    zIndex: 1,
  },
  row: {
    marginTop: 65,
    "justifyContent":"center",
    "alignItems":"center",
  },
  data: {
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "left",
    paddingLeft: 10,
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 1.2 },
    textShadowRadius: 4,
  },
  con: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    paddingHorizontal: 20,
    "marginBottom":40,
  },
  content: {
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    "marginBottom":30,
  },
});

export default TaxCalculatorScreen;
