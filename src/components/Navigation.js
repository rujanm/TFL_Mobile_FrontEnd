import React, {useContext} from 'react';
import {Text, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LocationsScreen from '../screens/LocationsScreen';
import AccountRecovery from '../screens/AccountRecovery';
import PhoneConfScreen from '../screens/PhoneConfirmScreen';
import RequestDriverScreen from '../screens/RequestDriverScreen';


const Stack = createNativeStackNavigator();

const Navigation = () => {

  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen}options={{headerShown: false}}/>
            <Stack.Screen name="Login"component={LoginScreen}options={{headerShown: false}}/>
            <Stack.Screen name="Confirm Phone Number"component={PhoneConfScreen}options={{headerShown: false}}/>
            <Stack.Screen name="RequestDriver" component={RequestDriverScreen}options={{headerShown: false}} />
            <Stack.Screen name="Locations" component={LocationsScreen}options={{headerShown: false}} />
            <Stack.Screen name="Register"component={RegisterScreen}options={{headerShown: false}}/>
            <Stack.Screen name="Account Recovery"component={AccountRecovery}options={{headerShown: false}}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;