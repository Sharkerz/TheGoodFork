import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native'
import { TextInput } from 'react-native-paper'
import Background from '../components/Background'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import BackButton from '../components/BackButton'
import axios from 'axios'
import { SERVER_IP } from '@env';

const RegistrationScreen = ( {navigation} ) => {

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    const [isSubmit, setIsSubmit] = useState(false)

    useEffect(() => {
        const authentificate = async () => {
            axios.post(SERVER_IP + '/api/auth/register', {
                email: email,
                name: name,
                password: password,
                password_confirmation: password,
            }
            )
            .then((response) => {
                console.log(response)
                setIsSubmit(false)
            })
            .catch((err) => {
                console.log(err)
                setIsSubmit(false)
            })
        }
        if (isSubmit) authentificate()
    }, [isSubmit])

    const emailHandler = (text) => {
        setEmail(text)
    }
    const nameHandler = (text) => {
        setName(text)
    }
    const passwordHandler = (text) => {
        setPassword(text)
    }

    return (
        // <View style={styles.container}>
        //     <TextInput 
        //     placeholder="Email" 
        //     style={styles.input} 
        //     autoCapitalize="none" 
        //     onChangeText={emailHandler}
        //     />
        //     <TextInput 
        //     placeholder="Name" 
        //     style={styles.input}
        //     onChangeText={nameHandler}
        //     />
        //     <TextInput 
        //     placeholder="Password" 
        //     style={styles.input} 
        //     secureTextEntry={true} 
        //     autoCapitalize="none"
        //     onChangeText={passwordHandler}
        //     />
        //     <View style={styles.buttonContainer}>
        //         <Button title="Register" onPress={() => setIsSubmit(true)}/>
        //     </View>
        // </View>
        // <ImageBackground style={styles.container} source={require("../assets/background2.png")} >
        <Background>
        <BackButton goBack={navigation.goBack} />



        {/* <Background> */}
        <Paragraph style={styles.textHome}>
            Inscrivez-vous
        </Paragraph>
        {/* </Background> */}


        <TextInput underlineColor="transparent" underlineColorAndroid="transparent" selectionColor='#5A5B61' style={styles.textLogin} label="Name"
            mode="flat" onChangeText={nameHandler}>
        </TextInput>
        <TextInput underlineColor='transparent' underlineColorAndroid="transparent" selectionColor='#5A5B61' style={styles.textEmail} label="Email"
            mode="flat" onChangeText={emailHandler}>
        </TextInput>
        <TextInput underlineColor='transparent' underlineColorAndroid="transparent" selectionColor='#5A5B61' style={styles.textPassword} label="Password"
            mode="flat" secureTextEntry={true} onChangeText={passwordHandler}>
        </TextInput>

        <Button color='#111219' style={styles.textRegister}
              mode="outlined" onPress={() => setIsSubmit(true)}>
        S'enregistrer
        </Button>

    {/* </ImageBackground> */}
        </Background>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        paddingVertical: 5,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        width: "55%",
    },
    buttonContainer: {
        marginTop: 20,
    },
    textHome: {
        fontSize: 40,
        textAlign: 'center',
        top: 20,
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
    textLogin: {
        marginTop: 100,
        width: 300,
        backgroundColor: "#1B1C23",
        borderRadius: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderWidth: 2,
        borderColor: '#5A5B61',
        color: "#292A32"
    },
    textEmail: {
        width: 300,
        marginTop: 15,
        backgroundColor: "#1B1C23",
        borderRadius: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderWidth: 2,
        borderColor: '#5A5B61',
        color: "#292A32"
    },
    textPassword: {
        width: 300,
        marginTop: 15,
        backgroundColor: "#1B1C23",
        borderRadius: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderWidth: 2,
        borderColor: '#5A5B61',
        color: "#292A32"
    },
    textRegister: {
        backgroundColor: '#fff',
        marginTop: 100,
        width: 300
    }
})

export default RegistrationScreen