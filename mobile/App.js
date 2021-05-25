import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NativeRouter as Router, Route, Switch } from 'react-router-native'
import LoginScreen from './app/screen/LoginScreen'
import RegistrationScreen from './app/screen/RegistrationScreen'
import WelcomeScreen from './app/screen/WelcomeScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Tabs from './app/naviguation/Tabs'
import { theme } from './app/core/theme'
import { Provider } from 'react-native-paper'
import HomeScreen from './app/screen/HomeScreen'
import ProfileScreen from './app/screen/ProfileScreen'


export default function App() {
  return (

    <Provider theme={theme}>
      <NavigationContainer>
        <Tabs></Tabs>
        {/* <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="WelcomeScreen">
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </Stack.Navigator> */}
      </NavigationContainer>
    </Provider> 

  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#872BA2',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
