
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const bcrypt = require('bcrypt');


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
                   
        const user = await  User.findOne({email});

        if(user){

         if(user.password){

            if (await bcrypt.compare(password, user.password)) { // compare the hashed password from db with the user entered one

                return done(null,user);
   
              }else{
                return done(null,false);
              }

         }else{
            console.log('didnt fall into the trap!!!!!')
            done(null,false);
         }


        }else {
            return done(null,false);
        }
           
    }
));





