import React, {useState} from 'react'
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
    ScrollView,
    TouchableWithoutFeedback
} from 'react-native';
import { TextInput } from 'react-native-paper'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import InputSpinner from 'react-native-input-spinner'
import { SERVER_IP } from '@env'
import axios from 'axios'
import * as SecureStore from "expo-secure-store"
import {Calendar} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import RNPickerSelect from 'react-native-picker-select';
LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
  monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
  dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
  dayNamesShort: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],
  today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'fr';

class ValidationScreen extends React.Component {
  constructor(){
    super();
    this.state = {
      markedDates: {},
      resNumber: null,
      onSite: true,  //remplacer les deux bouton par un checker qui modifie le state de onSite en true ou false ? à toi de voir Seb pour dire quand c'est sur place ou non t'as juste a modifier ce state en true ou false
      time: null,
      cost: 0.00,
      items: [],
      comment: "",
      onSiteSelected : false
    }
  }
  getCard = async() =>{
    const cart =  await AsyncStorage.getItem('cartSaved')
    .then(cart => {
      const cartParsed = JSON.parse(cart)
      var cost = 0.00
      this.setState({items : cartParsed})
      cartParsed.forEach(element => {
        cost += parseFloat(element.price) * element.quantity  
      })
      this.setState({cost : cost})
      console.log(this.state.cost)
    })
  }

  onDayPress = async(day) => {
    await this.setState({selectedDate : day.dateString})
    this.setState({markedDates : {}})
        const color = 'red'
        const markedDates = {...this.state.markedDates,
                             [this.state.selectedDate]: {
                                 selected: true,
                                 selectedColor: color}}
        this.setState({markedDates})
        this.setState({shouldShow: true}) 
}


  componentDidMount(){
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getCard();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  commentHandler = (text) => {
    this.setState({comment: text})
  }

  handleSubmit(){
    this.validate(this.state.resNumber, this.state.onSite, this.state.time, this.state.cost, this.state.items, this.state.comment)
  }

  TakeAWayHandler =() =>{
    this.setState({onSite : false})
    this.setState({onSiteSelected : true})
  }

  onSiteHandler =() =>{
    this.setState({onSite : true})
    this.setState({onSiteSelected : true})
  }


  validate = async(resNumber, onSite, time, cost, items, comment) =>{   //requete dans fonction pour t'aider a la deplacer beness
    const token = await SecureStore.getItemAsync('secure_token')
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    await axios.post(SERVER_IP + '/api/createOrder', { 
      numOrder: resNumber,    
      onSite: onSite,
      hour: time,
      prixTotal: cost,
      Value: items,
      comment: comment
    }, config)
    .then(response => {
      console.log(response)
    })
    .catch(err => {
      console.log(err.response)
    })
  }

     render(){
      const isFocused = this.props;
        return(
            <View style={styles.container}>
            <ScrollView>
            <BackButton goBack={this.props.navigation.goBack}/>
              <View style={{alignItems: 'center', marginTop: 100}}>
                <TextInput underlineColor="transparent" underlineColorAndroid="transparent" selectionColor='#5A5B61' style={styles.textLogin} label="Remarque (allergies, suppléments, ect...)"
                       mode="flat" onChangeText={this.commentHandler}>
                </TextInput>
                <TouchableOpacity
                        style={[styles.Button,{backgroundColor: this.state.middayHoursShow ? '#111219' : '#ffffff'}]} 
                        onPress={this.onSiteHandler}>
                        <Text style={[styles.TextButton,{color: this.state.middayHoursShow ? '#ffffff' : '#111219'}]}>SUR PLACE</Text>
                </TouchableOpacity>
                <TouchableOpacity
                        style={[styles.Button,{backgroundColor: this.state.middayHoursShow ? '#111219' : '#ffffff'}]} 
                        onPress={this.TakeAWayHandler}>
                        <Text style={[styles.TextButton,{color: this.state.middayHoursShow ? '#ffffff' : '#111219'}]}>À EMPORTER</Text>
                </TouchableOpacity>
              </View>
              {
                    !this.state.onSite && this.state.onSiteSelected ? (
                      <View>
                        <Calendar style={{marginTop: 10}} 
                        theme={{
                            calendarBackground: '#111219',
                            dayTextColor: 'white',
                            monthTextColor: 'white',
                            textDisabledColor: 'grey',
                        }}
                            minDate={'2021-04-30'}
                            onDayPress={this.onDayPress}
                            hideExtraDays={true}
                            firstDay={1}
                            markedDates = {this.state.markedDates}
                            minDate={Date()}/> 
                            <View>

                           
                            <RNPickerSelect
                              onValueChange={(value) => console.log(value)}
                              items={[
                                  { label: 'Football', value: 'football' },
                                  { label: 'Baseball', value: 'baseball' },
                                  { label: 'Hockey', value: 'hockey' },
                              ]}
                          />
                           </View>
                  </View>
                        
                    ) : null
                }
              
            <View style={{alignItems: 'center', marginTop: 20,marginBottom : 100}}>
                <Button style={{width: 350}}  color='#111219'
                    mode="outlined" onPress={() => this.handleSubmit()} >
                        Valider la commande
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
      marginBottom: 10
    },
    pickupButton: {
      color: '#111219',
      width: 250,
      marginBottom: 100,
    },
    Button:{
        marginTop:10,
        marginVertical: 10,
        paddingVertical: 10,
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        width:250,
        height: 65,
        justifyContent: 'center'
       },
    TextButton:{
        color:'#fff',
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10,
        fontWeight: 'bold',
        fontSize: 15,
        lineHeight: 26
     },
     textLogin: {
        width: 350,
        backgroundColor: "#1B1C23",
        borderRadius: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderWidth: 2,
        borderColor: '#5A5B61',
        color: "#292A32",
        marginBottom: 30,
        paddingBottom: 20
    },
    
  })

export default ValidationScreen;