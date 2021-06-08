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


class OrdersDetailsScreenStaff extends React.Component {
    constructor(){
        super();
        this.state = {
            items: [],
        }
      }
      
      handleSubmit = async(id) =>{
        await OrderService.itemsReady(id).then(async(res) =>{
            if(res.status === 200){
                Toast.show({
                    text1: 'Succès',
                    text2: "La commande a été validée "
                });
                this.props.route.params.reload()
                this.props.navigation.navigate('OrdersForStaff')
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
        });
      }
    
      componentWillUnmount() {
        this._unsubscribe();
      }
    
         render(){
          const items = this.props.route.params.orderDetails;
          const numOrder = this.props.route.params.numOrder
          const order_id = this.props.route.params.id
            return(
                <View style={styles.container}>
                <ScrollView>
                <BackButton goBack={this.props.navigation.goBack}/>
                  <Text style={styles.title}>Commande N°{numOrder}</Text>

                <View style={{marginTop: 40}}>
                <FlatList style={styles.data}
                          data={items}
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
                                <Text style={styles.textRowListTitle}>{item.name}</Text>
                              </View>
                              <View style={styles.rightViewItem} flexDirection='row'>
                                <Text style={styles.textRowList}>{item.quantity}</Text>
                              </View>
                          </TouchableOpacity>
                          }
                />
                {items ? (
                  <View style={styles.validation}>
                <Button   color='#111219' style={{width: 350}}
                    mode="outlined" onPress={() =>this.handleSubmit(order_id)} >
                        La commande est prête
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
        marginTop: 50
      },
      })
export default OrdersDetailsScreenStaff;