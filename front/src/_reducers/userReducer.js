import {LOGIN_USER, LOGOUT_USER, AUTH_USER} from "../_actions/types";

const userReducer = (state={},action) => {
    switch(action.type){
        case LOGIN_USER:
            return {...state, loginSuccess:action.payload};
        case LOGOUT_USER:
            return {...state, success:action.payload};
        case AUTH_USER:
            return {...state, success:action.payload};
        default:
            return state;
    }
}
export default userReducer;