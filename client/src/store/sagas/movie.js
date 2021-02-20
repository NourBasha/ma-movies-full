import {takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import {DELETE_MOVIE_SAGA,SAVE_MOVIE_SAGA} from '../actions/action_types';







function* saveMovie(action) {
    yield axios.post('/api/movie', {movie_id : action.payload.movie_id} );     
}

function* deleteMovie(action) {
     yield axios.delete('/api/movie', {data:{movie_id:action.payload.movie_id}} );  
}




export function* watchMovie (){
   yield takeEvery(SAVE_MOVIE_SAGA,saveMovie);
   yield takeEvery(DELETE_MOVIE_SAGA,deleteMovie);  
}

