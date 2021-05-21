import React from 'react';
import { ImageBackground, StyleSheet, View, Text, Image } from 'react-native';
import Background from '../components/Background'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import BackButton from '../components/BackButton'

export default function WelcomeScreen( {navigation}) {
    return (
        // <ImageBackground 
        //     style={styles.background}
        //     source={require("../assets/background2.png")}>
        //         <View>
        //              <Text style={styles.homeText}>TheGoodFork</Text> 
        //         </View>

        //         <View style={styles.loginButton}>
        //             <Text style={styles.textContainer}>
        //                 Login
        //             </Text>
        //         </View> 
        //         <View style={styles.registerButton}>
        //         <Text style={styles.textContainer}>
        //                 Register
        //         </Text>
        //         </View> 
        // </ImageBackground>

        // <ImageBackground style={styles.container} source={require("../assets/background2.png")} >
        //   <View style={styles.header}>
        //     {/* <Background> */}
        //       <Paragraph style={styles.textHome}>
        //         TheGoodFork
        //         welcome back ! 
        //       </Paragraph>
        //     {/* </Background> */}
        //   </View>
        //     <View style={styles.footer}>   
        //       <Button style={styles.textLogin}
        //         mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
        //         Login
        //       </Button>
        //       <Button color='#111219'
        //         mode="outlined" onPress={() => navigation.navigate('RegistrationScreen')}>
        //         Sign Up
        //       </Button>
        //     </View>
        // </ImageBackground>

        <ImageBackground style={styles.container} source={require("../assets/background2.png")} >

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

        </ImageBackground>


    );
}

// const styles = StyleSheet.create({
//     textHome: {
//       fontSize: 40,
//       textAlign: 'center',
//       top: 60,
//       marginBottom: 0,
//       color: "#fff"
//     },
//     container: {
//       flex: 1,
//       width: '100%'
//     },
//     header: {
//       flex: 2,
//       justifyContent: 'center',
//       alignItems: 'center'
//     },
//     footer: {
//       backgroundColor: '#fff',
//       flex: 1.5,
//       borderTopLeftRadius: 30,
//       borderTopRightRadius: 30,
//       paddingVertical: 50,
//       paddingHorizontal: 50,
//     },
//     textRegister: {
//       color: '#111219'
//     },
//     textLogin: {
//       color: '#fff'
//     }
//   })

const styles = StyleSheet.create({
  textHome: {
    fontSize: 40,
    textAlign: 'center',
    top: 420,
    marginBottom: 0,
    color: "#fff",
    fontWeight: "600"
  },
  logo: {
    width: 300,
    height: 226,
    position: 'absolute',
    top: 150,
  },
  logoContainer: {
    width: 200,
    position: 'absolute',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center'
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
    marginTop: 480,
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
