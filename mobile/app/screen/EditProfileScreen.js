import React, {Component} from 'react';
import {ImageBackground, StyleSheet, View, Text, Image, DevSettings, FlatList, TouchableOpacity} from 'react-native';
import Button from '../components/Button'
import * as SecureStore from "expo-secure-store";
import {TextInput} from "react-native-paper";
import AuthService from "../service/AuthService";
import BackButton from "../components/BackButton";
import Paragraph from "../components/Paragraph";
import {CheckBox} from "react-native";
import Background from '../components/Background'

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

    componentDidMount() {
        //get users data
    }

    nameHandler = (text) => {
        this.setState({name: text})
    }

    emailHandler = (text) => {
        this.setState({email: text})
    }

    selectPwdChoiceHandler = (text) => {
        this.setState({changePwd: text})
    }

    passwordHandler = (text) => {
        this.setState({password: text})
    }

    passwordConfirmationHandler = (text) => {
        this.setState({confirm_password: text})
    }

    submitChange = () => {
        console.log(this.state.name)
        console.log(this.state.email)
        console.log(this.state.changePwd)
        // AuthService.Edit(this.state.name, this.state.email).then((res) => {
        //     console.log(res)
        // })
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
                    value={this.state.changePwd}
                    onValueChange={this.selectPwdChoiceHandler}
                    style={styles.checkboxPwd}
                    tintColors={{ true: '#FFFF', false: 'black' }}
                    label="ah"
                />
                <Text style={styles.labelCheckBox}> Modifier le mot de passe</Text>
            </View>

            {this.state.changePwd ? (
                <View style={{alignItems:'center'}}>
                    <TextInput underlineColor="transparent" underlineColorAndroid="transparent" selectionColor='#5A5B61' style={styles.input} label="mot de passe"
                               mode="flat" onChangeText={this.passwordHandler} value={this.state.password}>
                    </TextInput>
                    <TextInput underlineColor='transparent' underlineColorAndroid="transparent" selectionColor='#5A5B61' style={styles.input} label="confirmation"
                               mode="flat" onChangeText={this.passwordConfirmationHandler}  value={this.state.confirm_password}>
                    </TextInput>
                </View>
            ) : null}


            <View style={styles.viewSave}>
                <Button color='#111219' style={styles.submitBtn}
                        mode="outlined" onPress={() => this.submitChange()}>
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
        alignItems: 'center',
        marginTop: -30
    },
    submitBtn: {
        backgroundColor: '#fff',
        marginTop: 100,
        width: 300,
        alignItems: 'center'
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

