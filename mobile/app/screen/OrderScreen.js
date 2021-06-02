import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    Platform
} from 'react-native';
import { SERVER_IP } from '@env';
import { ScrollView } from 'react-native';
import OrderService from '../service/OrderService'


class OrderScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            items: [],
        }
        this.getOrders = this.getOrders.bind(this)
      }
      getOrders = async() =>{
        await OrderService.ordertovalidate().then(async(res) =>{
            if(res.status === 200){
                // console.log(res.data.ordertovalidate)
                this.setState({ordertovalidate : res.data.ordertovalidate})
            }else{
                console.log(res)
            }
           
       })  
      }
    

      componentDidMount(){
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
          this.getOrders();
        });
      }
    
      componentWillUnmount() {
        this._unsubscribe();
      }
    
         render(){
            return(
                <View style={styles.container}>
                <ScrollView>
                <Text style={styles.title}>Commandes</Text>
                <View>
                <FlatList style={styles.data}
                          data={this.state.ordertovalidate}
                          keyExtractor={item => item.id.toString()}
                          renderItem={({item}) => 
                          
                          <TouchableOpacity style={styles.item} onPress={() => 
                            this.props.navigation.navigate('OrdersDetails', {
                              item,
                          }
                          )}>
                              <View style={styles.leftViewItem} flexDirection='row'>
                                <Text style={styles.textRowListTitle}>Commande {item['numOrder']}</Text>
                              </View>
                          </TouchableOpacity>
                          }
                />
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
      })

export default OrderScreen;