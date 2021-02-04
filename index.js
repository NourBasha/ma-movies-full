const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const keys = require('./config/keys');

const cookieSession = require('cookie-session');


require('./models/user_model');


require('./strategies/google_strategy');




mongoose.connect(keys.mongoURI,{useNewUrlParser: true, useUnifiedTopology: true})
.then(res=>{
    console.log('conncetion done');
})
.catch(err=>{
    console.log('connection error');
})



const app = express();



app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys : [keys.cookieKeys]
}));

app.use(passport.initialize());
app.use(passport.session());


require('./route_handlers/authentication')(app);




const PORT = process.env.PORT || 5000 ;

app.listen(PORT);