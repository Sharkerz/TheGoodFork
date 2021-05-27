import React  from 'react'
import { ImageBackground, StyleSheet, View, Text, Image, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import Button from '../components/Button'
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
        return(
            <ImageBackground style={styles.container} source={require("../assets/background2.png")} >
        <SafeAreaView>
            <Text style={{ paddingLeft: 20, fontSize: 30, fontWeight: '600', color: '#fff',marginBottom: '5%'}}>{item.name}</Text>
            <View style={{
                        paddingHorizontal: 20,
                    }}>
                <Image
                    source={{ uri: SERVER_IP + '/Images/MenuItem/'+item.image }}
                    resizeMode="cover"
                    style={{
                        width: "100%",
                        height: 200,
                        borderRadius: 15,
                        paddingHorizontal: 20,
                    }}
                />
            <Button color='#111219' style={styles.textRegister}
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
  })

export default DetailScreen;