"use server"
import axios from 'axios'

export async function compileCode(data:any) {
    const endpoint = 'https://emkc.org/api/v2/piston/execute';
   

    try{
        const response = await axios.post(endpoint,data);
        console.log('Response:', response.data)
        return response.data;
    }catch(error){
        console.error(error);
        
    }
}