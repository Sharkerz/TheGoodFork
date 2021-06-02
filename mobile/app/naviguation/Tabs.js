import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ImageBackground, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { ContactStackNavigator, MainStackNavigator, ProfilStackNavigator, CartStackNavigator,OrderStackNavigator} from './StackNavigator';

const Tab = createBottomTabNavigator();

const Tabs = ({ user }) => {
    if(user){
        if(user.role === 'waiters'){
            return(
                <Tab.Navigator
                tabBarOptions={{
                    showLabel: false,
                    style: {
                        position: 'absolute',
                        // bottom: 25,
                        // left: 20,
                        // right: 20,
                        elevation: 0,
                        backgroundColor: '#111219',
                        // borderRadius: 15,
                        borderTopWidth: 0,
                        height: 75,
                        ...styles.shadow
                    }
                }}>
                    <Tab.Screen name="Orders" component={OrderStackNavigator} options={{
                        tabBarIcon: ({focused}) => (
                            <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                                <Image 
                                source={require('../assets/houseIcon.png')}
                                resizeMode='contain'
                                style={{
                                    width: 60,
                                    height: 60,
                                    marginTop: -15,
                                    tintColor: focused ? '#fff' : '#5A5B61'
                                }}>   
                                </Image>
                            </View>
                        )
                    }} />
                    <Tab.Screen name="Home" component={MainStackNavigator} options={{
                        tabBarIcon: ({focused}) => (
                            <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                                <Image 
                                source={require('../assets/houseIcon.png')}
                                resizeMode='contain'
                                style={{
                                    width: 60,
                                    height: 60,
                                    marginTop: -15,
                                    tintColor: focused ? '#fff' : '#5A5B61'
                                }}>   
                                </Image>
                            </View>
                        )
                    }} />
                   
                    <Tab.Screen name="Cart" component={CartStackNavigator} options={{
                        tabBarIcon: ({focused}) => (
                            <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                                <Image 
                                source={require('../assets/shopIcon.png')}
                                resizeMode='contain'
                                style={{
                                    width: 60,
                                    height: 60,
                                    marginTop: -15,
                                    tintColor: focused ? '#fff' : '#5A5B61'
                                }}>   
                                </Image>
                                {/* <Text style={{color: focused ? '#fff' : '#5A5B61', fontSize: 12}} >PROFILE</Text> */}
                            </View>
                        )
                    }}  />
                    <Tab.Screen name="Profile" component={ProfilStackNavigator} options={{
                        tabBarIcon: ({focused}) => (
                            <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                                <Image 
                                source={require('../assets/profileIcon.png')}
                                resizeMode='contain'
                                style={{
                                    width: 60,
                                    height: 60,
                                    marginTop: -15,
                                    tintColor: focused ? '#fff' : '#5A5B61'
                                }}>   
                                </Image>
                                {/* <Text style={{color: focused ? '#fff' : '#5A5B61', fontSize: 12}} >PROFILE</Text> */}
                            </View>
                        )
                    }}  />
                </Tab.Navigator>
            )
        } if(user.role === 'cook'){
            return(
                <Tab.Navigator
                tabBarOptions={{
                    showLabel: false,
                    style: {
                        position: 'absolute',
                        // bottom: 25,
                        // left: 20,
                        // right: 20,
                        elevation: 0,
                        backgroundColor: '#111219',
                        // borderRadius: 15,
                        borderTopWidth: 0,
                        height: 75,
                        ...styles.shadow
                    }
                }}>
                    <Tab.Screen name="Home" component={MainStackNavigator} options={{
                        tabBarIcon: ({focused}) => (
                            <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                                <Image 
                                source={require('../assets/houseIcon.png')}
                                resizeMode='contain'
                                style={{
                                    width: 60,
                                    height: 60,
                                    marginTop: -15,
                                    tintColor: focused ? '#fff' : '#5A5B61'
                                }}>   
                                </Image>
                            </View>
                        )
                    }} />
                    <Tab.Screen name="Profile" component={ProfilStackNavigator} options={{
                        tabBarIcon: ({focused}) => (
                            <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                                <Image 
                                source={require('../assets/profileIcon.png')}
                                resizeMode='contain'
                                style={{
                                    width: 60,
                                    height: 60,
                                    marginTop: -15,
                                    tintColor: focused ? '#fff' : '#5A5B61'
                                }}>   
                                </Image>
                                {/* <Text style={{color: focused ? '#fff' : '#5A5B61', fontSize: 12}} >PROFILE</Text> */}
                            </View>
                        )
                    }}  />
                </Tab.Navigator>
            )
        } if(user.role === 'barman'){
            return(
                <Tab.Navigator
                tabBarOptions={{
                    showLabel: false,
                    style: {
                        position: 'absolute',
                        // bottom: 25,
                        // left: 20,
                        // right: 20,
                        elevation: 0,
                        backgroundColor: '#111219',
                        // borderRadius: 15,
                        borderTopWidth: 0,
                        height: 75,
                        ...styles.shadow
                    }
                }}>
                    <Tab.Screen name="Home" component={MainStackNavigator} options={{
                        tabBarIcon: ({focused}) => (
                            <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                                <Image 
                                source={require('../assets/houseIcon.png')}
                                resizeMode='contain'
                                style={{
                                    width: 60,
                                    height: 60,
                                    marginTop: -15,
                                    tintColor: focused ? '#fff' : '#5A5B61'
                                }}>   
                                </Image>
                            </View>
                        )
                    }} />
                    <Tab.Screen name="Profile" component={ProfilStackNavigator} options={{
                        tabBarIcon: ({focused}) => (
                            <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                                <Image 
                                source={require('../assets/profileIcon.png')}
                                resizeMode='contain'
                                style={{
                                    width: 60,
                                    height: 60,
                                    marginTop: -15,
                                    tintColor: focused ? '#fff' : '#5A5B61'
                                }}>   
                                </Image>
                                {/* <Text style={{color: focused ? '#fff' : '#5A5B61', fontSize: 12}} >PROFILE</Text> */}
                            </View>
                        )
                    }}  />
                </Tab.Navigator>
            )
        }else{
            return(
                <Tab.Navigator
                tabBarOptions={{
                    showLabel: false,
                    style: {
                        position: 'absolute',
                        // bottom: 25,
                        // left: 20,
                        // right: 20,
                        elevation: 0,
                        backgroundColor: '#111219',
                        // borderRadius: 15,
                        borderTopWidth: 0,
                        height: 75,
                        ...styles.shadow
                    }
                }}>
                    <Tab.Screen name="Home" component={MainStackNavigator} options={{
                        tabBarIcon: ({focused}) => (
                            <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                                <Image 
                                source={require('../assets/houseIcon.png')}
                                resizeMode='contain'
                                style={{
                                    width: 60,
                                    height: 60,
                                    marginTop: -15,
                                    tintColor: focused ? '#fff' : '#5A5B61'
                                }}>   
                                </Image>
                            </View>
                        )
                    }} />
                    <Tab.Screen name="Booking" component={ContactStackNavigator} options={{
                        tabBarIcon: ({focused}) => (
                            <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                                <Image 
                                source={require('../assets/bookingIcon.png')}
                                resizeMode='contain'
                                style={{
                                    width: 60,
                                    height: 60,
                                    marginTop: -15,
                                    tintColor: focused ? '#fff' : '#5A5B61'
                                }}>   
                                </Image>
                            </View>
                        )
                    }} />
                    <Tab.Screen name="Cart" component={CartStackNavigator} options={{
                        tabBarIcon: ({focused}) => (
                            <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                                <Image 
                                source={require('../assets/shopIcon.png')}
                                resizeMode='contain'
                                style={{
                                    width: 60,
                                    height: 60,
                                    marginTop: -15,
                                    tintColor: focused ? '#fff' : '#5A5B61'
                                }}>   
                                </Image>
                                {/* <Text style={{color: focused ? '#fff' : '#5A5B61', fontSize: 12}} >PROFILE</Text> */}
                            </View>
                        )
                    }}  />
                    <Tab.Screen name="Profile" component={ProfilStackNavigator} options={{
                        tabBarIcon: ({focused}) => (
                            <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                                <Image 
                                source={require('../assets/profileIcon.png')}
                                resizeMode='contain'
                                style={{
                                    width: 60,
                                    height: 60,
                                    marginTop: -15,
                                    tintColor: focused ? '#fff' : '#5A5B61'
                                }}>   
                                </Image>
                                {/* <Text style={{color: focused ? '#fff' : '#5A5B61', fontSize: 12}} >PROFILE</Text> */}
                            </View>
                        )
                    }}  />
                </Tab.Navigator>
            )
        }
       
    }
    
    
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#fff',
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5

    }
});

export default Tabs;