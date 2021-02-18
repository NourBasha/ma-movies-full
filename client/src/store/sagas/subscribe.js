import {put,takeEvery} from 'redux-saga/effects';
import {SUBSCRIBE_SAGA,SUBSCRIBE_SUCCESS} from '../actions/action_types';
import axios from 'axios';



function* subscribe (action) {

    let result = '';
   

    yield axios.post('/api/subscribe', {email: action.payload.email} )
    .then(res =>{
        console.log('client, res sub : ', res);
        if(res.data){
             result = res.data
        }
    })
    .catch(err=>{
        console.log('client, error sub, err : ',err);
    })


    if(result){
      return  yield  put({type:SUBSCRIBE_SUCCESS, payload: true});
    }

    yield put({type:SUBSCRIBE_SUCCESS, payload: false});


}


export function* watchSubs () { 
    yield takeEvery(SUBSCRIBE_SAGA,subscribe);
}