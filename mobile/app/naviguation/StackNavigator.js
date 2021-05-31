import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { WelcomeScreen } from "../screen";
import HomeScreen from "../screen/HomeScreen";
import ProfileScreen from "../screen/ProfileScreen";
import RegistrationScreen from "../screen/RegistrationScreen";
import LoginScreen from "../screen/LoginScreen";
import DetailScreen from "../screen/DetailsScreen";
import ReservationScreen from "../screen/ReservationScreen";
import CartScreen from "../screen/CartScreen"
import EditProfileScreen from "../screen/EditProfileScreen";
const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="homeScreen" component={HomeScreen} />
      {/* <Stack.Screen name="ReservationScreen" component={ReservationScreen} /> */}
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
      <Stack.Screen name="Reservation" component={ReservationScreen} />
    </Stack.Navigator>
  );
};

const ContactStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Reservation" component={ReservationScreen} />
    </Stack.Navigator>
  );
};

const ProfilStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="editProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
};

const CartStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
};

export { MainStackNavigator, ContactStackNavigator,ProfilStackNavigator, CartStackNavigator };