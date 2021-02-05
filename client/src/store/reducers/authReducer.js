
import {GOOGLE_USER} from '../actions/action_types';

const initialState = {
    user : null
}


export const AuthReducer = (state = initialState, action) => {

    switch (action.type) {
        case GOOGLE_USER:
            return{
                ...state,
                user : action.payload || false
            }
    
        default:
            return state ;
    }

} 