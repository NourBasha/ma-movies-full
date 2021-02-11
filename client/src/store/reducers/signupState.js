
import {SIGNUP_STATE} from '../actions/action_types';

const initialState = {
    signup : null
}


export const SignUpState = (state = initialState, action) => {

    switch (action.type) {
        case SIGNUP_STATE:
            return{
                ...state,
                signup : action.payload
            }
    
        default:
            return state ;
    }

} 
