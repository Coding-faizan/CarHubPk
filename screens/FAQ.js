import React from 'react';
import { View, StyleSheet,  Text } from 'react-native';
import Accordion from '../components/Accordion/Acc';
import accData from '../components/Accordion/accData';
import { Colors } from "../constants/colors";
import {LinearGradient} from "expo-linear-gradient";

const FAQ = () => {
  return (
    <>
    <View style={styles.two}></View>
  <View style={styles.cont}>
      <View style={styles.row}>
         <Text style={styles.data}>F.A.Qs</Text>
      </View>
          <View style={styles.container}>
      <Accordion data={accData} />
    </View>
    </View>
    </>
  );
};

export default FAQ;



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
  row: {
    marginTop: 65,
    marginLeft: 15,
    marginBottom:5,
  },
  data: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "left",
    paddingLeft: 10,
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 1.2 },
    textShadowRadius: 4,
  },

      container:{
        margin:15,
        // marginTop:30,

      },
      item:{
        padding:20,
        marginTop:10,
        marginBottom:10,
    
      },
      
})
