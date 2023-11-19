import React, {useContext, useEffect, useState} from 'react';
import {Button, SafeAreaView, StyleSheet, View,Alert, Modal, Text, Pressable,Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import { Dimensions } from "react-native";










const HomeScreen = ({navigation}) => {
    const[username,setUsername] = useState('');
    const [modalVisible, setModalVisible] = useState(false);



      const readData = async (key) => {
        try {
          const value = await AsyncStorage.getItem(key);
      
          if (value !== null) {
            if(key == 'username') {
              setUsername(value);
            }
            if(key == 'password') {
              setPassword(value);
            }
      
            
          }
        } catch (e) {
          alert('Failed to fetch the input from storage');
          alert(e);
        }
      };


      useEffect(() => {
        readData("username");
        
      }, []);



  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.imgContainer}>
        <Image  source={require('../images/MegaSaverFullLogo.png')} style={{ width: '100%', height: 90 }}/>
        </View>

        <View style={styles.header}>
            <Text style={styles.welcome}>Welcome {username}</Text>
            <Button  title="Logout" color="red" onPress={() => navigation.navigate('Login')}/>  
        </View>
            
        
      
        <View style={styles.footer}>
            <Button  title="Locations" color="orange" onPress={() => navigation.navigate('Locations')}/>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >
                <View style={styles.popup}>
                    <View style={styles.modalView}>
                        <Image source={require('../images/I6A9.png')}/>
                          <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                                    >
                            <Text style={styles.textStyle}>Hide QR Code</Text>
                          </Pressable>
                    </View>
                </View>
            </Modal>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => setModalVisible(true)}
                >
                <Text style={styles.textStyle}>5 Cents Off</Text>
            </Pressable>
        </View>
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'white'
  },

  imgContainer: {

    backgroundColor:'white',
    width: '100%',
    paddingTop: 20,
    
    
  },

  header: {
    width: '100%',
    
    flexDirection: "row",
    justifyContent: 'space-between',
    fontSize: 18,
    alignItems: 'center'
    
  },

  welcome: {
    fontSize: 18,
    backgroundColor: 'white',
  },

  footer: {
    justifyContent: 'space-between',
    position: 'absolute',
    //alignItems: "center",
    marginBottom: 15,
    marginLeft: 5,
    
    marginRight: 5,
    flexDirection: 'row',
    bottom: 0,
    backgroundColor: 'green',
    width: '95%'
    
  },

  

  modalView: {
   
    
    
    alignItems: "center",
    
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default HomeScreen;