import {
  CURRENT_APP_USER,
  CURRENT_APP_USER_SAGA,
  CURRENT_APP_USER_LOGIN_SAGA,
  SIGNUP_STATE,
  LOGIN_STATE,
} from "../actions/action_types";
import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

// import {store} from '../../index';
// import {setLoginState} from '../actions/actions';

function* signUpSuccess(action) {
  if (action) {
    const { email, password, username } = action.payload;

    let result = "";

    const user = { email, password, username };

    yield axios
      .post("/api/authenticate/signup", user)
      .then((res) => {
        result = res;
      })
      .catch((err) => {
       
      });

    if (result) {
      yield put({ type: CURRENT_APP_USER, payload: result.data });
      yield put({ type: SIGNUP_STATE, payload: true });
      return;
    }

    
      yield put({ type: CURRENT_APP_USER, payload: false });
      yield put({ type: SIGNUP_STATE, payload: false });
    
  }
}
function* login(action) {
  if (action) {
    const { email, password } = action.payload;

    let result = "";

    yield axios
      .post("/api/authenticate/login", { username: email, password: password })
      .then((res) => {
        result = res.data;
      })
      .catch((err) => {
        console.log("error is: ", err);
      });

    if (result) {
      const { password, ...user } = result;
      yield put({ type: CURRENT_APP_USER, payload: user });
      yield put({ type: LOGIN_STATE, payload: true });
      return;
    }

    yield put({ type: CURRENT_APP_USER, payload: false });
    yield put({ type: LOGIN_STATE, payload: false });
  }
}

export function* watchEmailUser() {
  yield takeEvery(CURRENT_APP_USER_SAGA, signUpSuccess);
  yield takeEvery(CURRENT_APP_USER_LOGIN_SAGA, login);
}
