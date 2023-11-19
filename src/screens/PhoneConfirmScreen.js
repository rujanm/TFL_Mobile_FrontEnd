import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
  } from 'react-native-confirmation-code-field';
  import '../components/Global'



const styles = StyleSheet.create({
    root: {flex: 1, padding: 20},
    title: {textAlign: 'center', fontSize: 30},
    codeFieldRoot: {marginTop: 20},
    cell: {
      width: 40,
      height: 40,
      lineHeight: 38,
      fontSize: 24,
      borderWidth: 2,
      borderColor: '#00000030',
      textAlign: 'center',
    },
    focusCell: {
      borderColor: '#000',
    },
  });








 const register_save = () => {

  axios
      .post('http://10.0.2.2:8000/api-token-auth/create_user', global.user)
      .then(res => {
            storeData("username",user["username"])
            storeData("password",user["password"])
            
            //console.log(getData())
          navigation.navigate("Home")
      })
      .catch(e => {
          //console.log(`register error ${e}`);
          console.log(`register error ${e.response.data}`);
          setError(e.response.data)
          
      });
 }

const CELL_COUNT = 6;


const PhoneConfScreen = ({navigation}) => {
    const [response, setResponse] = useState('');
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
      value,
      setValue,
    });
    console.log(response);
    console.log(value);
    if(response.length > 4){
      if(response == value){
        register_save();
      };
  
    }
   
    
    const readData = async (key) => {
        try {
          const value = await AsyncStorage.getItem(key);
      
          if (value !== null) {
           setResponse(value)
          }
        } catch (e) {
          alert('Failed to fetch the input from storage');
          alert(e);
        }
      };

    useEffect(() => {
        readData("response");
      }, []);
    return (
      <SafeAreaView style={styles.root}>
        <Text style={styles.title}>Verification</Text>
        <CodeField
          ref={ref}
          {...props}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
      </SafeAreaView>
    );
  };

export default PhoneConfScreen;