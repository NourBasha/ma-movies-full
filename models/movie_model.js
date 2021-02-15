
const mongoose = require('mongoose');
const {Schema} = mongoose;


const movie = new Schema({
    movie_id: Number,
    _user : {
        type: Schema.Types.ObjectId, ref: 'user_model'
    }
})


mongoose.model('movies',movie);





