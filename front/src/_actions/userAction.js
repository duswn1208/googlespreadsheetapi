import {LOGIN_USER, LOGOUT_USER, AUTH_USER} from "./types";
import axios from 'axios';
import { envConfig } from "../config";

export function loginUser(token){
    return new Promise(function(resolve){
        let params = new URLSearchParams();
        params.append("id_token",token);
        axios
            .post(envConfig.baseUrl+"login",params)
            .then((res)=>{
                resolve({
                    type:LOGIN_USER,
                    payload:res.data,   
                });
            }).catch((err)=>{
                console.log(err.response);
            });
    });
}

export function logoutUser(){
    window.sessionStorage.clear();
    return({
        type:LOGOUT_USER,
        payload:{success:true},
    });
}

export function authUser(token){
    return new Promise(function(resolve){
        let params = new URLSearchParams();
        params.append("id_token",token);
        axios
            .post(envConfig.baseUrl+"auth",params)
            .then((res)=>{
                resolve({
                    type:AUTH_USER,
                    payload:res.data,
                });
            }).catch((err)=>{
                console.log(err.response);
            });
    });
}