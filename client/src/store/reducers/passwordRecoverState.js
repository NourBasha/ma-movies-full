
import {PASSWORD_RECOVERED, PASSWORD_UPDATED} from '../actions/action_types';

const initialState = {
    pass : '',
    passwordUpdated: ''
}


export const PasswordRecoveredState = (state = initialState, action) => {

    switch (action.type) {
        case PASSWORD_RECOVERED:
            return{
                ...state,
                pass : action.payload
            }
        case PASSWORD_UPDATED:
            return{
                ...state,
                passwordUpdated : action.payload
            }
    
        default:
            return state ;
    }

} 
