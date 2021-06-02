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
}
export default new OrderService