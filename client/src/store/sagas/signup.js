import {
  CURRENT_APP_USER,
  CURRENT_APP_USER_SAGA,
} from "../actions/action_types";
import { put, takeEvery } from "redux-saga/effects";
import axios from 'axios'; 

function* signUpSuccess(action) {
 

  if (action) {


          const {email, password} = action.payload;

          console.log('payload',action.payload);
          console.log('emai is : ', email);
          console.log('password is : ', password);

          let result = '';

            const user = {email,password}
            console.log('user is : ',user);
     yield  axios.post('/api/authenticate/signup',user)
              .then(res=>{
                console.log('res is : ',res);
                result = res ;
              })
              .catch(err=>{
                console.log('error is : ',err);
              })

              if(result){
                yield put({ type: CURRENT_APP_USER, payload: result });
                return;
              }
              
              yield put({ type: CURRENT_APP_USER, payload:{} });
  }


}


export function* watchSignUp() {
  yield takeEvery(CURRENT_APP_USER_SAGA, signUpSuccess);
}
