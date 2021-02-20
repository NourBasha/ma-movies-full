import {PASSWORD_RECOVERED_SAGA, PASSWORD_RECOVERED 
    , SEND_RECOVERY_EMAIL_SAGA, SEND_NEW_PASSWORD_SAGA,
    PASSWORD_UPDATED_SAGA , PASSWORD_UPDATED
} from '../actions/action_types';

import {put,takeEvery} from 'redux-saga/effects';
import axios from 'axios';



function* setState (action) {
     yield put({type:PASSWORD_RECOVERED, payload: action.payload});
}

function* sendRecoveryEmail (action) {



    const res = yield axios.post('/api/recover-password',{email:action.payload.email});


    if(res.data){
        if(res.data.message==='done'){

              yield put({type:PASSWORD_RECOVERED, payload: true});
        }
    }else{

        yield put({type:PASSWORD_RECOVERED, payload: false});
    }

}

function* setNewPassword (action){

    const res = yield axios.post('/api/setNewPassword', action.payload);
     
     if(res.data){
         if(res.data.message==='done'){
           return yield put({type:PASSWORD_UPDATED, payload: true});
         }
     }

    yield put({type:PASSWORD_UPDATED, payload: false});

}

function* setPasswordUpdated (action) {
    yield put({type:PASSWORD_UPDATED, payload: action.payload});
}

export function* watchPassword () { 
    yield takeEvery(PASSWORD_RECOVERED_SAGA,setState);
    yield takeEvery(SEND_RECOVERY_EMAIL_SAGA,sendRecoveryEmail);
    yield takeEvery(SEND_NEW_PASSWORD_SAGA, setNewPassword);
    yield takeEvery(PASSWORD_UPDATED_SAGA, setPasswordUpdated);
}