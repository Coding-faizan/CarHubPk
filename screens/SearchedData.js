import React, { useState, useEffect } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { useIsFocused, useRoute } from "@react-navigation/native";
import AdsList from "../components/Ads/AdsList";
import { Colors } from '../constants/colors';
import fetchFilteredAds from "../util/http";
const SearchedData = () => {
  const [filteredCars, setFilteredCars] = useState([]);
  const isFocused = useIsFocused();
  const route = useRoute();
  const filters = route.params?.filters || {};

  useEffect(() => {
    if (isFocused) {
      async function getAds() {
        try {
          const ads = await fetchFilteredAds(filters);
          setFilteredCars(ads);
          console.log(ads);
        } catch (error) {
          console.error('Error:', error);
          Alert.alert("Error", "An error occurred while fetching data");
        }
      }

      getAds();
    }
  }, [isFocused, filters]);



  return (
    <>
     <View style={styles.two}></View>
   
            <View style={styles.container1}>
        <AdsList style={styles.list} Ads={filteredCars} />
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
    bottom: "30%",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    zIndex: -1,
  },
  header: {
    paddingTop: 40,
    paddingVertical: 10,
    backgroundColor: Colors.primary200,
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop:10
  },
  container: {
    flex: 1,
    flexDirection:'row',
    padding: 20,
    marginTop:30,
    borderWidth:1,
    borderColor:"black"  
},
searchContainer: {
  backgroundColor: "white",
  height: 40,
  width: "60%",
  flexDirection: "row",
  borderRadius: 20,
  alignItems: "center",
},
item: {
  justifyContent: "center",
  alignItems: "center",
  paddingVertical: 7,
  paddingHorizontal: 20,
  borderRadius: 15,
  color: "white",
  height:40
},
icon: {
  marginLeft: 10,
},
txt: {
  marginLeft: 10,
  color: "#B0B0B0",
},
searchBar: {
  paddingLeft:10

  },
  container1: {
    marginTop: 0,
    flexDirection: "column",
    alignItems: "center",
    height: "81%",
  },
 
});

export default SearchedData;