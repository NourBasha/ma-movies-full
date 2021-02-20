import {PASSWORD_RECOVERED_SAGA, PASSWORD_RECOVERED , SEND_RECOVERY_EMAIL_SAGA} from '../actions/action_types';

import {put,takeEvery} from 'redux-saga/effects';
import axios from 'axios';



function* setState (action) {

    console.log('client, saga, setting pass to loading : ', action.payload );


     yield put({type:PASSWORD_RECOVERED, payload: action.payload});
}

function* sendRecoveryEmail (action) {

    console.log('client, saga, email : ', action.payload.email );


    const res = yield axios.post('/api/recover-password',{email:action.payload.email});

    console.log('client, saga, res : ', res );

    if(res.data){
        if(res.data.message==='done'){
            console.log('client, saga, message done ' );

              yield put({type:PASSWORD_RECOVERED, payload: true});
        }
    }else{
        console.log('client, saga, message failed ' );

        yield put({type:PASSWORD_RECOVERED, payload: false});
    }

}


export function* watchPassword () { 
    yield takeEvery(PASSWORD_RECOVERED_SAGA,setState);
    yield takeEvery(SEND_RECOVERY_EMAIL_SAGA,sendRecoveryEmail);
}