import { StatusBar } from 'expo-status-bar'
import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NativeRouter as Router, Route, Switch } from 'react-router-native'
import LoginScreen from './app/screen/LoginScreen'
import RegistrationScreen from './app/screen/RegistrationScreen'
import WelcomeScreen from './app/screen/WelcomeScreen'
import ProfileScreen from "./app/screen/Profile";
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Tabs from './app/naviguation/Tabs'
import { theme } from './app/core/theme'
import { Provider } from 'react-native-paper'
import * as SecureStore from "expo-secure-store";

const Stack = createStackNavigator()

// get auth status
const getAuthStatus = async () => {
    const token = await SecureStore.getItemAsync('secure_token')
    if (token !== null) {
        console.log('a')
        return true
    }
    else {
        console.log('b')
        return false
    }
}

export default function App() {
    const [auth, getAuthStatus] = useState(true)
    console.log(auth)
    //SecureStore.deleteItemAsync('secure_token').then(r => console.log('deleted'))
    return (
        <Provider theme={theme}>
            <NavigationContainer>
            {!auth ? (
                <Stack.Navigator screenOptions={{headerShown: false}}>
                    <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
                    <Stack.Screen name="LoginScreen" component={LoginScreen} />
                    <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
                </Stack.Navigator>
            ) : (
                <Tabs/>
            )}
           </NavigationContainer>
        </Provider>
    );
}
