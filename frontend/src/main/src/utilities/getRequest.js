import axios from 'axios'

import {API_SERVER} from './constants';

const getRequest = (endpoint, cancelSource) =>{
    const request = async () => {
        const cancelToken = cancelSource.token
        const options = {
            url: `${API_SERVER}${endpoint}`,
            method: 'GET',            
            cancelToken
        };
        let result
        try{
            result = await axios(options)
        } catch (err){
            if (axios.isCancel(err)) return
            return err
        }
        return result 
    }
    
    return request
}

export default getRequest