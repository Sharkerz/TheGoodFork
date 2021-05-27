import React  from 'react'
import { ImageBackground, StyleSheet, View, Text, Image, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { SERVER_IP } from '@env';

class CartScreen extends React.Component {

    render(){
        return(
            <ImageBackground style={styles.container} source={require("../assets/background2.png")} >
        <SafeAreaView>
            <Text style={{ paddingLeft: 20, fontSize: 30, fontWeight: '600', color: '#fff',marginBottom: '5%'}}>Panier</Text>
            <View>
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

export default CartScreen;