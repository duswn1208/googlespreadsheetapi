import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authUser } from "../_actions/userAction";

export default function (Component, option) {
    //option
    // null => 아무나 출입가능
    // true => 로그인한 유저만 출입 가능
    // false => 로그인한 유저는 출입 불가능
    function AuthCheck(props) {
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(authUser(window.sessionStorage.getItem("token"))).then((res) => {
                if(res.payload.isAuth){
                    if(!option){
                        window.location.replace("/");
                    }
                }else{
                    if(option){
                        props.history.push("/login");
                    }
                }
            });
        }, []);

        return <Component/>;
    }

    return AuthCheck;
}