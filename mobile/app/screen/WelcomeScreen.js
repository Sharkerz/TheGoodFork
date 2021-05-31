import React from 'react';
import { ImageBackground, StyleSheet, View, Text, Image } from 'react-native';
import Background from '../components/Background'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import BackButton from '../components/BackButton'

export default function WelcomeScreen( {navigation}) {
    return (

        <View style={styles.container}>

            <Image style={styles.logo} source={require("../assets/iconfood.png")} />

          {/* <Background> */}
            <Paragraph style={styles.textHome}>
              TheGoodFork
            </Paragraph>
          {/* </Background> */}

            <Button color='#111219' style={styles.textLogin}
              mode="outlined" onPress={() => navigation.navigate('LoginScreen')}>
              Login
            </Button>
            <Button color='#111219' style={styles.textRegister}
              mode="outlined" onPress={() => navigation.navigate('RegistrationScreen')}>
              Sign Up
            </Button>
            <Button color='#111219' style={styles.textRegister}
              mode="outlined" onPress={() => navigation.navigate('HomeScreen')}>
              Home
            </Button>

        </View>


    );
}

const styles = StyleSheet.create({
  textHome: {
    fontSize: 40,
    textAlign: 'center',
    top: 360,
    marginBottom: 0,
    color: "#fff",
    fontWeight: "600"
  },
  logo: {
    width: 300,
    height: 226,
    position: 'absolute',
    top: 90,
  },
  logoContainer: {
    width: 200,
    position: 'absolute',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#111219",
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    backgroundColor: '#fff',
    flex: 1.5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 50,
  },
  textRegister: {
    color: '#111219',
    width: 300
  },
  textLogin: {
    backgroundColor: '#fff',
    marginTop: 400,
    width: 300
  }
})

// const styles = StyleSheet.create({
//     background: {
//         flex: 1,
//         justifyContent: "flex-end"
//     },
//     loginButton: {
//         width: '100%',
//         height : 70,
//         backgroundColor: '#fc5c65'
//     },
//     registerButton: {
//         width: '100%',
//         height : 70,
//         backgroundColor: '#4ecdc4'
//     },
//     textContainer: {
//         position: "relative",
//         fontSize: 28,
//         top: 20,
//         textAlign: "center",
//         color: "#fff"
//     },
//     homeText: {
//         top: -520,
//         fontSize: 45,
//         fontWeight: "600",
//         position: "relative",
//         textAlign: "center",
//         color: "#EE09C5"
//     }
// })
