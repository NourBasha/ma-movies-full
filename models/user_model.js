const mongoose = require('mongoose');

const {Schema} = mongoose; 


const user = new Schema({
    googleId : String,
    userEmail: String
}); 

mongoose.model('users',user);

