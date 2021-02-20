import { combineReducers } from "redux";
import { HomeLoadingReducer } from "./home_loading_reducer";
import {BrowseLoadingReducer  } from "./browse_loading_reducer";
import { FilterOnReducer } from "./filter_on";
import { FilterTypesReducer } from "./filter_type";
import { BrowseResponseReducer } from "./browse_response";
import { HomeResponseReducer } from "./home_response";
import { SubscribeSuccess } from "./subscribeSuccess";




import AuthenticationReducer from "./authenticationReducer";

import { LoginState } from "./loginState";
import { SignUpState } from "./signupState";
import { PasswordRecoveredState } from "./passwordRecoverState";

import {reducer} from 'redux-form';



 const rootReducer = combineReducers({
        homeLoading : HomeLoadingReducer,
        browseLoading: BrowseLoadingReducer,
        filterOn : FilterOnReducer,
        filterTypes : FilterTypesReducer,
        browseResponse: BrowseResponseReducer,
        homeResponse : HomeResponseReducer,
        auth: AuthenticationReducer,
        loginState : LoginState,
        signupState : SignUpState,
        subSuccess : SubscribeSuccess,
        passwordRecover : PasswordRecoveredState,
        form : reducer
})

export default rootReducer;