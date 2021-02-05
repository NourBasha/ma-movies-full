import {all, fork } from 'redux-saga/effects';
import {watchSignUp} from './signup';
import {watchUser} from './googleUser';


function* rootSaga() {
    yield all(
        [
            fork(watchSignUp),
            fork(watchUser)
        ]
    )
}

export default rootSaga;