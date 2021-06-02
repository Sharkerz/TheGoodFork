import React  from 'react'
import {
    ImageBackground,
    StyleSheet,
    View,
    Text,
    Image,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    Platform,
    ScrollView
} from 'react-native';
import Button from '../components/Button'
import AsyncStorage from '@react-native-async-storage/async-storage'
import InputSpinner from 'react-native-input-spinner';
import { SERVER_IP } from '@env';

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

  saveQuantity = async(id,num) =>{
    const items = this.state.items
    const objIndex = items.findIndex((obj => obj.id == id))
    items[objIndex].quantity = num
    if(items[objIndex].quantity == 0){
      items.splice(objIndex,1)
      console.log(items)
      await AsyncStorage.setItem('cartSaved',JSON.stringify(items))
      this.getCard()
    }else{
      this.setState({items : items})
      await AsyncStorage.setItem('cartSaved',JSON.stringify(items))
    }
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
       console.log(this.state.items)
      const isFocused = this.props;
        return(
            <View style={styles.container}>
            <ScrollView>
            <Text style={styles.title}>Panier</Text>
            <View>
            <FlatList style={styles.data}
                      data={this.state.items}
                      keyExtractor={item => item.id.toString()}
                      renderItem={({item}) => 
                      
                      <TouchableOpacity style={styles.item}>
                          <View style={styles.leftViewItem} flexDirection='row'>
                            <Image
                              source={{ uri: SERVER_IP + '/Images/MenuItem/'+ item.image }}
                              resizeMode="cover"
                              style={{
                                  width: 70,
                                  height: 70,
                              }}/>
                            <Text style={styles.textRowListTitle}>{item.name} :</Text>
                          </View>
                          <View style={styles.rightViewItem}>
                            <InputSpinner
                                      max={15}
                                      min={0}
                                      step={1}
                                      colorMax={"#fff"}
                                      colorMin={"#fff"}
                                      value={item.quantity}
                                      onChange={(num)=>{this.saveQuantity(item.id,num)}}
                                      textColor={"#fff"}
                                      buttonPressTextColor={'#fff'}
                                      buttonTextColor={'#111219'}
                                      colorLeft={'#fff'}
                                      colorRight={'#fff'}
                                      fontSize={26}
                                      height={40}
                                      width={120}>
                              </InputSpinner>
                          </View>
                      </TouchableOpacity>
                      }
            />
            </View>
            <View style={{alignItems:'center'}}>
              <Button color='#111219' style={styles.shippingButton}
                mode="outlined" onPress={() => this.props.navigation.navigate('Validation')}>
                Commandez
              </Button>
            </View>
            
          </ScrollView>
      </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor :'#111219'
    },
    title : {
      marginTop: Platform.OS === 'ios' ? 60 : 40,
      paddingLeft: 20,
      fontSize: 30,
      fontWeight: '600',
      color: '#fff'
    },
    item: {
      padding: 16,
      marginVertical: 1,
      marginHorizontal: 0,
      borderBottomColor: '#343434',
      borderBottomWidth: 0.2,
      flexDirection: 'row',
      color: '#fff'
    },
    textRowList: {
      color: '#FFFF',
      fontSize: 16,
    },
    textRowListTitle: {
      width: 130,
      color: '#FFFF',
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 10,
      paddingTop: 5
    },
    leftViewItem: {
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    rightViewItem: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    shippingButton: {
      color: '#111219',
      width: 250,
      marginBottom: 150
    },
  })

export default CartScreen;