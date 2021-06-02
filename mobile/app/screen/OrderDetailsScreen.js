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
      
      handleSubmit = async(id) =>{
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
            return(
                <View style={styles.container}>
                <ScrollView>
                <Text style={styles.title}>Commande :{item['N°Commande']}</Text>
                <View>
                <FlatList style={styles.data}
                          data={this.state.orderDetails}
                          keyExtractor={item => item.id.toString()}
                          renderItem={({item}) => 
                          
                          <TouchableOpacity style={styles.item}>
                            {/* <Text style={{'color': 'white'}}>{item.name + " quantité : " + item.quantité.toString()}</Text> */}
                              <View style={styles.leftViewItem} flexDirection='row'>
                                <Image
                                  source={{ uri: SERVER_IP + '/Images/MenuItem/'+ item.image }}
                                  resizeMode="cover"
                                  style={{
                                      width: 70,
                                      height: 70,
                                  }}/>
                                <Text style={styles.textRowListTitle}>{item.name}</Text>
                              </View>
                              <View style={styles.rightViewItem} flexDirection='row'>
                                <Text style={styles.textRowList}>{item.quantité}</Text>
                              </View>
                          </TouchableOpacity>
                          }
                />
                {this.state.orderDetails ? (
                  <View style={styles.button}>
                <Button   color='#111219'
                    mode="outlined" onPress={() =>this.handleSubmit(item.id)} >
                        Valider
                </Button>
                </View>
            ) : null }
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
        },
        leftViewItem: {
          justifyContent: 'center',
          alignItems: 'flex-start',
          textAlignVertical: 'center'
        },
        rightViewItem: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'flex-end',
        },button: {
          width: 200,
          margin :'auto',
          alignItems :'center',
          justifyContent :'center'
        },
      })
export default OrdersDetailsScreen;