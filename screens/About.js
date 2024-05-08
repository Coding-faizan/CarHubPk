import React from "react";
import { View, Text, Pressable , StyleSheet} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../constants/colors";


export default function About() {

  

  return (
    <>
    <View style={styles.all}>
        <View style={styles.more}>
        <Text style={styles.moreText}>About <Text style={styles.carhub}>CarHubPk</Text></Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>CarHubPk serves as a gateway to understanding our commitment to revolutionizing the car buying and selling experience. With a sleek and intuitive interface, we provide a platform where users can seamlessly post ads for their vehicles, whether they're looking to sell or purchase. Our mission is to simplify the process, offering a one-stop solution that caters to both sellers and buyers, fostering trust and transparency in every transaction.</Text>
      </View>
        <View style={styles.container1}>
        <Text style={styles.text}>At our core, we prioritize user satisfaction and safety. Our team of experts is dedicated to ensuring a secure environment for all transactions, implementing robust verification processes and stringent quality standards. Whether you're a seasoned car enthusiast or a first-time buyer, our user-friendly interface and comprehensive support system are designed to guide you through every step of the journey. Join us today and experience the future of car trading firsthand.</Text>
    </View>
    </View>
    </>
    
  );
}

const styles = StyleSheet.create({
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
      carhub:{
        color:Colors.primary500,
      },
      container:{
        margin:15,
        marginTop:30,

      },
      container1:{
        // marginTop:15,
        marginLeft:15,
        marginRight:15,

      },
      text:{
        textAlign:"justify",
        fontSize:17,
        fontWeight:"400"
      },

      
})
