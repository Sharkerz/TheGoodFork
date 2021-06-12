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

const data = [
  {
    key : 1,
    title: "A valider"
  },
  {
    key : 2,
    title: "Prête"
  },
  {
    key : 3,
    title: "A Payer"
  }
];
class OrderScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            items: [],
            data : data,
            key : 1,
            orders : []
        }
        this.getOrders = this.getOrders.bind(this)
      }
      getOrders = async(key) =>{
        if(key === 1) {
          await OrderService.ordertovalidate().then(async(res) =>{
            if(res.status === 200){
                this.setState({orders : res.data.ordertovalidate})
                this.setState({ordernotdefined : false})
            }else{
              this.setState({orders : []})
              this.setState({ordernotdefined : false})
            }
       })  
        }
        else if(key ===2){
          await OrderService.orderReady().then(async(res) =>{
            if(res.status === 200){
                this.setState({orders : res.data.ordersReady})
                this.setState({ordernotdefined : false})
            }else{
              this.setState({orders : []})
              this.setState({ordernotdefined : false})
            }
       })  
        } 
        else{
          await OrderService.orderDelivered().then(async(res) =>{
            if(res.status === 200){
                this.setState({orders : res.data.ordersDelivered})
                this.setState({ordernotdefined : false})
            }else{
              if(res.data.status === 'failed'){
                this.setState({orders : []})
                this.setState({ordernotdefined : false})
              }
            }
          })  
        }
      }
    

      componentDidMount(){
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
          this.getOrders(this.state.key);
          this.timer = setInterval(()=> this.getOrders(this.state.key), 10000)
        });
      }
    
      componentWillUnmount() {
        this._unsubscribe();
      }

      changeData = async(key) =>{
        this.setState({key : key})
        this.setState({ordernotdefined : true})
          if(key === 1) {
            await OrderService.ordertovalidate().then(async(res) =>{
              if(res.status === 200){
                
                  this.setState({orders : Object.values(res.data.ordertovalidate)})
                  this.setState({ordernotdefined : false})
              }else{
                if(res.data.status === 'failed'){
                  this.setState({orders : []})
                  this.setState({ordernotdefined : false})
                }
              }
            })  
          }
          else if(key ===2){
            await OrderService.orderReady().then(async(res) =>{
              if(res.status === 200){
                  this.setState({orders : Object.values(res.data.ordersReady)})
                  this.setState({ordernotdefined : false})
              }else{
                if(res.data.status === 'failed'){
                  this.setState({orders : []})
                  this.setState({ordernotdefined : false})
                }
              }
            })  
          }
          else{
            await OrderService.orderDelivered().then(async(res) =>{
              if(res.status === 200){
                  this.setState({orders : Object.values(res.data.ordersDelivered)})
                  this.setState({ordernotdefined : false})
              }else{
                if(res.data.status === 'failed'){
                  this.setState({orders : []})
                  this.setState({ordernotdefined : false})
                }
              }
            })  
          }
      }
    
         render(){
            return(
                <View style={styles.container}>
                <ScrollView style={{height : '90%'}}>
                {
                    this.state.key == 1 ? (
                      <Text style={styles.title}>Commandes à valider</Text>
                    ) :  this.state.key == 2 ? ( <Text style={styles.title}>Commandes prête</Text>) :  <Text style={styles.title}>Commandes à payer</Text>
                }
                
                <View style={{marginTop: 15}}>
                <FlatList style={styles.data}
                          data={this.state.orders}
                          keyExtractor={item => item.id.toString()}
                          renderItem={({item}) => 
                          
                          <TouchableOpacity style={styles.item} onPress={() => 
                            this.props.navigation.navigate('OrdersDetails', {
                              item, key : this.state.key
                          }
                          )}>
                              <View style={styles.leftViewItem} flexDirection='row'>
                                <Text style={styles.textRowListTitle}>Commande N°{item['numOrder']}</Text>
                              </View>
                          </TouchableOpacity>
                          }
                />
                </View>
                {this.state.orders.length == 0 && this.state.key == 1 && !this.state.ordernotdefined  ? (
                   <View style={styles.emptyTextView}>
                   <Text style={styles.emptyText}>Aucune commande à valider 😕</Text>
               </View>
                ) : this.state.orders.length == 0 && this.state.key == 2 && !this.state.ordernotdefined  ? (
                <View style={styles.emptyTextView}>
                  <Text style={styles.emptyText}>Aucune commande n'est prête 😕</Text>
              </View>) : this.state.orders.length == 0 && this.state.key ==  3 && !this.state.ordernotdefined ?(
                 <View style={styles.emptyTextView}>
                 <Text style={styles.emptyText}>Aucune commande attend un paiement 😕</Text>
             </View>) : null
                }
              </ScrollView>
              <FlatList style={{marginBottom : '20%', height : '6%',width : '100%',backgroundColor: "#ffffff"}}
                  scrollEnabled={false}
                  legacyImplementation={false}
                  data={this.state.data}
                  numColumns = {3}
                  renderItem={({ item: rowData }) => {
                    return (
                          <TouchableOpacity style={{justifyContent : 'center',alignItems :'center',borderLeftColor : '#000000',borderLeftWidth : 2,height : 50,width : '33%'}} onPress={() =>this.changeData(rowData.key)}>
                            <Text>{rowData.title}</Text>
                          </TouchableOpacity>
                    );
                  }}
                  keyExtractor={item => item.key.toString()}
                />
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
        State: {
          paddingRight: 30,
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
        emptyTextView: {
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          marginTop: '60%'
      },
      emptyText: {
        color: 'white',
        fontSize: 25,
    },
      })

export default OrderScreen;