import {SUBSCRIBE_SUCCESS} from '../actions/action_types';

const initialState = {
    subSuccess : ''
}

export const SubscribeSuccess = (state = initialState, action) => {
    switch (action.type) {
        case SUBSCRIBE_SUCCESS:
            return{
                ...state,
                subSuccess : action.payload
            }
        default:
            return state ;
    }
} 
