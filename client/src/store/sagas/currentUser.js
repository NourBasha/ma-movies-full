import {put, takeEvery} from 'redux-saga/effects';
import {CURRENT_APP_USER,
  CURRENT_USER_SAGA, 
  USER_LOGOUT_SAGA} from '../actions/action_types';

import axios from 'axios';

 
 function* getUser () {

    const user =  yield  axios.get('/api/current-user');    

    if(user){
      return  yield put({type:CURRENT_APP_USER,payload: user.data });
    }

    yield put({type:CURRENT_APP_USER,payload: {} });

}

function* logout() {

  console.log('inside logout generator func : ');

  const res = yield axios.get('/api/logout'); 
      console.log('logout res : ', res.data);
        if (res.data.message === 'done'){
          yield put({type:CURRENT_APP_USER, payload: {} });
        }
 
}

export function* watchUser () {

  yield  takeEvery(CURRENT_USER_SAGA,getUser);
  yield  takeEvery(USER_LOGOUT_SAGA,logout);
}