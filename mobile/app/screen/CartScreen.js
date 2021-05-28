import React  from 'react'
import { ImageBackground, StyleSheet, View, Text, Image, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { SERVER_IP } from '@env';
import * as SecureStore from "expo-secure-store"

// const cart =  SecureStore.getItemAsync('cartSaved')
class CartScreen extends React.Component {
  constructor(){
    super();
    this.state = {
        items: [],
    }
    // this.GetCard = this.GetCard.bind(this);
  }
  GetCard = async() =>{ 
    const cart =  await SecureStore.getItemAsync('cartSaved')
    return cart
    // this.setState({items : cart})
  }

  // componentDidMount(){
  //   this.GetCard()
  // }

     render(){
      
     
        return(
            <View style={styles.container} source={require("../assets/background2.png")} >
        <SafeAreaView>
            <Text style={{ paddingLeft: 20, fontSize: 30, fontWeight: '600', color: '#fff',marginBottom: '5%'}}>Panier</Text>
            <View>
            
            </View>
            
        </SafeAreaView>
      </View>
        )
    }
    

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor :'#111219'
    },
  })

export default CartScreen;