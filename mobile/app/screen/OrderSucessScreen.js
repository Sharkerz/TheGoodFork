import React from 'react'
import {Text, StyleSheet} from 'react-native'
import Background from '../components/Background'

class OrderSucessScreen extends React.Component{
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
        }
    }


render() {
    return (
        <Background style={styles.container}>
            <Text style={styles.textHome}>Votre commande est passée sans soucis 🎉 </Text>
        </Background>
    )
}
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#111219",
    },
    textHome: {
        fontSize: 30,
        textAlign: 'center',
        justifyContent : 'center',
        color: "#fff",
        fontWeight: "600",
        marginRight : '10%',
        marginLeft : '10%'
        
    },
})

export default OrderSucessScreen