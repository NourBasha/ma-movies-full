const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const keys = require('./config/keys');

const cookieSession = require('cookie-session');


require('./models/user_model');
require('./models/movie_model');
require('./models/subscribe_model');


require('./strategies/google_strategy');
require('./strategies/localStrategy');


mongoose.connect(keys.mongoURI,{useNewUrlParser: true, useUnifiedTopology: true})
.then(res=>{
    console.log('conncetion done');
})
.catch(err=>{
    console.log('connection error');
})

const app = express();

app.use(express.json());

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys : [keys.cookieKeys]
}));


app.use(passport.initialize());
app.use(passport.session());


require('./route_handlers/authentication')(app);
require('./route_handlers/movies')(app);
require('./route_handlers/subscribe')(app);

if (process.env.NODE_ENV === 'production'){

    //serves the entire build directory if route is not defined in server 
    app.use(express.static('client/build')); 

    // serves index.html if the requested route is not recognised and all the previous handlers fail to serve it 
    const path = require('path');

    app.get ('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });

}

const PORT = process.env.PORT || 5000 ;

app.listen(PORT);