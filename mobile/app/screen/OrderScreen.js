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
import Button from '../components/Button';
import OrderService from '../service/OrderService'

const data = [
  {
    key : 1,
    title: "something"
  },
  {
    key : 2,
    title: "something two"
  },
  {
    key : 3,
    title: "something three"
  }
];
class OrderScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            items: [],
            data : data
        }
        this.getOrders = this.getOrders.bind(this)
      }
      getOrders = async() =>{
        await OrderService.ordertovalidate().then(async(res) =>{
            if(res.status === 200){
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
                <ScrollView style={{height : '90%'}}>
                <Text style={styles.title}>Commandes à valider</Text>
                <View style={{marginTop: 15}}>
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
                                <Text style={styles.textRowListTitle}>Commande N°{item['numOrder']}</Text>
                              </View>
                          </TouchableOpacity>
                          }
                />
                </View>
                {/* <View style={styles.validation}>
                <Button color='#111219' style={{width: 350}}
                    mode="outlined" onPress={() =>this.handleSubmit(item.id)} >
                        Voir les commandes en cours
                </Button>
                </View> */}
              </ScrollView>
              <FlatList style={{backgroundColor : 'red',marginBottom : '20%', height : 60,width : '100%'}}
                  horizontal
                  scrollEnabled={false}
                  data={this.state.data}
                  renderItem={({ item: rowData }) => {
                    return (
                        
                        <TouchableOpacity  color='#111219' style={{ justifyContent: "center",
                        backgroundColor: "#DDDDDD",
                        padding: 10}}
                        onPress={() =>console.log(rowData.key)}>
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

export default OrderScreen;