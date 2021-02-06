import { CURRENT_APP_USER} from '../actions/action_types';

const initialState ={
    user : null
}


const SignupReducer = (state = initialState, action)=>{
    switch (action.type) {
        case CURRENT_APP_USER:
            return{
                ...state,
                users : action.payload || false
            }
        default:
           return state
    }
}
export default SignupReducer;