import React, {Component} from 'react';
import {StyleSheet, View, Text, Keyboard} from 'react-native';
import Button from '../components/Button'
import {TextInput} from "react-native-paper";
import BackButton from "../components/BackButton";
import Paragraph from "../components/Paragraph";
import Background from '../components/Background'
import * as SecureStore from "expo-secure-store";
import { CheckBox } from 'react-native-elements'
import ProfileService from "../service/ProfileService";
import Toast from 'react-native-toast-message';

class EditProfileScreen extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            changePwd: false,
            password: "",
            confirm_password: "",
        }
    }

    async componentDidMount() {
        await SecureStore.getItemAsync('user').then(JSON.parse).then((res) => {
            this.setState({name: res.name})
            this.setState({email: res.email})
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

    passwordConfirmationHandler = (text) => {
        this.setState({confirm_password: text})
    }

    submitChange = () => {
        Keyboard.dismiss()
        if(!this.state.changePwd) {
            this.setState({password: "", confirm_password: ""})
        }
        ProfileService.Edit(this.state.name, this.state.email, this.state.password, this.state.confirm_password).then((res) => {
            if (res.data.status === "success") {
                this.setState({name: res.data.user.name})
                this.setState({email: res.data.user.email})
                SecureStore.setItemAsync('user',JSON.stringify(res.data.user))
                this.setState({password: "", confirm_password: "", changePwd: false})
                Toast.show({
                    text1: 'Succès',
                    text2: "Modification bien prise en compte 🎉",
                });
            }
            else {
                Toast.show({
                    type: 'error',
                    visibilityTime: 6000,
                    text1: 'Erreur',
                    text2: res.data[Object.keys(res.data)[0]].toString(),
                });
            }
        })
    }

  render() {
    return (
        <Background style={styles.container}>
            <BackButton goBack={this.props.navigation.goBack}/>
            <Paragraph style={styles.textTitle}>
                Editer mon profil
            </Paragraph>
            <TextInput underlineColor="transparent" underlineColorAndroid="transparent" selectionColor='#5A5B61' style={styles.input} label="pseudo"
                       mode="flat" onChangeText={this.nameHandler} value={this.state.name}>
            </TextInput>
            <TextInput underlineColor='transparent' underlineColorAndroid="transparent" selectionColor='#5A5B61' style={styles.input} label="email"
                       mode="flat" onChangeText={this.emailHandler} autoCompleteType="email" keyboardType="email-address" value={this.state.email}>
            </TextInput>

            <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                <CheckBox
                    center
                    checked={this.state.changePwd}
                    onPress={() => this.setState({changePwd: !this.state.changePwd})}
                    title={<Text style={{color: 'white'}} >Modifier le mot de passe</Text>}
                    containerStyle={{backgroundColor: 'transparent', borderColor: 'transparent'}}
                />
            </View>

            {this.state.changePwd ? (
                <View style={{alignItems:'center'}}>
                    <TextInput underlineColor="transparent" underlineColorAndroid="transparent" selectionColor='#5A5B61' style={styles.input} label="mot de passe"
                               mode="flat" onChangeText={this.passwordHandler} value={this.state.password} secureTextEntry={true}>
                    </TextInput>
                    <TextInput underlineColor='transparent' underlineColorAndroid="transparent" selectionColor='#5A5B61' style={styles.input} label="confirmation"
                               mode="flat" onChangeText={this.passwordConfirmationHandler}  value={this.state.confirm_password} secureTextEntry={true}>
                    </TextInput>
                </View>
            ) : null}


            <View style={styles.viewSave}>
                <Button color='#111219' style={styles.submitBtn}
                        mode="outlined" onPress={() => {
                            this.submitChange()
                            if(!this.state.changePwd) {
                                this.setState({password: "", confirm_password: ""})
                            }
                        }}>
                    Enregistrer
                </Button>
            </View>


        </Background>
    );
}
}

export default EditProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
  },
    input : {
        marginBottom: 20,
        backgroundColor: "#1B1C23",
        borderRadius: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderWidth: 2,
        borderColor: '#5A5B61',
        color: "#292A32",
        width: 300
    },
    viewSave: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitBtn: {
        backgroundColor: '#fff',
        marginTop: 100,
        width: 300,
    },
    textTitle: {
        fontSize: 30,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 40,
        color: "#fff",
        fontWeight: "600"
    },
    labelCheckBox: {
      color: 'white',
        marginTop: 5
    },
    

})

