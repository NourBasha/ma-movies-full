import {put, takeEvery} from 'redux-saga/effects';
import {GOOGLE_USER,GOOGLE_USER_SAGA} from '../actions/action_types';

import axios from 'axios';

 
 function* getGoogleUser () {

    const user =  yield  axios.get('/api/current-user');    

    yield put({type:GOOGLE_USER,payload: user });

}

export function* watchUser () {

  yield  takeEvery(GOOGLE_USER_SAGA,getGoogleUser);
}