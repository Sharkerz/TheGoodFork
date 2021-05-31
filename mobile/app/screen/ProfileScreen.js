import React, {Component} from 'react';
import {ImageBackground, StyleSheet, View, Text, Image, DevSettings} from 'react-native';
import Background from '../components/Background'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import BackButton from '../components/BackButton'
import * as SecureStore from "expo-secure-store"
import AsyncStorage from '@react-native-async-storage/async-storage'

class ProfileScreen extends Component {
  logout = () => {
    SecureStore.deleteItemAsync('secure_token').then(r => console.log('deleted'))
    AsyncStorage.removeItem('cartSaved').then(r => console.log('deleted cart'))
    DevSettings.reload();
  }

  render() {
    return (
        <View style={styles.container}>
          <Paragraph style={styles.textHome}>
            Profile
          </Paragraph>
          <Button color='#111219' style={styles.textRegister}
                  mode="outlined" onPress={() => this.logout()}>
            Se déconnecter
          </Button>
        </View>
    );
}
}

export default ProfileScreen

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
    marginTop: 480,
    width: 300
  }
})

