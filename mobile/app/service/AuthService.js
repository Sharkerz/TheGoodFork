import axios from 'axios'
import { SERVER_IP } from '@env';

class AuthService{

    Register = async(email,name,password) =>{
       return await axios.post(SERVER_IP + '/api/auth/register', {
            email: email,
            name: name,
            password: password,
            password_confirmation: password,
        },
        )
        .then(response => {
            return response
        })
        .catch(err => {
            return err.response
        })
    }

    Login = async(email,password) =>{
        return await axios.post(SERVER_IP + '/api/auth/login', {
            email: email,
            password: password,
        })
            .then(response => {
                return response
            })
            .catch(err => {
                return err.response
            })
    }

    Logout = async() =>{
        return await axios.post(SERVER_IP + '/api/auth/logout')
            .then(response => {
                return response
            })
            .catch(err => {
                return err.response
            })
    }

    
}
export default new AuthService