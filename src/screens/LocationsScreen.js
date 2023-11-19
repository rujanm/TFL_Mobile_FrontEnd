import React, {useEffect, useState} from 'react';
import {Text, Button, View, SafeAreaView, ScrollView, StyleSheet, Dimensions} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import openMap from 'react-native-open-maps';
import axios from 'axios';

const {width, height} = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.5;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_POSITION = {
    latitude: 41.2565,
    longitude: -95.9345,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
};


let all_stores;


axios
          .get('http://10.0.2.2:8000/api/v1/get_stores/')
          .then(res => {
              console.log(res.data)
              
              all_stores = res.data
            
          })
          .catch(e => {
              console.log(e.data)
          });






const Entries = () => {
  var allEntries = []
  for(let i = 0; i < all_stores.length; i++){
    allEntries.push(
        <View key={i} style={styles.location_entries}>
          <Text>{all_stores[i]['name']}</Text>
          <Text> {all_stores[i]['address']}</Text>
          <Text> {all_stores[i]['phone_number']}</Text>
          <Text> {all_stores[i]['website']}</Text>
        </View>
    )
  }
  return (
    allEntries
  )
}




//-------------------------------------------------------------------------
const Markers = () => {
  
var allMarkers = []
for(let i = 0; i < all_stores.length; i++) {
  allMarkers.push(
    <Marker 
          key = {i} 
          coordinate={{
            latitude: all_stores[i]['lattitude'],
            longitude: all_stores[i]['longitude'],
            
                      }}
          />
  )}
        
  
  
  if(allMarkers.length != 0){
    return(
      <MapView style={styles.map} provider={PROVIDER_GOOGLE} initialRegion={INITIAL_POSITION}>
        {allMarkers}
      </MapView>
    )
  }
  else{
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }
  
  
}

//----------------------------------------------------------------------------------


export default function App() {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.container1}>
            <GooglePlacesAutocomplete
            placeholder='Search'
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(data, details);
            }}
            query={{
              key: 'YOUR API KEY',
              language: 'en',
            }}
            />
        
              <Markers/>
          
        </View>
      

      
      <ScrollView style={styles.container1}>
        
        <Entries/>
      </ScrollView>


    </SafeAreaView>
    

    
  );
}
//--------------------------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  container1: {
    flex: 1,
    width: Dimensions.get('window').width, 
  },
  location_entries: {
    shadowColor: "#000",
    shadowOffset: {
      width: 20,
      height: 40,
    },
    shadowOpacity: 20,
    shadowRadius: 4.65,
    
    elevation: 8,


    marginTop: 10,
    paddingVertical: 8,
    
    borderColor: "#20232a",
    borderRadius: 10,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",



     
      borderWidth:1,
      overflow: 'hidden',
      shadowColor: 'yourchoice',
      shadowRadius: 10,
      shadowOpacity: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height/2.5,
  },
});



