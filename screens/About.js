import React from "react";
import { View, Text, Pressable , StyleSheet} from "react-native";
import { Colors } from "../constants/colors";
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';




export default function About() {

  

  return (
    <>
     {/* <BlurView blurType="light" blurAmount={10} style={styles.two}></BlurView> */}
     <LinearGradient
        colors={[ Colors.primary200,'transparent']}
        style={styles.two}
      >
        <BlurView intensity={50} style={styles.blur} />
      </LinearGradient>
        <View style={styles.row}>
         <Text style={styles.data}>About <Text style={styles.carhub}>CarHubPk</Text></Text>
        </View>
      <View style={styles.container}>
        <Text style={styles.text}>CarHubPk serves as a gateway to understanding our commitment to revolutionizing the car buying and selling experience. With a sleek and intuitive interface, we provide a platform where users can seamlessly post ads for their vehicles, whether they're looking to sell or purchase. Our mission is to simplify the process, offering a one-stop solution that caters to both sellers and buyers, fostering trust and transparency in every transaction.</Text>
      </View>
      <View style={styles.container1}>
        <Text style={styles.text}>At our core, we prioritize user satisfaction and safety. Our team of experts is dedicated to ensuring a secure environment for all transactions, implementing robust verification processes and stringent quality standards. Whether you're a seasoned car enthusiast or a first-time buyer, our user-friendly interface and comprehensive support system are designed to guide you through every step of the journey. Join us today and experience the future of car trading firsthand.</Text>
    </View>
    </>
    
  );
}

const styles = StyleSheet.create({
  two: {
    // backgroundColor: Colors.primary200,
    position: "absolute",
    top: "0%",
    left: 0,
    right: 0,
    bottom: "10%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    zIndex: -1,
  },
  row: {
    marginTop: 65,
    // marginLeft: 15,
    marginBottom:5,
  },
  data: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 1.2 },
    textShadowRadius: 4,
  },
      carhub:{
        color:Colors.primary50,
      },
      container:{
        margin:15,
        marginTop:20,

      },
      container1:{
        // marginTop:15,
        marginLeft:15,
        marginRight:15,

      },
      text:{
        textAlign:"justify",
        fontSize:20,
        fontWeight:"bold",
        color:"white",
        textShadowColor: "black",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 4,
      },

      
})
