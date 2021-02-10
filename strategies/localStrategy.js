
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');


passport.serializeUser ((user,done)=>{
    console.log('server, local, serialize user');
    console.log(user);
    
    done(null,user.id);
})

passport.deserializeUser ((id,done)=>{
    console.log('server, local, deserialize user');
    console.log(id);

    // find in db by id, then 
    User.findById(id).then(user=>{
        done(null,user)
    })
 
})


passport.use(
    new LocalStrategy(
   async (email, password, done) => { 
            // verify user by email and pass word from db then 
            // set done(null,user) if true , done(null,false) if not in db
        const user = await  User.findOne({email,password});

        if(user){
           return done(null,user);
        }else {
           return done(null,false);
        }
           
    }
));





