import React  from 'react'
import { ImageBackground, StyleSheet, View, Text, Image, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { TextInput } from 'react-native-paper'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import { SERVER_IP } from '@env';
import * as SecureStore from "expo-secure-store"


class DetailScreen extends React.Component {

    addToCart = async(item) =>{ 
        const cart = await SecureStore.getItemAsync('cartSaved')
        console.log(cart)
        if(cart) {
            const newCart = JSON.parse(cart)
            newCart.push(item)
            await SecureStore.setItemAsync('cartSaved',JSON.stringify(newCart))
        } else {
            await SecureStore.setItemAsync('cartSaved',JSON.stringify([item]))
        }
    }

    render(){
        const item = this.props.route.params.item;
        console.log(item)
        return(
            <ImageBackground style={styles.container} source={require("../assets/background2.png")} >
        <SafeAreaView>
        <BackButton goBack={this.props.navigation.goBack}/>
            <View style={{
                        paddingHorizontal: 20,
                        marginTop: 90,
                        alignItems:'center'
                    }}>
                <Image
                    source={{ uri: SERVER_IP + '/Images/MenuItem/'+item.image }}
                    resizeMode="cover"
                    style={{
                        width: "120%",
                        height: 300,
                        // borderRadius: 15,
                    }}
                />
            <Text style={{ textAlign:'center', marginTop: 20, fontSize: 26, fontWeight: '600', color: '#fff',marginBottom: 10}}>{item.name}</Text>
            <Text style={{ textAlign:'center', fontSize: 16,  color: '#fff',marginBottom: '5%'}}>{item.description}</Text>
            <Text style={{ textAlign:'center', fontSize: 18, fontWeight: '600', color: '#fff',marginBottom: '5%'}}>{item.price}€</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <TextInput underlineColor="transparent" underlineColorAndroid="transparent" name="Quantité" selectionColor='#5A5B61' style={styles.textLogin} label="Quantité"
            mode="flat" keyboardType="numbers-and-punctuation" onChangeText={this.nameHandler}>
            </TextInput>
            <Button style={{width: 210}}  color='#111219'
                    mode="outlined" onPress={() => this.addToCart(item)}>
                Ajouter au panier
            </Button>
            </View>
        </SafeAreaView>
      </ImageBackground>
        )
    }
    

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    textLogin: {
        width: 100,
        height: 63,
        backgroundColor: "#1B1C23",
        borderRadius: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderWidth: 2,
        borderColor: '#5A5B61',
        color: "#292A32"
    }
  })

export default DetailScreen;