import {
  CURRENT_APP_USER,
  CURRENT_APP_USER_SAGA,CURRENT_APP_USER_LOGIN_SAGA
} from "../actions/action_types";
import { put, takeEvery } from "redux-saga/effects";
import axios from 'axios'; 

import {store} from '../../index';
import {setLoginState} from '../actions/actions';


function* signUpSuccess(action) {
 
 

  if (action) {


          const {email, password, username} = action.payload;

          console.log('payload',action.payload);
          console.log('emai is : ', email);
          console.log('password is : ', password);
          console.log('username is : ', username);

          let result = '';

            const user = {email,password, username}
          
     yield  axios.post('/api/authenticate/signup',user)
              .then(res=>{
                console.log('res is : ',res);
                result = res ;
              })
              .catch(err=>{
                console.log('error is : ',err);
              })

              if(result){
                yield put({ type: CURRENT_APP_USER, payload: result.data });
                return;
              }
              
              yield put({ type: CURRENT_APP_USER, payload:{} });
  }


}
function* login(action) {
 
console.log('store is : ', store);

  if (action) {


          const {email, password} = action.payload;

          let result = '';

          const user = {username:email,password:password}

          console.log('client, user is : ', user);

     yield  axios.post('/api/authenticate/login',user)
              .then(res=>{
                result = res ;
                console.log('res is :', res);
              

                 store.dispatch(setLoginState(true));
              })
              .catch(err=>{
                  console.log('error is :', err);
                  store.dispatch(setLoginState(false));
              })

              if(result){
                yield put({ type: CURRENT_APP_USER, payload: result.data });
                return;
              }
              
              yield put({ type: CURRENT_APP_USER, payload:{} });
  }


}


export function* watchEmailUser() {
  yield takeEvery(CURRENT_APP_USER_SAGA, signUpSuccess);
  yield takeEvery(CURRENT_APP_USER_LOGIN_SAGA, login);
}