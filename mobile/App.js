import React, {useRef, useState} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './app/core/theme'
import { Provider } from 'react-native-paper'
import * as SecureStore from "expo-secure-store";
const Stack = createStackNavigator()
import {LogBox, Platform} from 'react-native';
import Tabs from './app/naviguation/Tabs'
import LoginScreen from './app/screen/LoginScreen'
import RegistrationScreen from './app/screen/RegistrationScreen'
import WelcomeScreen from './app/screen/WelcomeScreen'
import {StatusBar} from "react-native";
import Toast from 'react-native-toast-message';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

// Status bar text color
StatusBar.setBarStyle('light-content');

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            auth: false,
            expoPushToken: "",
            notification: false,
        };

        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: false,
                shouldSetBadge: false,
            }),
        });
    }

    componentDidMount() {
        this.getAuthStatus()
        this.registerForPushNotificationsAsync().then((token) => this.setState({expoPushToken: token})).then(()=> console.log(this.state.expoPushToken));
        Notifications.addNotificationReceivedListener(notification => {this.setState({notification: notification});});
        Notifications.addNotificationResponseReceivedListener(response => {this.setState({responseListener: response})});
    }

    // Notifications set token
    async registerForPushNotificationsAsync() {
        let token;
            const {status: existingStatus} = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const {status} = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }
        return token;
    }

    // get auth status
    getAuthStatus = async () => {
        const token = await SecureStore.getItemAsync('secure_token')
        if (token !== null) {
            let user = await SecureStore.getItemAsync('user')
            this.setState({user: JSON.parse(user)})
            this.setState({auth: true})   
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
    return (
        <Provider theme={theme}>
            {this.state.auth ? (
                <NavigationContainer>
                <Tabs user={this.state.user}/>
                </NavigationContainer>
            ) : (
                <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                    <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
                    <Stack.Screen name="LoginScreen" initialParams={{auth: this.setAuthStatus,user: this.setUserRole}} component={LoginScreen} />
                    <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
                </Stack.Navigator>
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
