import {all, fork } from 'redux-saga/effects';
import {watchEmailUser} from './emailAuth';
import {watchUser} from './currentUser';
import { watchMovie } from './movie';
import { watchSubs } from './subscribe';
import { watchPassword } from './passwordRecover';


function* rootSaga() {
    yield all(
        [
            fork(watchEmailUser),
            fork(watchUser),
            fork(watchMovie),
            fork(watchSubs),
            fork(watchPassword)
        ]
    )
}

export default rootSaga;