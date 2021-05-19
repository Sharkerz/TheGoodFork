import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import axios from 'axios'

const RegistrationScreen = () => {

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    const [isSubmit, setIsSubmit] = useState(false)

    useEffect(() => {
        const authentificate = async () => {
            axios.post('http://localhost:8080/app/auth/register', JSON.stringify({
                email: email,
                name: name,
                password: password,
                password_confirmation: password,
            }))
        }
    })

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
        <View style={styles.container}>
            <TextInput 
            placeholder="Email" 
            style={styles.input} 
            autoCapitalize="none" 
            onChangeText={emailHandler}
            />
            <TextInput 
            placeholder="Name" 
            style={styles.input}
            onChangeText={nameHandler}
            />
            <TextInput 
            placeholder="Password" 
            style={styles.input} 
            secureTextEntry={true} 
            autoCapitalize="none"
            onChangeText={passwordHandler}
            />
            <View style={styles.buttonContainer}>
                <Button title="Register" onPress={() => setIsSubmit(true)}/>
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

export default RegistrationScreen