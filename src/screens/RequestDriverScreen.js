import React, { useEffect, useState } from 'react';
import { Text, Button, View, SafeAreaView, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Animated } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import axios from 'axios';
import { Image } from 'react-native';
import { Callout } from 'react-native-maps';


const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.5;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_POSITION = {
    latitude: 41.2565,
    longitude: -95.9345,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
};


export default function RequestDriver({ navigation }) {
    const [allDrivers, setAllDrivers] = useState([]);
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [popupAnimation] = useState(new Animated.Value(height));
    



    

    const fetchDrivers = async () => {
        try {
            const response = await axios.get('http://10.0.2.2:8000/api/v1/get_drivers/');
            setAllDrivers(response.data);
        } catch (error) {
            console.error('Error fetching drivers:', error);
        }
    };

    const fetchDriverDetails = async (driverId) => {
      try {
        const response = await axios.get(`http://10.0.2.2:8000/api/v1/get_driver_details/${driverId}`);
        setSelectedDriver(response.data); // Pass the response.data to showPopup
      } catch (error) {
        console.error('Error fetching driver details:', error);
      }
    };


    

    const readData = async (key) => {
        try {
          const value = await AsyncStorage.getItem(key);
      
          if (value !== null) {
                fetchDriverDetails(value);
              }
        } catch (e) {
          alert('Failed to fetch the input from storage');
          alert(e);
        }
      };


    useEffect(() => {
        readData("driver_id"); 
      }, []);

    return (
      <SafeAreaView style={styles.container}>
          <View style={styles.container1}>
          <Text >{selectedDriver.first_name} {selectedDriver.lastName} Is On The Way...</Text>
              
                
    </View>
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container1: {
        flex: 1,
        width: Dimensions.get('window').width,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    popupContainer: {
      ...StyleSheet.absoluteFillObject,
      flex: 1,
      justifyContent: 'center',
      width: '100%', // Adjusted width to 100% of the screen width
      height: '30%', // Adjusted height to 60% of the screen height
    },
    popup: {
      position: 'absolute',
      bottom: 0,
      width: '90%', // Adjusted width to 90% of the screen width
      padding: 16,
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: -3,
      },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 5,
    },
    popupContent: {
      marginBottom: 16,
      color: 'black',
      fontWeight: 'bold',
      fontSize: 18,
    },
    driverName: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
      color: 'black',
    },
    phoneNumber: {
      fontSize: 16,
      marginBottom: 8,
      color: 'black',
      fontWeight: 'bold',
    },
    requestButton: {
      backgroundColor: '#3498db',
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 16,
      alignSelf: 'flex-end',
    },
    requestButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });
