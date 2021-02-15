import {takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import {DELETE_MOVIE_SAGA,SAVE_MOVIE_SAGA} from '../actions/action_types';







function* saveMovie(action) {
    console.log('client, movie id is : ',action.payload.movie_id );
    const message = yield axios.post('/api/movie', {movie_id : action.payload.movie_id} );
        if (message ==='done'){
            console.log(message);
        }
}

function* deleteMovie(action) {
    console.log('client, movie id is : ',action.payload.movie_id );
    const message = yield axios.delete('/api/movie', {data:{movie_id:action.payload.movie_id}} );
  
        if (message.data.message ==='done'){
            console.log('client , message : ',message);
        }
}




export function* watchMovie (){
   yield takeEvery(SAVE_MOVIE_SAGA,saveMovie);
   yield takeEvery(DELETE_MOVIE_SAGA,deleteMovie);  
}

