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
import { ScrollView } from 'react-native';
import OrderService from '../service/OrderService'


class OrderScreenStaff extends React.Component {
    constructor(){
        super();
        this.state = {
            orders: [],
        }
      }
      getStaffOrders = async() =>{
        await OrderService.ordersForStaff().then(async(res) =>{
            if(res.status === 200){
                this.setState({orders : res.data.orders})
                this.setState({orderDetails : res.data.oderdetails})
            }else {
                console.log(res)
            }
           
       })  
      }
      componentDidMount(){
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
          this.getStaffOrders();
          this.timer = setInterval(()=> this.getStaffOrders(), 10000)
        });
      }
    
      componentWillUnmount() {
        this._unsubscribe();
      }
    
         render(){
           const orderDetails = this.state.orderDetails
            return(
                <View style={styles.container}>
                <ScrollView>
                <Text style={styles.title}>Commandes à préparer</Text>
                <View style={{marginTop: 15}}>
                <FlatList style={styles.data}
                          data={this.state.orders}
                          keyExtractor={item => item.id.toString()}
                          renderItem={({item}) =>
                          <TouchableOpacity style={styles.item} onPress={() =>
                            this.props.navigation.navigate('OrdersDetailsForStaff', {
                              orderDetails,numOrder : item['numOrder'], id : item['id'], reload : this.getStaffOrders
                          }
                          )}>
                              <View style={styles.leftViewItem} flexDirection='row'>
                                <Text style={styles.textRowListTitle}>Commande N°{item['numOrder']}</Text>
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
        width: 200,
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
      validation: {
        alignItems :'center',
        marginTop: 20,
        marginBottom: 100
      },
  })

export default OrderScreenStaff;