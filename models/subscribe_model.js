const mongoose = require('mongoose');

const {Schema} = mongoose;



const subscribtion = new Schema({
        email: String,
        dateOfSub: Date
});



mongoose.model('subscribtions',subscribtion);