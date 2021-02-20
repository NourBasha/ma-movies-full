const passport = require('passport');

const mongoose = require('mongoose');

const User = mongoose.model('users');
const Movie = mongoose.model('movies');
const Subscribtion = mongoose.model('subscribtions');

const bcrypt = require('bcrypt');
const reaquire_login = require('../middlewares/reaquire_login');

const Mailer = require('../services/mailer');

const template = require('../services/mailTemplates/welcomeTemplate');
const autoWeeklySend = require('../services/automaticSend');
const recoverPassTemplate = require('../services/mailTemplates/recoverPasswordTemplate');




module.exports = (app) =>{

    // google authentication
    app.get('/auth/google', passport.authenticate('google',{
        scope:['profile','email']
    })
    );

    app.get('/auth/google/callback',
     passport.authenticate('google'),
      (req,res)=>{
        res.redirect('/');
    } );
        
    app.get('/api/logout',(req,res)=>{
        req.logout();
        res.send({message:'done'});
    })

    app.get('/api/current-user', (req,res)=>{
          res.send(req.user); 
    })
    
    // email and password authentication
    app.post('/api/authenticate/signup',
    
    async (req,res)=>{ // save the new user in db
        try {
            const existing = await User.findOne({
                                email : req.body.email
                            });
            if(existing) {
                return res.status(403).send({error:'user exists'});
            }
            const user = new User({  email: req.body.email,
                            password: req.body.password, 
                            displayName: req.body.username
                          });


                const salt = await bcrypt.genSalt(10); 
                if(salt){
                  user.password = await bcrypt.hash(user.password,salt);
                  }

              await user.save( async function(err) {

                if(err) {
                  return res.status(408).send({message:'DB error'})
                } else {

                  try {
                   const sub =  await new Subscribtion({
                      email :user.email.toLowerCase(),
                      dateOfSub : Date.now()
                       }).save();

                    await new Mailer(
                        {subject: 'Welcome to MaMovies', subscribers:  [{email: user.email}]    }, 
                        template({user, subscribtion:sub}) 
                        ).send();

                        autoWeeklySend(user);

                  } catch (error) {
                   
                  }

                  req.login(user, function(err) {
                    if (err) {
                    }
                    const {password, ...authUser} = user._doc;
                    return res.send(authUser);
                  });
                }
              });
    
        } catch (error) {
        }
    } 
    
    );

    app.post('/api/authenticate/login', 

        passport.authenticate('local', {failureRedirect: '/login'} ) , 
         (req,res)=>{
            res.send(req.user);
        } 

        );

    // delete account 
    app.delete('/api/delete-account',reaquire_login, async (req,res)=>{

        const result = await Movie.deleteMany({_user: req.user.id}) ;     
        const user = await User.deleteOne({_id : req.user.id});
        res.send({message:'done'});
      
    }) 


    // recover password 

    //get user email and send him a link
    app.post('/api/recover-password', async (req,res)=>{

      const recoverEmail = req.body.email;

      if(recoverEmail){

        try {
          
         const user = await User.findOne({email:recoverEmail}).select({
            googleId: false,
            password: false,
            displayName: false
          });

          if(user){
            const recordID = user._id;
            const mailer = new Mailer(
              {
                subject: 'MaMovies password recovery',
                subscribers : [{email:recoverEmail}]
              },
              recoverPassTemplate({userRecordID: recordID})
            ); 
            mailer.send();

            res.send({message:'done'});

          }


        } catch (error) {
          res.status(402).send(error);
        }

      }

    });


    app.post('/api/setNewPassword', async (req,res)=>{

      let newPassword = req.body.password;
      const userID = req.body.userRecordID ;

     try {
       
      
      const salt = await bcrypt.genSalt(10); 

      if(salt){
        newPassword = await bcrypt.hash(newPassword,salt);
        }

       await User.updateOne(
          {
            _id : userID
          },
          {
            password : newPassword
          }
        );

        res.send({message:'done'});
       

     } catch (error) {
        res.status(401).send(error);
     }


    });
  
  

}

