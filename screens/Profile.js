import { useContext, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { AuthContext } from "../store/auth-context";
import LoginFallBack from "../components/LoginFallBack";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import  {Colors}  from "../constants/colors";




const Demo={
  name:"Ali Hamza",
  email:"a@a.com",
  phoneNumber:"0310-4422589",
  location:"Allama Iqbal Town, Lahore",
  num:"2"
}

export default function Profile() {
  const authCtx = useContext(AuthContext);
  const [user,setUser]=useState();


  if (!authCtx.isAuthenticated) {
    return <LoginFallBack />;
  }

  return (
    <View style={styles.all}>   
      <View style={styles.container}>
        <FontAwesome style={styles.icon} name="user-circle" size={110} color="black" />
        <Text style={styles.txt}>{Demo.name}</Text>
        <Text style={styles.txt1}>{Demo.email}</Text>
      </View>
      <View style={styles.container1}>
        <View style={styles.row}>
          <View style={styles.pic}>
            <FontAwesome style={styles.icon1} name="phone" size={30} color="red" />
          </View>
          <Text style={styles.data}>{Demo.phoneNumber}</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.pic}>
            <Entypo style={styles.icon2} name="location-pin" size={30} color="purple" />
          </View>
          <Text style={styles.data}>{Demo.location}</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.pic}>
            <FontAwesome style={styles.icon3} name="car" size={28} color={Colors.primary500} />
          </View>
          <Text style={styles.data}>Number of Ads </Text>
          <View style={styles.car}><Text style={styles.num}>{Demo.num}</Text></View>
        </View>
        <View style={styles.log}>
        <Pressable style={styles.row1}>
          <View style={styles.pic}>
            <MaterialIcons style={styles.icon4} name="logout" size={30} color="white" />
          </View>
          <Text style={styles.data1}>Log Out</Text>
        </Pressable>
        </View>
      </View>

   </View>

  );
}

const styles = StyleSheet.create({
  all:{
    flex:1,
    backgroundColor:"lightgray"
  },
 container:{
  marginTop:35,
  paddingTop:55,
  flexDirection:"column",
  alignItems:"center",
  height:"42%",
  alignItems:"center",
  backgroundColor:"lightgray"
 },
 icon:{
  borderWidth:3,
  borderColor:Colors.primary400,
  textAlign:"center",
  borderRadius:65,
  paddingTop:5,
  paddingLeft:3,
  paddingRight:3
  // padding:8,
  // paddingLeft:20,
  // paddingRight:20
 },
 txt:{
  marginTop:10,
  fontSize:35,
  fontWeight:"500",
 },
 txt1:{
  fontSize:18,
  fontWeight:"400",
 },
 container1:{
  height:"60%",
  borderRadius:30,
  backgroundColor:"white",
  padding:20,
 },
 row:{
  flexDirection:"row",
  alignItems:"center",
  margin:20,
  // justifyContent:"center"
 },
 icon1:{
  // borderWidth:2,
  // borderColor:"red",
  textAlign:"center",
  borderRadius:15,
  paddingTop:5,
  paddingLeft:7.5,
  paddingRight:7.5,
  paddingBottom:5,
  // padding:6,
  backgroundColor:"rgb(255, 214, 204)"

 },
 icon2:{
  // borderWidth:2,
  // borderColor:"red",
  textAlign:"center",
  borderRadius:15,
  paddingTop:5,
  paddingLeft:4.5,
  paddingRight:4.5,
  paddingBottom:5,
  // padding:6,
  backgroundColor:"rgb(220, 190, 255)"

 },
 icon3:{
  // borderWidth:2,
  // borderColor:"red",
  textAlign:"center",
  borderRadius:15,
  paddingTop:6,
  paddingLeft:4.5,
  paddingRight:4.5,
  paddingBottom:6,
  // padding:6,
  backgroundColor:Colors.primary50

 },
 data:{
  marginLeft:30,
  // textAlign:"center",
  fontSize:20
 },
 car:{
  borderWidth:2,
  borderColor:"gray",
  borderRadius:20,
  paddingLeft:5.5,
  paddingRight:5.5,
  paddingBottom:2,
  backgroundColor:"gray",
  marginLeft:10
},
 num:{
  color:"white",
  fontWeight:"bold"
 },
 log:{
   justifyContent:"center",
   alignItems:"center",
  // width:"40%",
  paddingLeft:"25%",
  paddingRight:"25%"
 },
 row1:{
  flexDirection:"row",
  alignItems:"center",
  borderWidth:1,
  justifyContent:"center",
  borderColor:"white",
  elevation:2,
  width:"100%",
  padding:10,
  backgroundColor:Colors.primary400,
  borderRadius:20,
  marginTop:10
 },
 data1:{
  marginLeft:10,
  fontSize:22,
  color:"white",
  fontWeight:"bold"
 },

});
