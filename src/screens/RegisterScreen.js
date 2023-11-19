import React, {useState} from 'react';
import axios from 'axios';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
//import { register } from '../functions';
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import '../components/Global'



const storeData = async (key,value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key,value)
      console.log('data stored successfully')
    } catch (e) {
      console.log('failed to store the async_storage data...')
      console.log(e)
    }
  }



const RegisterScreen = ({navigation}) => {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [phone_number, setPhone_number] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');



    const register = (fname, lname, phone_number, email, username, password) => {
        const new_user = {};
        new_user["first_name"] = fname;
        new_user["last_name"] = lname;
        new_user["email"] = email;
        new_user["phone_number"] = phone_number;
        new_user["password"] = password;
        new_user["username"] = username;
        //new_user["token"] = '';
    
        axios
          .post('http://10.0.2.2:8000/api-token-auth/verify_creds', new_user)
          .then(res => {
                storeData("username",new_user["username"])
                storeData("password",new_user["password"])
                storeData("first_name",new_user["first_name"])
                storeData("last_name",new_user["last_name"])
                storeData("email",new_user["email"])
                storeData("phone_number",new_user["phone_number"])
                global.user = new_user
                
                storeData("response",res.data)
                console.log('right here')
                console.log(res.data)
                navigation.navigate("Confirm Phone Number")
          })
          .catch(e => {
              //console.log(`register error ${e}`);
              console.log(`register error ${e.response.data}`);
              setError(e.response.data)
              
          });
      };




  return (

    <View style={styles.container}>
      <View style={styles.wrapper}>

        <Text style={styles.error}>
          {error}
        </Text>

        <TextInput
          style={styles.input}
          placeholder="First Name"
          onChangeText={newText => setFname(newText)}
            
        />

        <TextInput
          style={styles.input}
          placeholder="Last Name"
          onChangeText={newText => setLname(newText)}
            
        />

        <TextInput
          style={styles.input}
          placeholder="Phone number (+12345678900)"
          onChangeText={newText => setPhone_number(newText)}
        
        />

        <TextInput
          style={styles.input}
          
          placeholder="Enter username"
          onChangeText={newText => setUsername(newText)}
        
        />

        <TextInput
          style={styles.input}
          
          placeholder="Enter password"
          secureTextEntry
          onChangeText={newText => setPassword(newText)}
        
        />

        <Text style = {styles.text}>
          (Optional)
          </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter email"
          onChangeText={newText => setEmail(newText)}
        
        />

        <Button
          title="Register"
          onPress={() =>{
            register(fname,lname,phone_number, email,username,password);
          }}
        />

        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text>Already have an accoutn? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
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
  },
  error: {
      fontWeight: 'bold',
      color: 'red',
      font: 'arial'
  },
});

export default RegisterScreen;