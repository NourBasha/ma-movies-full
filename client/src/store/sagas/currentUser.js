import {put, takeEvery} from 'redux-saga/effects';
import {CURRENT_APP_USER,
  CURRENT_USER_SAGA, 
  USER_LOGOUT_SAGA} from '../actions/action_types';

import axios from 'axios';

 
 function* getUser () {
   
  console.log('inside getting user!!');

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
  console.log(action.payload);

   const history = action.payload;


  const res = yield axios.get('/api/logout'); 
      console.log('logout res : ', res.data);
        if (res.data.message === 'done'){
          yield put({type:CURRENT_APP_USER, payload: false });
          history.push('/');
        }
}



export function* watchUser () {

  yield  takeEvery(CURRENT_USER_SAGA,getUser);
  yield  takeEvery(USER_LOGOUT_SAGA,logout);
}