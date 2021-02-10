import { combineReducers } from "redux";
import { HomeLoadingReducer } from "./home_loading_reducer";
import {BrowseLoadingReducer  } from "./browse_loading_reducer";
import { FilterOnReducer } from "./filter_on";
import { FilterTypesReducer } from "./filter_type";
import { BrowseResponseReducer } from "./browse_response";
import { HomeResponseReducer } from "./home_response";



import UserAuthReducer from "./userAuth";

import AuthenticationReducer from "./authenticationReducer";

import { LoginState } from "./loginState";



 const rootReducer = combineReducers({
        homeLoading : HomeLoadingReducer,
        browseLoading: BrowseLoadingReducer,
        filterOn : FilterOnReducer,
        filterTypes : FilterTypesReducer,
        browseResponse: BrowseResponseReducer,
        homeResponse : HomeResponseReducer,
        userAuth : UserAuthReducer,

        auth: AuthenticationReducer,
        loginState : LoginState 
})

export default rootReducer;