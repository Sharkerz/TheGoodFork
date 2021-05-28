import React  from 'react'
import { ImageBackground, StyleSheet, View, Text, Image, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
const test = AsyncStorage.getItem('cartSaved')

// const cart =  SecureStore.getItemAsync('cartSaved')
class CartScreen extends React.Component {
  constructor(){
    super();
    this.state = {
        items: [],
    }
    // this.GetCard = this.GetCard.bind(this);
  }
  getCard = async() =>{
    const cart =  await AsyncStorage.getItem('cartSaved')
    console.log(cart)
    // this.setState({items : cart})
  }


  componentDidMount(){
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getCard();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

    render(){
      const isFocused = this.props;
     this.GetCard() 
     
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