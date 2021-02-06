const mongoose = require('mongoose');

const {Schema} = mongoose; 


const userWithEmail = new Schema({
        email : String,
        password: String 
})


mongoose.model('app_users', userWithEmail);