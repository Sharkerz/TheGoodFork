import axios from 'axios'
import { SERVER_IP } from '@env';

class ProfileService{

    Edit = async(name,email, password, password_confirmation) =>{
        return await axios.post(SERVER_IP + '/api/edit_profile', {
            name: name,
            email: email,
        })
            .then(response => {
                return response
            })
            .catch(err => {
                return err.response
            })
    }
    
}
export default new ProfileService