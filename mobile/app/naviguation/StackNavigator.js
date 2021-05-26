import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { WelcomeScreen } from "../screen";
import HomeScreen from "../screen/HomeScreen";
import ProfileScreen from "../screen/ProfileScreen";
import RegistrationScreen from "../screen/RegistrationScreen";
import LoginScreen from "../screen/LoginScreen";
import BookingScreen from "../screen/BookingScreen";
const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="homeScreen" component={HomeScreen} />
      <Stack.Screen name="BookingScreen" component={BookingScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};
const ContactStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};
export { MainStackNavigator, ContactStackNavigator };