import React, {useState} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './app/core/theme'
import { Provider } from 'react-native-paper'
import * as SecureStore from "expo-secure-store";
const Stack = createStackNavigator()
import { LogBox } from 'react-native';

import Tabs from './app/naviguation/Tabs'
import LoginScreen from './app/screen/LoginScreen'
import RegistrationScreen from './app/screen/RegistrationScreen'
import WelcomeScreen from './app/screen/WelcomeScreen'
import {StatusBar} from "react-native";

// Status bar text color
StatusBar.setBarStyle('light-content');

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            auth: false
        };
    }

    componentDidMount() {
        this.getAuthStatus()
    }

    // get auth status
    getAuthStatus = async () => {
        const token = await SecureStore.getItemAsync('secure_token')
        if (token !== null) {
            this.setState({auth: true})
        }
        else {
            this.setState({auth: false})
        }
    }

    setAuthStatus = (status) => {
        this.setState({auth: status})
    }

    render() {
    return (
        <Provider theme={theme}>
            {!this.state.auth ? (
                <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                    <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
                    <Stack.Screen name="LoginScreen" initialParams={{auth: this.setAuthStatus}} component={LoginScreen} />
                    <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
                </Stack.Navigator>
                </NavigationContainer>
            ) : (
                <NavigationContainer>
                <Tabs/>
                </NavigationContainer>
            )}
           
        </Provider>
    );
    }
}

/* Ignore warnings */
LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

export default App;
