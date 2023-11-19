import React, {useState} from 'react';
import {
    Button,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StyleSheet,
  } from 'react-native';
  import axios from 'axios';



const AccountRecovery = ({navigation}) => {
        const [phone_number, setPhone_number] = useState('');
        
      return (
    
        <View style={styles.container}>
          <View style={styles.wrapper}>

            <TextInput
              style={styles.input}
              placeholder="Phone number (+12345678900)"
              onChangeText={newText => setPhone_number(newText)}
            />


            <Button
              title="Receive a Text Message"
              onPress={() =>{
                
                axios
                    .post('http://10.0.2.2:8000/api/send_me_message/', {'phone_number': phone_number})
                    .then(res => {
                    
                    //console.log(getData())
                    navigation.navigate("Login")
          })
                    .catch(e => {
                      setWrongMessage('Wrong Username or Password. Try again!')
              
          });
              }}
            />
 
          </View>
        </View>
      );
    };


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    wrapper: {
      width: '80%',
    },
    input: {
      marginBottom: 12,
      borderWidth: 1,
      borderColor: '#bbb',
      borderRadius: 5,
      paddingHorizontal: 14,
    },
    link: {
      color: 'blue',
    },
    text: {
      marginLeft: 6,
      opacity: 0.6,
      marginBottom: 6
    }
  });



export default AccountRecovery;