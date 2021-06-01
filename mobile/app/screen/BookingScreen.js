import React, {useState} from 'react'
import {StyleSheet,View,Text,TouchableWithoutFeedback,Keyboard,ScrollView,Platform,TouchableOpacity} from 'react-native';
import { SERVER_IP } from '@env';
import { TextInput } from 'react-native-paper'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import Button from '../components/Button';
import InputSpinner from 'react-native-input-spinner';
import BookingService from '../service/BookingService'
import Toast from 'react-native-toast-message';
LocaleConfig.locales['fr'] = {
    monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
    monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
    dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
    dayNamesShort: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],
    today: 'Aujourd\'hui'
  };
  LocaleConfig.defaultLocale = 'fr';


class BookingScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            markedDates: {},
            selectedDate: '',
            shouldShow: false,
            hourShow: false,
            middayHoursShow: false,
            hourlist : ['12:00','14:00','18:00','20:00']
        }
        this.SetHour = this.SetHour.bind(this);
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

    onMomentPressNight = () => {
        this.setState({nightHoursShow: true}) 
        this.setState({middayHoursShow: false}) 
        this.setState({Service : 'Soir'})
    }

    onMomentPressMidday = () => {
        this.setState({middayHoursShow: true}) 
        this.setState({nightHoursShow: false}) 
        this.setState({Service : 'Midi'})
    }

    SetHour = (hour) => {
        this.setState({hour:hour})
    }

    setNbPersons = (num) => {
        this.setState({NbPersons:num})
    }

    handleSubmit = async() =>{
        var object = {date : this.state.selectedDate,Service : this.state.Service,userName : '',hour : this.state.hour,nbPersons : this.state.NbPersons}
        await BookingService.create(object).then(async(res) =>{
            if(res.status === 200){
                Toast.show({
                    text1: 'Succès',
                    text2: "Votre Réservation a été prise en compte "
                });
            }else{
                Toast.show({
                    type: 'error',
                    visibilityTime: 6000,
                    text1: 'Erreur',
                    text2: res.data[Object.keys(res.data)[0]].toString(),
                });
            }
           
       })  
    }

    render(){
        return(
            <View style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <ScrollView>
                <Text style={styles.title}>Reservations</Text>
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
                    minDate={Date()}
          /> 
            <View>
                {
                    this.state.shouldShow ? (
                        <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '600', color: '#fff',marginBottom: '5%', marginTop: 10}}>A quel moment souhaitez-vous réserver ?</Text>
                        
                    ) : null
                }
                    {
                    this.state.shouldShow ? (
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
                        
                    ) : null
                }
            </View>

            <View>
                {
                    this.state.middayHoursShow ? (
                        <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '600', color: '#fff', marginTop: 20}}>A quelle heure souhaitez-vous réserver ?</Text>
                    ) : null
                }
                {
                    this.state.middayHoursShow ? (
                        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 0}}>
                             <TouchableOpacity
                                    style={[styles.Button,{backgroundColor: this.state.hour == this.state.hourlist[0] ? '#111219' : '#ffffff'}]} 
                                    onPress={(event) => this.SetHour(this.state.hourlist[0])}>
                                    <Text style={[styles.TextButton,{color: this.state.hour == this.state.hourlist[0] ? '#ffffff' : '#111219'}]}>12H</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                    style={[styles.Button,{backgroundColor: this.state.hour == this.state.hourlist[1] ? '#111219' : '#ffffff'}]} 
                                    onPress={(event) => this.SetHour(this.state.hourlist[1])}>
                                    <Text style={[styles.TextButton,{color: this.state.hour == this.state.hourlist[1] ? '#ffffff' : '#111219'}]}>14H</Text>
                            </TouchableOpacity>
                        </View>
                    ) : null
                }
            </View>

            <View>
                {
                    this.state.nightHoursShow ? (
                        <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '600', color: '#fff', marginTop: 20}}>A quelle heure souhaitez-vous réserver ?</Text>
                        
                    ) : null
                }
                {
                    this.state.nightHoursShow ? (
                        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 0}}>
                             <TouchableOpacity
                                    style={[styles.Button,{backgroundColor: this.state.hour == this.state.hourlist[2] ? '#ff0000' : '#ffffff'}]} 
                                    onPress={(event) => this.SetHour(this.state.hourlist[2])}>
                                    <Text style={[styles.TextButton,{color: this.state.hour == this.state.hourlist[2] ? '#ffffff' : '#000000'}]}>18H</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                    style={[styles.Button,{backgroundColor: this.state.hour == this.state.hourlist[3] ? '#ff0000' : '#ffffff'}]} 
                                    onPress={(event) => this.SetHour(this.state.hourlist[3])}>
                                    <Text style={[styles.TextButton,{color: this.state.hour == this.state.hourlist[3] ? '#ffffff' : '#000000'}]}>20H</Text>
                            </TouchableOpacity>
                        </View>
                    ) : null
                }
            </View>
            {this.state.shouldShow  && this.state.Service && this.state.hour ? (
            <Text style={{ textAlign: 'center', paddingTop: 10, fontSize: 16, fontWeight: '600', color: '#fff',marginBottom: '5%', marginTop: 20}}>Pour combien de personnes ?</Text>
            ) : null}
            <View style={{marginLeft: 110, marginRight: 110, marginBottom: 25}}>
                {this.state.shouldShow  && this.state.Service  && this.state.hour ? (<InputSpinner
                        max={15}
                        min={1}
                        step={1}
                        colorMax={"#fff"}
                        colorMin={"#fff"}
                        value={this.state.number}
                        onChange={(num)=>{this.setNbPersons(num)}}
                        textColor={"#fff"}
                        fontSize={26}>
                </InputSpinner>) : null }
                
            </View>
            <View style={{alignItems:'center', marginBottom: 100}}>
            {this.state.shouldShow  && this.state.Service && this.state.hour ? (
                <Button style={{width: 200}}  color='#111219'
                    mode="outlined" onPress={this.handleSubmit} >
                        Réserver
                </Button>
            ) : null }
            </View>    
            </ScrollView>
            </TouchableWithoutFeedback>
            </View>
            
        )
    }
    

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor : '#111219'
   },
   title : {
      marginTop: Platform.OS === 'ios' ? 60 : 40,
      paddingLeft: 20,
      fontSize: 30,
      fontWeight: '600',
      color: '#fff'
    },
   service: {
    flex: 1,
    flexDirection : 'row',
    backgroundColor : '#111219'
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

export default BookingScreen;