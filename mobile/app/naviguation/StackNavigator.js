import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screen/HomeScreen";
import ProfileScreen from "../screen/ProfileScreen";
import WelcomeScreen from "../screen/WelcomeScreen";
import DetailScreen from "../screen/DetailsScreen";
import BookingScreen from "../screen/BookingScreen";
import CartScreen from "../screen/CartScreen"
import EditProfileScreen from "../screen/EditProfileScreen";
import OrderScreen from "../screen/OrderScreen";
import OrdersDetailsScreen from "../screen/OrderDetailsScreen";
import ValidationScreen from "../screen/ValidationScreen";
import OrderScreenStaff from "../screen/OrderScreenStaff";
import OrdersDetailsScreenStaff from "../screen/OrderDetailsScreenStaff";
const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="homeScreen" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
      <Stack.Screen name="Booking" component={BookingScreen} />
    </Stack.Navigator>
  );
};

const ContactStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Booking" component={BookingScreen} />
    </Stack.Navigator>
  );
};

const ProfilStackNavigator = ({auth}) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Profile" component={ProfileScreen} initialParams={{auth : auth}} />
      <Stack.Screen name="editProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
};

const CartStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Validation" component={ValidationScreen} />
    </Stack.Navigator>
  );
};

const OrderStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Orders" component={OrderScreen} />
      <Stack.Screen name="OrdersDetails" component={OrdersDetailsScreen} />
    </Stack.Navigator>
  );
};

const OrderStaffStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="OrdersForStaff" component={OrderScreenStaff} />
      <Stack.Screen name="OrdersDetailsForStaff" component={OrdersDetailsScreenStaff} />
    </Stack.Navigator>
  );
};

export { MainStackNavigator, ContactStackNavigator,ProfilStackNavigator, CartStackNavigator,OrderStackNavigator,OrderStaffStackNavigator };