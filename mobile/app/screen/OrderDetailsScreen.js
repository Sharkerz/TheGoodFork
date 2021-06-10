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
import Button from '../components/Button';
import BackButton from '../components/BackButton'
import Toast from 'react-native-toast-message';


class OrdersDetailsScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            items: [],
        }
      }
      getOrderDetails = async(item) =>{
        await OrderService.orderDetails(item).then(async(res) =>{
          if(res.status === 200){
              this.setState({orderDetails : res.data.orderDetails})
          }else{
              console.log(res)
          }
         
     }) 
      }
      
      handleSubmit = async(id,key) =>{
        if(key ===1){
          await OrderService.validateOrders(id).then(async(res) =>{
            if(res.status === 200){
                Toast.show({
                    text1: 'Succès',
                    text2: "La commande a été validée "
                });
                this.props.navigation.navigate('Orders')
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
        else if(key ===2) {
          await OrderService.deliverOrders(id).then(async(res) =>{
            if(res.status === 200){
                Toast.show({
                    text1: 'Succès',
                    text2: "La commande a été livrée "
                });
                this.props.navigation.navigate('Orders')
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

        
    }
    
      componentDidMount(){
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
          this.getOrderDetails(this.props.route.params.item.id);
        });
      }
    
      componentWillUnmount() {
        this._unsubscribe();
      }
    
         render(){
          const item = this.props.route.params.item;
          const key = this.props.route.params.key;
            return(
                <View style={styles.container}>
                <ScrollView>
                <BackButton goBack={this.props.navigation.goBack}/>
                  <Text style={styles.title}>Commande N°{item['numOrder']}</Text>

                <View style={{marginTop: 5}}>
                <FlatList style={styles.data}
                          data={this.state.orderDetails}
                          keyExtractor={item => item.id.toString()}
                          renderItem={({item}) => 
                          
                          <TouchableOpacity style={styles.item}>
                              <View style={styles.leftViewItem} flexDirection='row'>
                                <Image
                                  source={{ uri: SERVER_IP + '/Images/MenuItem/'+ item.image }}
                                  resizeMode="cover"
                                  style={{
                                      width: 70,
                                      height: 70,
                                  }}/>
                                  { key == 3 ? (
                                <Text style={styles.textRowListTitle}>{item.name} ({item.price.toFixed(2)}€) :</Text>
                                  ) : <Text style={styles.textRowListTitle}>{item.name}</Text>
                                  }
                              </View>
                              <View style={styles.rightViewItem} flexDirection='row'>
                                <Text style={styles.textRowList}>{item.quantity}</Text>
                              </View>
                          </TouchableOpacity>
                          }
                />
                {this.state.orderDetails && key == 1 ? (
                <View style={styles.validation}>
                <Button color='#111219' style={{width: 350}}
                    mode="outlined" onPress={() =>this.handleSubmit(item.id,key)} >
                        Valider
                </Button>
                </View>
            ) : this.state.orderDetails && key == 2 ?(<View style={styles.validation}>
              <Button color='#111219' style={{width: 350}}
                  mode="outlined" onPress={() =>this.handleSubmit(item.id,key)} >
                      Commande donnée
              </Button>
              </View>) : null }
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
          marginTop: Platform.OS === 'ios' ? 70 : 50,
          fontSize: 30,
          fontWeight: '600',
          color: '#fff',
          textAlign: 'center',
          marginLeft: 85,
          marginRight: 85
        },
        item: {
          padding: 16,
          marginVertical: 1,
          marginHorizontal: 0,
          borderBottomColor: '#343434',
          borderBottomWidth: 0.2,
          flexDirection: 'row',
          color: '#fff',
          justifyContent: 'center'
        },
        textRowList: {
          color: '#FFFF',
          fontSize: 25,
        },
        textRowListTitle: {
          width: 200,
          color: '#FFFF',
          fontSize: 18,
          fontWeight: '600',
          marginLeft: 10,
        },
        leftViewItem: {
          justifyContent: 'center',
          alignItems: 'center'
        },
        rightViewItem: {
          flex: 1,
          // justifyContent: 'center',
          alignItems: 'center',
          justifyContent: 'flex-end'
        },
        validation: {
          alignItems :'center',
          marginTop: '4%',
          marginBottom : '20%'
        },
      })
export default OrdersDetailsScreen;