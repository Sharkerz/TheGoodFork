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
    Platform
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
            <Text style={styles.title}>Panier</Text>
            <View>
            <FlatList style={styles.data}
                      data={this.state.items}
                      keyExtractor={item => item.id.toString()}
                      renderItem={({item}) => 
                      
                      <TouchableOpacity style={styles.item}>
                        {/* <Text style={{'color': 'white'}}>{item.name + " quantité : " + item.quantité.toString()}</Text> */}
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
                                      value={item.quantité}
                                      onChange={this.quantityHandler}
                                      textColor={"#fff"}
                                      buttonPressTextColor={'#fff'}
                                      buttonTextColor={'#111219'}
                                      colorLeft={'#fff'}
                                      colorRight={'#fff'}
                                      fontSize={26}
                                      height={40}
                                      width={120}>
                              </InputSpinner>
                            {/* <Text style={styles.textRowList}>{item.quantité.toString()}</Text> */}
                          </View>
                      </TouchableOpacity>
                      }
            />
            </View>
            <View style={{alignItems:'center', top: '30%'}}>
              <Button color='#111219' style={styles.shippingButton}
                mode="outlined" onPress={() => this.navigateFromList()}>
                Sur place
              </Button>
              <Button color='#111219' style={styles.shippingButton}
                      mode="outlined" onPress={() => this.logout()}>
                À emporter
              </Button>
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
    title : {
        marginTop: Platform.OS === 'ios' ? 13 : 40,
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
      marginBottom: 10
    },
    editButton: {
      color: '#111219',
      width: 150,
      marginBottom: 10,
    },
  })

export default CartScreen;