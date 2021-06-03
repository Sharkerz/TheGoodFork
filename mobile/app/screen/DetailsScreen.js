import React  from 'react'
import {
    ImageBackground,
    StyleSheet,
    View,
    Text,
    Image,
    SafeAreaView,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    ScrollView, TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TextInput } from 'react-native-paper'
import Button from '../components/Button'
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import { SERVER_IP } from '@env';
import InputSpinner from 'react-native-input-spinner';


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
                const newCart = JSON.parse(cart)
                const exists = newCart.some(v => (v.id === test.id));
                if(exists){
                    const objIndex = newCart.findIndex((obj => obj.id == test.id));
                    newCart[objIndex].quantité = parseInt(newCart[objIndex].quantité) + parseInt(this.state.quantité)
                    await AsyncStorage.setItem('cartSaved',JSON.stringify(newCart))
                }else{
                    newCart.push(test)
                    await AsyncStorage.setItem('cartSaved',JSON.stringify(newCart))
                }
            } else {
                await AsyncStorage.setItem('cartSaved',JSON.stringify([test]))
            }
        }

    quantityHandler = (text) => {
        this.setState({quantité: text})
    }

    render(){
        const item = this.props.route.params.item;
        return(
            <View style={styles.container}>
                <KeyboardAvoidingView style={styles.container} behavior="padding">
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <ScrollView>
                        <TouchableOpacity style={styles.backBtn} onPress={this.props.navigation.goBack}>
                                <Image
                                    source={require('../assets/backButton.png')}
                                    style={{width: 60, height: 60}}
                                />
                        </TouchableOpacity>

                            <Image
                                source={{ uri: SERVER_IP + '/Images/MenuItem/'+item.image }}
                                resizeMode="cover"
                                style={{
                                    width: "120%",
                                    height: 400,
                                }}/>
                            <Text style={{width: 400, paddingLeft: 15, paddingRight: 15,textAlign:'center', marginTop: 20, fontSize: 26, fontWeight: '600', color: '#fff',marginBottom: 10}}>{item.name}</Text>
                            <Text style={{paddingLeft:15, paddingRight: 15, textAlign:'center', fontSize: 16,  color: '#fff',marginBottom: '5%'}}>{item.description}</Text>
                            <Text style={{paddingLeft:15, paddingRight: 15,textAlign:'center', fontSize: 18, fontWeight: '600', color: '#fff',marginBottom: '5%'}}>{item.price}€</Text>
                        <View style={{marginTop: 10, marginLeft: 110, marginRight: 110, alignItems: 'center'}}>
                            <InputSpinner
                                    max={15}
                                    min={1}
                                    step={1}
                                    colorMax={"#fff"}
                                    colorMin={"#fff"}
                                    value={this.state.number}
                                    onChange={this.quantityHandler}
                                    textColor={"#fff"}
                                    fontSize={26}>
                            </InputSpinner>
                            <Button style={{width: 210, marginTop: 25, marginBottom: 100}}  color='#111219'
                                    mode="outlined" onPress={() => this.addToCart(item)}>
                                Ajouter au panier
                            </Button>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#111219",
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
    },
    backBtn: {
        flexDirection:"row",
        top: 420,
        height: 70,
        width: 70,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    }
  })

export default DetailScreen;