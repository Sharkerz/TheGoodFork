import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NativeRouter as Router, Route, Switch } from 'react-router-native'
import LoginScreen from './app/screen/LoginScreen'
import RegistrationScreen from './app/screen/RegistrationScreen'
import WelcomeScreen from './app/screen/WelcomeScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './app/core/theme'
import { Provider } from 'react-native-paper'

const Stack = createStackNavigator()

//a rajouter sur bouton login/register pas oublier les imports
/* <Link to={'/login'}>
<Text>Login</Text>
</Link> */


export default function App() {
  return (
    // <WelcomeScreen>
    //   <Router>
    //     <View>
    //         <Switch>
    //             <Route path="/" exact component={WelcomeScreen}/>
    //             <Route path="/register" exact component={RegistrationScreen}/>
    //             <Route path="/login" exact component={LoginScreen}/>
    //         </Switch>
    //     </View>
    //   </Router> 
    // </WelcomeScreen> 
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="WelcomeScreen">
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
        </Stack.Navigator>
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
