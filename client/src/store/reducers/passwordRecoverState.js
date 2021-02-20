
import {PASSWORD_RECOVERED} from '../actions/action_types';

const initialState = {
    pass : ''
}


export const PasswordRecoveredState = (state = initialState, action) => {

    switch (action.type) {
        case PASSWORD_RECOVERED:
            return{
                ...state,
                pass : action.payload
            }
    
        default:
            return state ;
    }

} 
