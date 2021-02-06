
import {LOGIN_STATE} from '../actions/action_types';

const initialState = {
    login : null
}


export const LoginState = (state = initialState, action) => {

    switch (action.type) {
        case LOGIN_STATE:
            return{
                ...state,
                login : action.payload
            }
    
        default:
            return state ;
    }

} 
