import React from 'react';
import { ImageBackground, StyleSheet, View, Text } from 'react-native';

function WelcomeScreen(props) {
    return (
        <ImageBackground 
            style={styles.background}
            source={require("../../assets/background2.png")}>
                <View>
                     <Text style={styles.homeText}>TheGoodFork</Text> 
                </View>

                <View style={styles.loginButton}>
                    <Text style={styles.textContainer}>
                        Login
                    </Text>
                </View> 
                <View style={styles.registerButton}>
                <Text style={styles.textContainer}>
                        Register
                </Text>
                </View> 
        </ImageBackground>


    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "flex-end"
    },
    loginButton: {
        width: '100%',
        height : 70,
        backgroundColor: '#fc5c65'
    },
    registerButton: {
        width: '100%',
        height : 70,
        backgroundColor: '#4ecdc4'
    },
    textContainer: {
        position: "relative",
        fontSize: 28,
        top: 20,
        textAlign: "center",
        color: "#fff"
    },
    homeText: {
        top: -520,
        fontSize: 45,
        fontWeight: "600",
        position: "relative",
        textAlign: "center",
        color: "#EE09C5"
    }
})

export default WelcomeScreen;