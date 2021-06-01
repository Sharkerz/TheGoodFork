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
import BackButton from '../components/BackButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import InputSpinner from 'react-native-input-spinner';
import { SERVER_IP } from '@env';

const test = AsyncStorage.getItem('cartSaved')

// const cart =  SecureStore.getItemAsync('cartSaved')
class ValidationScreen extends React.Component {
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
            <BackButton goBack={this.props.navigation.goBack}/>
            <View style={{alignItems:'center', marginTop: 100}}>
              <Button color='#111219' style={styles.shippingButton}
                mode="outlined" >
                Sur place
              </Button>
              <Button color='#111219' style={styles.pickupButton}
                      mode="outlined" >
                À emporter
              </Button>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 0}}>
                <TouchableOpacity
                        style={[styles.Button,{backgroundColor: this.state.middayHoursShow ? '#111219' : '#ffffff'}]} 
                        onPress={this.onMomentPressMidday}>
                        <Text style={[styles.TextButton,{color: this.state.middayHoursShow ? '#ffffff' : '#111219'}]}>Midi</Text>
                </TouchableOpacity>
                <TouchableOpacity
                        style={[styles.Button,{backgroundColor: this.state.nightHoursShow ? '#111219' : '#ffffff'}]} 
                        onPress={this.onMomentPressNight}>
                        <Text style={[styles.TextButton,{color: this.state.nightHoursShow ? '#ffffff' : '#111219'}]}>Soir</Text>
                </TouchableOpacity>
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
      marginBottom: 10
    },
    pickupButton: {
      color: '#111219',
      width: 250,
      marginBottom: 100,
    },
    Button:{
        marginTop:10,
        marginLeft:20,
         paddingTop:10,
         paddingBottom:10,
         borderRadius:10,
         borderWidth: 1,
         borderColor: '#fff',
         width:130,
       },
       TextButton:{
         color:'#fff',
         textAlign:'center',
         paddingLeft : 10,
         paddingRight : 10
     }
  })

export default ValidationScreen;