import React, { Component } from 'react';
import {GoogleLogin} from 'react-google-login';
import { loginUser } from '../../_actions/userAction';

class LoginView extends Component {
    
    constructor(props){
        super(props);
        this.state={
            id:'',
            name:'',
            provider:'',
            id_token: '',
        }
    }

    // Google Login
    responseGoogle = (res) => {
        this.setState({
            id: res.googleId,
            name: res.profileObj.name,
            provider: 'google',
            id_token: res.tokenObj.id_token,
        });
        
        loginUser(this.state.id_token).then((res)=>{
            console.log(res);
            if(res.payload.loginSuccess===true){
                window.sessionStorage.setItem("token",this.state.id_token);
                window.sessionStorage.setItem("userName",res.payload.name);
                window.location.replace('/main');
            }
            
        });
    }

    // Login Fail
    responseFail = (err) => {
        console.error(err);
    }

    render(){
        return (
            <div>
                <GoogleLogin
                    clientId={process.env.REACT_APP_Google}
                    buttonText="Google"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseFail}
                />
            </div>
        );
    }
    
};

export default LoginView;
