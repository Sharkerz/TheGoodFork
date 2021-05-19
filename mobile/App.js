<<<<<<< HEAD
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import RegistrationScreen from './app/assets/screen/RegistrationScreen'
import WelcomeScreen from './app/assets/screen/WelcomeScreen'
=======
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './app/screen/WelcomeScreen';
>>>>>>> bea463de1aa1afd531f33aa3ead08fc3647fce24

export default function App() {
  return (
  <RegistrationScreen/>  
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
