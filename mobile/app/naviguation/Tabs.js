import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View,  Image } from 'react-native';
import { ContactStackNavigator, MainStackNavigator, ProfilStackNavigator, CartStackNavigator,OrderStackNavigator,OrderStaffStackNavigator} from './StackNavigator';

const Tab = createBottomTabNavigator();

const Tabs = ({ user,auth}) => {
    if(user){
        if(user.role === 'waiters'){
            return(
                <Tab.Navigator
                tabBarOptions={{
                    showLabel: false,
                    keyboardHidesTabBar: true,
                    style: {
                        position: 'absolute',
                        elevation: 0,
                        backgroundColor: '#111219',
                        borderTopWidth: 0,
                        height: 75,
                        ...styles.shadow
                    }
                }}>
                    <Tab.Screen name="Orders" component={OrderStackNavigator} options={{
                        tabBarIcon: ({focused}) => (
                            <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                                <Image 
                                source={require('../assets/List.png')}
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
                            </View>
                        )
                    }}  />
                    <Tab.Screen name="Profile" options={{
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
                            </View>
                        )
                    }}  >
                        { props => <ProfilStackNavigator auth={auth} {...props} />}
                        </Tab.Screen>
                </Tab.Navigator>
            )
        } if(user.role === 'cook'){
            return(
                <Tab.Navigator
                tabBarOptions={{
                    showLabel: false,
                    style: {
                        position: 'absolute',
                        elevation: 0,
                        backgroundColor: '#111219',
                        borderTopWidth: 0,
                        height: 75,
                        ...styles.shadow
                    }
                }}>
                    <Tab.Screen name="OrdersForStaff" component={OrderStaffStackNavigator} options={{
                        tabBarIcon: ({focused}) => (
                            <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                                <Image 
                                source={require('../assets/List.png')}
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
                    <Tab.Screen name="Profile" options={{
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
                            </View>
                        )
                    }}  >
                        { props => <ProfilStackNavigator auth={auth} {...props} />}
                        </Tab.Screen>
                </Tab.Navigator>
            )
        } if(user.role === 'barman'){
            return(
                <Tab.Navigator
                tabBarOptions={{
                    showLabel: false,
                    style: {
                        position: 'absolute',
                        elevation: 0,
                        backgroundColor: '#111219',
                        borderTopWidth: 0,
                        height: 75,
                        ...styles.shadow
                    }
                }}>
                    <Tab.Screen name="OrdersForStaff" component={OrderStaffStackNavigator} options={{
                        tabBarIcon: ({focused}) => (
                            <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                                <Image 
                                source={require('../assets/List.png')}
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
                   <Tab.Screen name="Profile" options={{
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
                            </View>
                        )
                    }}  >
                        { props => <ProfilStackNavigator auth={auth} {...props} />}
                        </Tab.Screen>
                </Tab.Navigator>
            )
        }else{
            return(
                <Tab.Navigator
                tabBarOptions={{
                    showLabel: false,
                    style: {
                        position: 'absolute',
                        elevation: 0,
                        backgroundColor: '#111219',
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
                            </View>
                        )
                    }}  />
                   <Tab.Screen name="Profile" options={{
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
                            </View>
                        )
                    }}  >
                        { props => <ProfilStackNavigator auth={auth} {...props} />}
                        </Tab.Screen>
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