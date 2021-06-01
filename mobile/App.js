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
import Toast from 'react-native-toast-message';

// Status bar text color
StatusBar.setBarStyle('light-content');

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            auth: false,
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
            user = await SecureStore.getItemAsync('user')
            this.setState({user: JSON.parse(user)})
        }
        else {
            this.setState({auth: false})
        }
    }

    setAuthStatus = (status) => {
        this.setState({auth: status})
    }

    setUserRole = (userinfo) => {
        this.setState({user: userinfo})
    }

    render() { 
        if(this.state.user){
            console.log(this.state.user['role'])
        }
    return (
        <Provider theme={theme}>
            {!this.state.auth ? (
                <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                    <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
                    <Stack.Screen name="LoginScreen" initialParams={{auth: this.setAuthStatus,user: this.setUserRole}} component={LoginScreen} />
                    <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
                </Stack.Navigator>
                </NavigationContainer>
            ) : (
                <NavigationContainer>
                <Tabs/>
                </NavigationContainer>
            )}
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </Provider>
    );
    }
}

/* Ignore warnings */
LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
    'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.'
]);

export default App;
