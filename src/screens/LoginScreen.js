import React, {useEffect, useState} from 'react';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import axios from 'axios';


const LoginScreen = ({navigation}) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [wrongMessage, setWrongMessage] = useState('');


  const storeData = async (key,value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key,value)
      console.log(jsonValue)
      console.log('data stored successfully')
    } catch (e) {
      console.log('failed to store the async_storage data...')
      console.log(e)
    }
  }

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
    readData("password");
  }, []);

  const submitLogin = () => {
    const new_user = {};
    new_user["username"] = username;
    new_user["password"] = password;
        
    axios
          .post('http://10.0.2.2:8000/api-token-auth/', new_user)
          .then(res => {
                storeData("username",new_user["username"])
                storeData("password",new_user["password"])
                //console.log(getData())
              navigation.navigate("Home")
          })
          .catch(e => {
            setWrongMessage('Wrong Username or Password. Try again!')
              
          });
  }
 
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        

        <Text style = {styles.text}>
          {wrongMessage}
          </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter username"
          onChangeText={newText => setUsername(newText)}
          defaultValue = {username}
          
          
        />
        
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          onChangeText={newText => setPassword(newText)}
          defaultValue = {password}
          
          
                 />

        <Button
          title="Login"
           onPress={() => submitLogin()}
        />


        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <TouchableOpacity onPress={() => navigation.navigate('Account Recovery')}>
            <Text style={styles.link}>Forgot Username or Password</Text>
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
    color: 'red',
  },
});

export default LoginScreen;