const mongoose = require('mongoose');

const {Schema} = mongoose; 


const user = new Schema({
    googleId : String,
    email: String,
    password: String,
    displayName: String
}); 

mongoose.model('users',user);

