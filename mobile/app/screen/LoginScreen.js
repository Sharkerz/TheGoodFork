import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TextInput, Button } from 'react-native'
import axios from 'axios'

const LoginScreen = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [isSubmit, setIsSubmit] = useState(false)

    useEffect(() => {
        const authentificate = async () => {

            axios.post('http://192.168.1.28:80/api/auth/login', {
                email: email,
                password: password,
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
    const passwordHandler = (text) => {
        setPassword(text)
    }

    return (
        <View style={styles.container}>
            <TextInput 
            placeholder="Email" 
            style={styles.input} 
            autoCapitalize="none" 
            onChangeText={emailHandler}
            />
            <TextInput 
            placeholder="Password" 
            style={styles.input} 
            secureTextEntry={true} 
            autoCapitalize="none"
            onChangeText={passwordHandler}
            />
            <View style={styles.buttonContainer}>
                <Button title="Login" onPress={() => setIsSubmit(true)}/>
            </View>
        </View>
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
})

export default LoginScreen