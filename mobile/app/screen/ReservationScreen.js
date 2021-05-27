import React  from 'react'
import { ImageBackground, StyleSheet, View, Text, Image, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { SERVER_IP } from '@env';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
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
        console.log(this.state.selectedDate)
            const color = 'red'
            const markedDates = {...this.state.markedDates,
                                 [this.state.selectedDate]: {
                                     selected: true,
                                     selectedColor: color}}
            this.setState({markedDates})
            console.log(this.state.markedDates)
//         } else {
// //            const markedDates = {...this.state.markedDates,
// //                                 [d]: {
// //                                     ...this.state.markedDates[d],
// //                                     selected: false}}
// //            this.setState({markedDates}, () => {
//                 const color = this.state.markedDates[d].selectedColor == 'red' ? 'blue' : 'red'
//                 const markedDates = {...this.state.markedDates,
//                                      [d]: {
//                                          ...this.state.markedDates[d],
// //                                         selected: true,
//                                          selectedColor: color}}
//                 this.setState({markedDates})
// //            })
//         }
    }

    render(){
        return(
            <ImageBackground style={styles.container} source={require("../assets/background2.png")} >
            <SafeAreaView>
                <Text style={{ paddingLeft: 20, fontSize: 30, fontWeight: '600', color: '#fff',marginBottom: '5%'}}>Reservations</Text>
                <Calendar style={{paddingTop : 20}} 
                theme={{
                    // backgroundColor: '#ff0000',
                    calendarBackground: '#111219',
                    // textSectionTitleColor: '#ffffff',
                    // textSectionTitleDisabledColor: '#d9e1e8',
                }}
                    minDate={'2021-04-30'}
                    onDayPress={this.onDayPress}
                    hideExtraDays={true}
                    firstDay={1}
                    markedDates = {this.state.markedDates}
                   
                

          /> 
                
            </SafeAreaView>
          </ImageBackground>
            
        )
    }
    

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  })

export default ReservationScreen;