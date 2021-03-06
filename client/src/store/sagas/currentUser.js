import {call, put, takeEvery} from 'redux-saga/effects';
import {CURRENT_APP_USER,
  CURRENT_USER_SAGA, 
  USER_LOGOUT_SAGA,
  DELETE_ACCOUNT_SAGA} from '../actions/action_types';

import axios from 'axios';
import history from '../../utils/history';
 
 function* getUser () {
   

    let user =  yield axios.get('/api/current-user');    

    if(user){
      if(user.data.password){ // if res contains password eliminate the password
        const {password, ...cleanUser } = user.data;
        return  yield put({type:CURRENT_APP_USER,payload: cleanUser });
      }
      return  yield put({type:CURRENT_APP_USER,payload: user.data });
    }

    yield put({type:CURRENT_APP_USER,payload: {} });

}

function* logout(action) {

   const history = action.payload;


  const res = yield axios.get('/api/logout'); 
        if (res.data.message === 'done'){
          yield put({type:CURRENT_APP_USER, payload: false });
          history.push('/');
        }
}

function* deleteAcc (){

   const user = yield axios.delete('/api/delete-account',{data:{}});
   if(user.data){
     if(user.data.message==='done'){
      yield put({type:CURRENT_APP_USER,payload: false });
      yield call(forwardTo,'/');
     }
   }
}

function forwardTo (loc){
  history.push(loc);
}

export function* watchUser () {

  yield  takeEvery(CURRENT_USER_SAGA,getUser);
  yield  takeEvery(USER_LOGOUT_SAGA,logout);
  yield  takeEvery(DELETE_ACCOUNT_SAGA,deleteAcc);
}
