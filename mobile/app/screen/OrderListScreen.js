import React, {Component} from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity, Platform, Text } from 'react-native';
import OrderService from "../service/OrderService";
import moment from "moment";
import 'moment/locale/fr';

class OrderListScreen extends Component {
    constructor() {
        super();
        this.state = {
            listOrder: []
        }
    }

    loadData = () => {
        OrderService.getOrderWaiting().then((res) => {
            this.setState({listOrder: Object.values(res.data.orders)})
        })
    }

    componentDidMount() {
        moment.locale('fr');
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
            <View style={styles.container} >
                <Text style={styles.title}>Commandes en cours</Text>
                <FlatList style={styles.list}
                        data={this.state.listOrder}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) =>
                            {
                                const date = moment(item.created_at).format('Do MMMM h:mm');
                                return <TouchableOpacity style={styles.item} onPress={() => {
                                    this.props.navigation.navigate('Success', {
                                        orderId: item.id,
                                    });}
                                }>
                                    <View style={styles.leftViewItem}>
                                        <Text style={styles.textRowList}>Commande n° {item.numOrder}</Text>
                                    </View>
                                    <View style={styles.rightViewItem}>
                                        <Text style={styles.textRowList}>{date}</Text>
                                    </View>
                                </TouchableOpacity>
                            }
                        }
                />
            </View>
        );
    }
}

export default OrderListScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111219',
    },
    list: {
        marginBottom: '20%',
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
    title : {
        marginTop: Platform.OS === 'ios' ? 60 : 40,
        paddingLeft: 20,
        fontSize: 30,
        fontWeight: '600',
        color: '#fff'
    },
    textRowList: {
        color: '#FFFF',
        fontSize: 17,
    },
})