const passport = require('passport');

const mongoose = require('mongoose');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const keys = require('../config/keys');

const User = mongoose.model('users');

const Subscribtion = mongoose.model('subscribtions');

const Mailer = require('../services/mailer');

const template = require('../services/mailTemplates/welcomeTemplate');



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
                //new user
                const user = await new User({googleId: profile.id, email: profile._json.email, displayName: profile._json.name }).save();
                // subscribe for weekly updates
                await new Subscribtion({
                    email :profile._json.email.toLowerCase(),
                    dateOfSub : Date.now()
                     }).save();

                  await new Mailer(
                      {subject: 'Welcome to MaMovies', subscriber: profile._json.email }, 
                      template('It\'s great to have you with us! we hope you enjoy our App and our weekly new movies list! :)') 
                      ).send();

                      console.log('server, subbed + sent email');

                done(null,user);
             } catch (error) {
                    console.log(error);
             }
                
            }
    )


);

