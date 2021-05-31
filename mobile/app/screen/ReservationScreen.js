import React, {useState} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    Platform
} from 'react-native';
import { SERVER_IP } from '@env';
import { TextInput } from 'react-native-paper'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import Button from '../components/Button';
import InputSpinner from 'react-native-input-spinner';
LocaleConfig.locales['fr'] = {
    monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
    monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
    dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
    dayNamesShort: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],
    today: 'Aujourd\'hui'
  };
  LocaleConfig.defaultLocale = 'fr';


class ReservationScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            markedDates: {},
            selectedDate: '',
            shouldShow: false,
            hourShow: false,
            middayHoursShow: false,
        }
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
            console.log(this.state.selectedDate)
            this.setState({shouldShow: true}) 
    }

    onMomentPressNight = () => {
        this.setState({nightHoursShow: true}) 
        this.setState({middayHoursShow: false}) 
    }

    onMomentPressMidday = () => {
        this.setState({middayHoursShow: true}) 
        this.setState({nightHoursShow: false}) 
    }

    render(){
        return(
            <View style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <ScrollView>
            {/* <SafeAreaView> */}
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
                            <Button style={{width: 130, marginRight: 30}}  color='#111219'
                                    mode="outlined"
                                    onPress={this.onMomentPressMidday}>
                                Midi
                            </Button>
                            <Button style={{width: 130, marginLeft: 30}} color='#111219'
                                    mode="outlined" 
                                    onPress={this.onMomentPressNight}>
                                Soir
                            </Button>
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
                            <Button style={{width: 130, marginRight: 30}}  color='#111219'
                                    mode="outlined">
                                12H
                            </Button>
                            <Button style={{width: 130, marginLeft: 30}}  color='#111219'
                                    mode="outlined" >
                                14H
                            </Button>
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
                            <Button style={{width: 130, marginRight: 30}}  color='#111219'
                                    mode="outlined">
                                18H
                            </Button>
                            <Button style={{width: 130, marginLeft: 30}}  color='#111219'
                                    mode="outlined" >
                                20H
                            </Button>
                        </View>
                    ) : null
                }
            </View>

            <Text style={{ textAlign: 'center', paddingTop: 10, fontSize: 16, fontWeight: '600', color: '#fff',marginBottom: '5%', marginTop: 20}}>Pour combien de personnes ?</Text>
            <View style={{marginLeft: 110, marginRight: 110, marginBottom: 25}}>
                <InputSpinner
                        max={15}
                        min={1}
                        step={1}
                        colorMax={"#fff"}
                        colorMin={"#fff"}
                        value={this.state.number}
                        onChange={(num)=>{console.log(num)}}
                        textColor={"#fff"}
                        fontSize={26}>
                </InputSpinner>
            </View>
            <View style={{alignItems:'center', marginBottom: 100}}>
                <Button style={{width: 200}}  color='#111219'
                    mode="outlined" >
                        Réserver
                </Button>
            </View>    


            {/* </SafeAreaView> */}
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
      marginTop: Platform.OS === 'ios' ? 13 : 40,
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
    }
  })

export default ReservationScreen;