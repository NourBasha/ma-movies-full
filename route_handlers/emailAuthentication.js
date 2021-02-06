

const mongoose = require('mongoose');

const User = mongoose.model('app_users');


module.exports = (app) =>{


    app.post('/api/authenticate/signup', async (req,res)=>{

       

        try {
            const existing = await User.findOne({
                                email : req.body.email
                            });
            if(existing) {
                return res.status(403).send({error:'user exists'});
            }

            const user = await new User({email: req.body.email, password: req.body.password}).save();

            res.send(user);

        } catch (error) {
            console.log(error);
        }
    });

    app.post('/api/authenticate/login', async (req,res)=>{

      
        console.log('***************************************');
        console.log('req.body is : ', req.body);
        console.log('***************************************');

            try {

                const existing = await User.findOne({email:req.body.email, password:req.body.password});

                if(existing){
                    return res.send(existing)
                }

                res.status(401).send({error:'user does\'t exist'});

                
            } catch (error) {
                console.log(error);
            }

    });


}