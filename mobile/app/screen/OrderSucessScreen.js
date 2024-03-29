import React from 'react'
import { ScrollView } from 'react-native';
import {Text, StyleSheet, View, Platform, TouchableOpacity, Image, FlatList, ActivityIndicator} from 'react-native'
import OrderService from "../service/OrderService";

class OrderSucessScreen extends React.Component{
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            order: {},
            orderItems: {},
            waitingAnimation: true
        }
    }

    loadData = () => {
        OrderService.getOrder(this.props.route.params.orderId).then((res) => {
            this.setState({order: res.data.order})
        })
        OrderService.orderDetails(this.props.route.params.orderId).then((res) => {
            this.setState({orderItems: res.data.orderDetails})
        }).then(() => {
            this.setState({waitingAnimation: false})
        })
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            // Load details user data
            this.loadData()
            this.timer = setInterval(()=> this.loadData(), 10000)
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    render() {
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.waitingView}>
                    <ActivityIndicator size="large" color="#999999" animating={this.state.waitingAnimation}/>
                </View>
                <View style={{alignItems: 'center', marginBottom: 20}}>
                    <Text style={styles.textHome}>Votre commande a bien été prise en compte 🎉 </Text>
                </View>

                <Text style={styles.titleText}>Résumé de votre commande: </Text>
                <View>
                    <FlatList style={styles.data}
                            data={this.state.orderItems}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({item}) =>
                                <TouchableOpacity style={styles.item}>
                                    <View style={styles.leftViewItem}>
                                        <Text style={styles.textRowList}>{item.quantity}x {item.name}</Text>
                                    </View>
                                    <View style={styles.rightViewItem}>
                                        <Text style={styles.textRowList}>{item.price * item.quantity}€</Text>
                                    </View>
                                </TouchableOpacity>
                            }
                    />
                </View>
                <Text style={styles.titleTotalPriceText}>Total:  {this.state.order.prixTotal} €</Text>

                <View style={styles.trackView}>
                    {this.state.order.validated === 0 ?
                        <Text style={styles.statusTrackTextWait}>Commande en attente de validation</Text>
                        :
                        <Text style={styles.statusTrackText}>Commande validée, nous préparons votre commande</Text>
                    }
                </View>
            </ScrollView>
        </View>
    )
}
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#111219",
    },
    textHome: {
        marginTop: Platform.OS === 'ios' ? 80 : 60,
        fontSize: 26,
        textAlign: 'center',
        justifyContent : 'center',
        color: "#fff",
        fontWeight: "600",
        width: '90%',
    },
    titleText: {
        marginTop: 20,
        marginBottom: 20,
        fontSize: 22,
        textAlign: 'center',
        justifyContent : 'center',
        color: "#fff",
        fontWeight: "600",
    },
    titleTotalPriceText: {
        marginTop: 20,
        fontSize: 22,
        textAlign: 'right',
        justifyContent : 'flex-end',
        color: "#fff",
        fontWeight: "600",
        marginRight: '3%'
    },
    item: {
        padding: 16,
        marginVertical: 1,
        marginHorizontal: 0,
        borderBottomColor: '#343434',
        borderBottomWidth: 0.2,
        flexDirection: 'row'
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
    textRowList: {
        color: '#FFFF',
        fontSize: 13,
    },
    waitingView: {
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
        position: 'absolute'
    },
    trackView: {
        marginBottom: 150,
        alignItems: 'center'
    },
    statusTrackText: {
        marginTop: 30,
        fontSize: 20,
        textAlign: 'center',
        justifyContent : 'center',
        color: "#3EA65C",
        fontWeight: "600",
        width: '90%'
    },
    statusTrackTextWait: {
        marginTop: 30,
        fontSize: 20,
        textAlign: 'center',
        justifyContent : 'center',
        color: "#CE731E",
        fontWeight: "600",
        width: '90%'
    }
})

export default OrderSucessScreen