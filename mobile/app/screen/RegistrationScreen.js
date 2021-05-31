import React, { useState, useEffect, Component } from 'react'
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native'
import { TextInput } from 'react-native-paper'
import Background from '../components/Background'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import BackButton from '../components/BackButton'
import AuthService from '../service/AuthService';

class RegistrationScreen  extends Component{
    constructor() {
        super();
        this.state = {
            name:"",
            email: "",
            password: "",
        }
    }

    handleSubmit = async() =>{
         await AuthService.Register(this.state.email,this.state.name,this.state.password).then(res =>{
             if(res.status === 201){
                this.props.navigation.navigate('LoginScreen')
             }else{
                 this.setState({errorMessage : res.data})
             }
            
        })  
    }
    nameHandler = (text) => {
        this.setState({name: text})
    }
    emailHandler = (text) => {
        this.setState({email: text})
    }
    passwordHandler = (text) => {
        this.setState({password: text})
    }
    render(){
    return (
        <Background>
        <BackButton goBack={this.props.navigation.goBack} />
        {/* <Background> */}
        <Paragraph style={styles.textHome}>
            Inscrivez-vous
        </Paragraph>

        <TextInput underlineColor="transparent" underlineColorAndroid="transparent" name="name" selectionColor='#5A5B61' style={styles.textLogin} label="Name"
            mode="flat" onChangeText={this.nameHandler}>
        </TextInput>
        <TextInput underlineColor='transparent' underlineColorAndroid="transparent" selectionColor='#5A5B61' style={styles.textEmail} label="Email"
            mode="flat" onChangeText={this.emailHandler}>
        </TextInput>
        <TextInput underlineColor='transparent' underlineColorAndroid="transparent" selectionColor='#5A5B61' style={styles.textPassword} label="Password"
            mode="flat" secureTextEntry={true} onChangeText={this.passwordHandler}>
        </TextInput>
        <Text className="error">{ this.state.errorMessage}</Text>
        <Button color='#111219' style={styles.textRegister}
              mode="outlined" onPress={() => this.handleSubmit()}>
        S'enregistrer
        </Button>

    {/* </ImageBackground> */}
        </Background>
    )
}
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
        top: 0,
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
        marginTop: 50,
        width: 300
    }
})

export default RegistrationScreen