import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, Text } from 'react-native';
import CalculateTax from '../components/CalculateTax/CalculateTax';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../constants/colors';

const TaxCalculatorScreen = () => {
  return (
    <>
     <View style={styles.two}></View>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.data}>Calculate Tax</Text>
        </View>
        <View style={styles.con}>
        <ScrollView style={styles.content}>
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
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: "center",
    // marginTop:50
  },
  row: {
    marginTop: 65,
    marginLeft: 15,
    marginBottom:20,
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
  con:{
    // flex: 1,
    justifyContent: 'center',
    alignItems: "center",

  },
  content: {
    
  },
});

export default TaxCalculatorScreen;
