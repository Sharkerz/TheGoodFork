import React  from 'react'
import { ImageBackground, StyleSheet, View, Text, Image, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TextInput } from 'react-native-paper'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import { SERVER_IP } from '@env';


class DetailScreen extends React.Component {
        constructor(){
            super();
            this.state = {
                quantité : 1
            }
        }
    addToCart = async(item) =>{
        const cart = await AsyncStorage.getItem('cartSaved')
        const test = {id : item.id,name :item.name,image : item.image,category_id : item.category_id,quantité : this.state.quantité}
        if(cart) {
            console.log('test')
            const newCart = JSON.parse(cart)
            const exists = newCart.some(v => (v.id === test.id));
            if(exists){
                const objIndex = newCart.findIndex((obj => obj.id == test.id));
                newCart[objIndex].quantité = parseInt(newCart[objIndex].quantité) + parseInt(this.state.quantité)
                await AsyncStorage.setItem('cartSaved',JSON.stringify(newCart))
                console.log(await AsyncStorage.getItem('cartSaved'))
            }else{
                newCart.push(test)
                await AsyncStorage.getItem('cartSaved',JSON.stringify(newCart))
                console.log(await AsyncStorage.getItem('cartSaved'))
            }
        } else {
            console.log('testfail')
            await AsyncStorage.setItem('cartSaved',JSON.stringify([test]))
        }
    }

    quantityHandler = (text) => {
        this.setState({quantité: text})
    }

    render(){
        const item = this.props.route.params.item;
        return(
            <ImageBackground style={styles.container} source={require("../assets/background2.png")} >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
            mode="flat" keyboardType="numbers-and-punctuation" keyboardType ="number-pad" placeholder="1" onChangeText={this.quantityHandler}>
            </TextInput>
            <Button style={{width: 210}}  color='#111219'
                    mode="outlined" onPress={() => this.addToCart(item)}>
                Ajouter au panier
            </Button>
            </View>
        </SafeAreaView>
        </TouchableWithoutFeedback>
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