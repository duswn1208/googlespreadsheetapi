import axios from 'axios';
import { envConfig } from "./config";

export const getVacation = (url,name) => {
    return new Promise(function(resolve){
        let params = new URLSearchParams();
        params.append("name",name);
        axios
            .post(envConfig.baseUrl+url,params)
            .then((res)=>{
                resolve(res);
            }).catch((error)=>{
                console.log(error.response);
            });
        });
}