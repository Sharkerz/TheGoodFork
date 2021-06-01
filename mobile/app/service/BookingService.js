import axios from 'axios'
import { SERVER_IP } from '@env';
import * as SecureStore from "expo-secure-store"

class BookingService{

    create = async (Infos) => {
        const token = await SecureStore.getItemAsync('secure_token')
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        return await axios.post(SERVER_IP + '/api/createBooking',Infos, config)
        .then(async (response) => {
            return response
        })
        .catch((err) => {
            return err.response
        })
    }
}
export default new BookingService