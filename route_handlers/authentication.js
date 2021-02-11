const passport = require('passport');

const mongoose = require('mongoose');

const User = mongoose.model('users');

const bcrypt = require('bcrypt');

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
            console.log('server signup ');
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

                  console.log('user before hash',user);

                const salt = await bcrypt.genSalt(10); 
                if(salt){
                  console.log('salt has data : ',salt);
                  user.password = await bcrypt.hash(user.password,salt);
                  console.log('pass word after hash',user.password );
                  }


            console.log('collection rec : ',user);

              await user.save(function(err) {
                if(err) {
                  console.log(err);
                } else {
                  console.log('user: ' + user.email + "user saved in db.");
                  req.login(user, function(err) {
                    if (err) {
                      console.log( 'after saving, login() method error: ',err);
                    }
                    console.log('it succeeded!');
                    console.log( 'user is :',user)
                    const {password, ...authUser} = user._doc;

                    console.log('auth user : ',authUser);
                    return res.send(authUser);
                  });
                }
              });

    

        } catch (error) {
            console.log('server signup, failure error: ',error);
        }
    } 
    
    );


    app.post('/api/authenticate/login', 

        passport.authenticate('local', {failureRedirect: '/login'} ) , 
         (req,res)=>{
            res.send(req.user);
        } 

        );

}

