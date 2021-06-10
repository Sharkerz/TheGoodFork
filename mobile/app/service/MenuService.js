import axios from 'axios'
import { SERVER_IP } from '@env'
import * as SecureStore from "expo-secure-store"



class MenuService{
    
    getCategories = async () => {
        const token = await SecureStore.getItemAsync('secure_token')
        const config = {
            headers: {
                Authorization: `Bearer ${token}` ,
                'Content-Language': 'fr'
            }

        }
        return await axios.get(SERVER_IP + '/api/getCategories', config)
        .then(async (response) => {
            return response
        })
        .catch((err) => {
            return err.response
        })
    }
    
    
    getMenuItems = async () => {
    const token = await SecureStore.getItemAsync('secure_token')
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return await axios.get(SERVER_IP + '/api/getItems', config)
    .then(async (response) => {
        return response
    })
    .catch((err) => {
        return err.response
    })
    }

    
}
export default new MenuService