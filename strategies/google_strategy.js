const passport = require('passport');

const mongoose = require('mongoose');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const keys = require('../config/keys');

const User = mongoose.model('users');



passport.serializeUser((user,done)=>{
    done(null,user.id);
})

passport.deserializeUser((id,done)=>{

    User.findById(id)
    .then(user=>{
        done(null,user);
    })
    


})


passport.use(

    new GoogleStrategy(
        { 
           clientID: keys.googleClientID,
           clientSecret: keys.googleClientSecret, 
           callbackURL : '/auth/google/callback',
           proxy : true
        }, 

         async (accessToken, refreshToken, profile, done) => {

            console.log(profile);
            
             try {
                const existing = await User.findOne({email: profile._json.email });
                if(existing){
                    return done(null,existing)
                }

                const user = await new User({googleId: profile.id, email: profile._json.email, displayName: profile._json.name }).save();
                  done(null,user);

             } catch (error) {
                    console.log(error);
             }
                
            }
    )


);

