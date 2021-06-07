import axios from 'axios'
import { SERVER_IP } from '@env';
import * as SecureStore from "expo-secure-store"

class OrderService{

    ordertovalidate = async () => {
        const token = await SecureStore.getItemAsync('secure_token')
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        return await axios.get(SERVER_IP + '/api/orderToValidate', config)
        .then(async (response) => {
            return response
        })
        .catch((err) => {
            return err.response
        })
    }

    orderDetails = async (id) => {
        const token = await SecureStore.getItemAsync('secure_token')
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        return await axios.get(SERVER_IP + '/api/orderDetails/'+id,config)
        .then(async (response) => {
            return response
        })
        .catch((err) => {
            return err.response
        })
    }
    validateOrders = async (id) => {
        const token = await SecureStore.getItemAsync('secure_token')
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        data = {id : id}
        return await axios.post(SERVER_IP + '/api/validateOrders/',data,config)
        .then(async (response) => {
            return response
        })
        .catch((err) => {
            return err.response
        })
    }
    ordersForStaff = async () => {
        const token = await SecureStore.getItemAsync('secure_token')
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        return await axios.get(SERVER_IP + '/api/ordersForStaff',config)
        .then(async (response) => {
            return response
        })
        .catch((err) => {
            return err.response
        })
    }

    itemsReady = async (order_id) => {
        const token = await SecureStore.getItemAsync('secure_token')
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        data={order_id :order_id}
        return await axios.post(SERVER_IP + '/api/itemsReady',data,config)
        .then(async (response) => {
            return response
        })
        .catch((err) => {
            return err.response
        })
    }

    createOrder = async(data) =>{
    const token = await SecureStore.getItemAsync('secure_token')
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    return await axios.post(SERVER_IP + '/api/createOrder', data, config)
    .then(response => {
      return response
    })
    .catch(err => {
      return err.response
    })
    }

    orderReady = async () => {
        const token = await SecureStore.getItemAsync('secure_token')
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        return await axios.get(SERVER_IP + '/api/orderReady', config)
        .then(async (response) => {
            return response
        })
        .catch((err) => {
            return err.response
        })
    }

    deliverOrders = async (id) => {
        const token = await SecureStore.getItemAsync('secure_token')
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        data = {id : id}
        return await axios.post(SERVER_IP + '/api/deliverOrders/',data,config)
        .then(async (response) => {
            return response
        })
        .catch((err) => {
            return err.response
        })
    }

    orderDelivered = async () => {
        const token = await SecureStore.getItemAsync('secure_token')
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        return await axios.get(SERVER_IP + '/api/orderDelivered', config)
        .then(async (response) => {
            return response
        })
        .catch((err) => {
            return err.response
        })
    }
}
export default new OrderService