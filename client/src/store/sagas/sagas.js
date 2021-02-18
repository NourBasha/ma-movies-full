import {all, fork } from 'redux-saga/effects';
import {watchEmailUser} from './emailAuth';
import {watchUser} from './currentUser';
import { watchMovie } from './movie';
import { watchSubs } from './subscribe';


function* rootSaga() {
    yield all(
        [
            fork(watchEmailUser),
            fork(watchUser),
            fork(watchMovie),
            fork(watchSubs)
        ]
    )
}

export default rootSaga;