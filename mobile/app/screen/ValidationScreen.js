import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Platform,
    ScrollView,
} from 'react-native';
import { TextInput } from 'react-native-paper'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SERVER_IP } from '@env'
import axios from 'axios'
import * as SecureStore from "expo-secure-store"
import {Calendar} from 'react-native-calendars';
import BookingService from '../service/BookingService'
import Toast from 'react-native-toast-message';
import {LocaleConfig} from 'react-native-calendars';
import RNPickerSelect from 'react-native-picker-select';
import OrderService from '../service/OrderService';
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
      onSite: true,  //remplacer les deux bouton par un checker qui modifie le state de onSite en true ou false ? à toi de voir Seb pour dire quand c'est sur place ou non t'as juste a modifier ce state en true ou false
      time: null,
      date :null,
      cost: 0.00,
      selectedDate : null,
      items: [],
      comment: "",
      onSiteSelected : false,
      timePicker : [
        { label: '12:00', value: '12:00' },
        { label: '12:30', value: '12:30' },
        { label: '13:00', value: '13:00' },
        { label: '13:30', value: '13:30' },
        { label: '14:00', value: '14:00' },
        { label: '14:30', value: '14:30' },
        { label: '18:00', value: '18:00' },
        { label: '18:30', value: '18:30' },
        { label: '19:00', value: '19:00' },
        { label: '19:30', value: '19:30' },
        { label: '20:00', value: '20:00' },
        { label: '20:30', value: '20:30' },
    ],
    BookingPicker : []
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
        if(this.state.date != null){
          this.setState({date : this.state.selectedDate + ' ' +this.state.time})
        }
}


  componentDidMount(){
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getCard();
      this.getReservations(this.props.route.params.userName)
    });
  }

  getReservations = async(userName) => {
    await BookingService.getReservations(userName).then(async(res) =>{
      if(res.data.status === "success"){
        bookings = []
        const temp = res.data.bookings
        temp.forEach(element => {
          date = new Date(element.date)
          date = date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear()
          bookings.push({label : date, value : element.id}) 
        })
        this.setState({BookingPicker : bookings})
      }else{
          Toast.show({
              type: 'error',
              visibilityTime: 6000,
              text1: 'Erreur',
              text2: res.data.message.toString(),
              topOffset: 60,
          });
      }
     
 })  
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  commentHandler = (text) => {
    this.setState({comment: text})
  }

  handleSubmit = async() =>{
    data = { 
      numBooking : this.state.numBooking,   
      onSite: this.state.onSite,
      hour: this.state.date,
      prixTotal: this.state.cost,
      Value: this.state.items,
      comment: this.state.comment,
      userName : this.props.route.params.userName}
    await OrderService.createOrder(data).then(async(res) =>{
      if(res.data.status === "success"){
        Toast.show({
          text1: 'Succès',
          text2: "Votre commande est pasée sans problème! 🎉",
          topOffset: 60,
      });
      }else{
          Toast.show({
              type: 'error',
              visibilityTime: 6000,
              text1: 'Erreur',
              text2: res.data.message.toString(),
              topOffset: 60,
          });
      }
    })
  }

  TakeAWayHandler =() =>{
    this.setState({onSite : false})
    this.setState({onSiteSelected : true})
  }

  onSiteHandler =() =>{
    this.setState({onSite : true})
    this.setState({onSiteSelected : true})
  }
   
  setTime = (time) =>{
    date = this.state.selectedDate + ' ' + time
    this.setState({time : time})
    this.setState({date : date})
  }
  BookingNum = (numBooking) =>{
    this.setState({numBooking : numBooking})
  }


     render(){
        return(
            <View style={styles.container}>
            <ScrollView>
            <BackButton goBack={this.props.navigation.goBack}/>
              <View style={{alignItems: 'center', marginTop: 130}}>
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
                      <View style={styles.DateInfo}>
                        <Calendar style={{marginTop: 10,width : '95%',marginLeft : '2.5%'}} 
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
                            {
                    this.state.selectedDate ? (
                            <View style={{
                              borderColor: 'white',
                              borderWidth: 1,
                              marginLeft: 100,
                              marginTop: 15,
                              width: 200,
                              height : 40,
                              justifyContent : 'center',
                              borderRadius : 10,
                             
                            }}>

                           
                            <RNPickerSelect style={{ inputAndroid: { color: 'white', textAlign: 'center',},inputIOS: { color: 'white', textAlign: 'center',}}}
                                value = {this.state.time}
                             useNativeAndroidPickerStyle={false}
                             placeholder={{
                              label: 'Selectionner une heure',
                              value: null,
                            }}
                              onValueChange={(value) => this.setTime(value)}
                              items={this.state.timePicker}
                          />
                           </View>
                    ) : null}
                  </View>
                        
                    ) : null
                }
                 {this.state.onSite  && this.state.onSiteSelected? (
                            <View style={{
                              borderColor: 'white',
                              borderWidth: 1,
                              marginLeft: 100,
                              width: 200,
                              height : 40,
                              justifyContent : 'center',
                              borderRadius : 10,
                             
                            }}>

                           
                            <RNPickerSelect style={{ inputAndroid: { color: 'white', textAlign: 'center',},inputIOS: { color: 'white', textAlign: 'center',}}}
                                value = {this.state.numBooking}
                             useNativeAndroidPickerStyle={false}
                             placeholder={{
                              label: 'Selectionner une réservation',
                              value: null,
                            }}
                              onValueChange={(value) => this.BookingNum(value)}
                              items={this.state.BookingPicker}
                          />
                           </View>
                    ) : null}
            <View style={{alignItems: 'center', marginTop: 20,marginBottom : 100}}>
                <Button style={{width : '90%'}}  color='#111219'
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
    },DateInfo :{
      width : '100%',
      justifyContent : 'center'
    }
    
  })

export default ValidationScreen;