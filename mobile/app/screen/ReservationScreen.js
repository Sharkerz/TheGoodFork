import React  from 'react'
import { StyleSheet, View, Text, Image, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { SERVER_IP } from '@env';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import Button from '../components/Button'
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
    }

    render(){
        return(
            <View style={styles.container}  >
               
            <SafeAreaView>
                <Text style={{ paddingLeft: 20, fontSize: 30, fontWeight: '600', color: '#fff'}}>Reservations</Text>
                <Calendar style={{}} 
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
           <Text style={{ paddingLeft: 20, fontSize: 15, fontWeight: '600', color: '#fff',marginBottom: '5%'}}>A quel moment souhaitez-vous réserver?</Text>
                {/* <View style={styles.service}>
                <Button color='#111219' style={styles.textRegister}
                    mode="outlined" >
                Ajouter au panier
                </Button>
                
                </View> */}
            </SafeAreaView>
          </View>
            
        )
    }
    

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor : '#111219'
   },
   service: {
    flex: 1,
    flexDirection : 'row',
    backgroundColor : '#111219'
 },
  })

export default ReservationScreen;