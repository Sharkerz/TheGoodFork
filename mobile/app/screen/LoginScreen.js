import React from 'react'
import {StyleSheet} from 'react-native'
import { TextInput } from 'react-native-paper'
import Background from '../components/Background'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import BackButton from '../components/BackButton'
import * as SecureStore from "expo-secure-store"
import AuthService from '../service/AuthService'
import Toast from "react-native-toast-message";

class LoginScreen extends React.Component{
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
        }
    }


    handleSubmit = async() =>{
        await AuthService.Login(this.state.email,this.state.password).then(async(res) =>{
            if(res.status === 200){
                await SecureStore.setItemAsync('secure_token',res.data.access_token)
                await SecureStore.setItemAsync('user',JSON.stringify(res.data.user))
                const token = await SecureStore.getItemAsync('secure_token')
                const user = JSON.parse(await SecureStore.getItemAsync('user'))
                this.props.route.params.auth(true)
                console.log(user['role'])
                this.props.route.params.user(user)
            }else{
                Toast.show({
                    type: 'error',
                    visibilityTime: 6000,
                    text1: 'Erreur',
                    text2: res.data[Object.keys(res.data)[0]].toString(),
                });
            }
           
       })  
   }


    emailHandler = (text) => {
        this.setState({email: text})
    }
    passwordHandler = (text) => {
        this.setState({password: text})
    }

render() {
    return (
        <Background style={styles.container}>
            <BackButton goBack={this.props.navigation.goBack}/>
            <Paragraph style={styles.textHome}>
                Connectez-vous
            </Paragraph>
            <TextInput underlineColor="transparent" underlineColorAndroid="transparent" selectionColor='#5A5B61' style={styles.textLogin} label="Email"
                       mode="flat" onChangeText={this.emailHandler}>
            </TextInput>
            <TextInput underlineColor='transparent' underlineColorAndroid="transparent" selectionColor='#5A5B61' style={styles.textPassword} label="Password"
                       mode="flat" secureTextEntry={true} onChangeText={this.passwordHandler}>
            </TextInput>
            <Button color='#111219' style={styles.textRegister}
                    mode="outlined" onPress={() => this.handleSubmit()}>
                Connexion
            </Button>
        </Background>
    )
}
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#111219",
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
        top: 40,
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
        marginTop: 90,
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

export default LoginScreen