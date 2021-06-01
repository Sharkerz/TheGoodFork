import axios from 'axios'
import { SERVER_IP } from '@env';
import * as SecureStore from "expo-secure-store";

class ProfileService{
    data;

    Edit = async(name,email, password, password_confirmation) =>{
        if(password === "" && password_confirmation === "") {
            this.data = {
                name: name,
                email: email,
            }
        }
        else {
            this.data = {
                name: name,
                email: email,
                password: password,
                password_confirmation: password_confirmation,
            }
        }
        const token = await SecureStore.getItemAsync('secure_token')
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        return await axios.post(SERVER_IP + '/api/edit_profile', this.data, config)
            .then(response => {
                return response
            })
            .catch(err => {
                return err.response
            })
    }
    
}
export default new ProfileService