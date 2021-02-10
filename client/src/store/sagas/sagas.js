import {all, fork } from 'redux-saga/effects';
import {watchEmailUser} from './emailAuth';
import {watchUser} from './currentUser';


function* rootSaga() {
    yield all(
        [
            fork(watchEmailUser),
            fork(watchUser)
        ]
    )
}

export default rootSaga;