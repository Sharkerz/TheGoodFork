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
    .then(cart => {
      this.setState({items : JSON.parse(cart)})
    })
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
      console.log(this.state.items)
        return(
            <View style={styles.container}>
        <SafeAreaView>
            <Text style={{ paddingLeft: 20, paddingTop: 60, fontSize: 30, fontWeight: '600', color: '#fff'}}>Panier</Text>
            <View>
            <FlatList style={styles.data}
                      data={this.state.items}
                      keyExtractor={item => item.id.toString()}
                      renderItem={({item}) => <Text style={{'color': 'white'}}>{item.name + " quantité : " + item.quantité.toString()}</Text>
                      }
            />
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