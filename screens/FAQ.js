import React from 'react';
import { View, StyleSheet,  Text } from 'react-native';
import Accordion from '../components/Accordion/Acc';
import accData from '../components/Accordion/accData';
import { Colors } from "../constants/colors";
import {LinearGradient} from "expo-linear-gradient";

const FAQ = () => {
  return (<View style={styles.cont}>

      <LinearGradient style={styles.item} colors={["#E6E6E6", "#F2F2F2","#E6E6E6"]}>
         <Text style={styles.moreText}>F.A.Qs</Text>
      </LinearGradient>
          <View style={styles.container}>
      <Accordion data={accData} />
    </View>
    </View>
  );
};

export default FAQ;



const styles = StyleSheet.create({
   cont:{
    marginTop:30
   },
    more: {
        backgroundColor: "#ECECEC",
        // textAlign:"center",
        padding: 10,
        paddingTop:15,
        marginTop:40,
    
      },
    
      moreText: {
        fontSize: 32,
        fontWeight:"700",
        textAlign:"center",
        
    
      },
      container:{
        margin:15,
        // marginTop:30,

      },
      item:{
        padding:20,
        // borderWidth:1,
        // borderColor:"black",
        marginTop:10,
        marginBottom:10,
        // width:300,
        // borderRadius:30,
        // backgroundColor:Colors.primary400,
    
      },
      
})
