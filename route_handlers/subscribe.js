
const mongoose = require('mongoose');

const Subscribtion = mongoose.model('subscribtions');

const Mailer = require('../services/mailer');

const template = require('../services/mailTemplates/welcomeTemplate');
const weeklyTemplate = require('../services/mailTemplates/weeklyEmailTemplate');

const _ = require('lodash');

const {Path} = require('path-parser');

const axios = require('axios');
const keys = require('../config/keys');

const autoWeeklySend = require('../services/automaticSend');

module.exports = (app)=>{

    app.post('/api/subscribe', async (req,res)=>{

            // save the coming email in db 
            // keep email to send welcome email

           const existing = await Subscribtion.findOne({email:req.body.email});

           if(existing){
            return res.status(403).send({message:'exists'});
           }else {
            try {
                const sub =  await new Subscribtion({
                          email : req.body.email,
                          dateOfSub : Date.now()
                  }).save();
  
                  await new Mailer(
                      {subject: 'Welcome to MaMovies', subscribers:[{email:req.body.email}]}, 
                      template({user:null, subscribtion:sub}) 
                      ).send();

                   autoWeeklySend(null);
  
                  res.send({message:'done'});
            } catch (error) {
                res.status(408).send({message:'error'});
            }
           }
    });
             
    app.get('/api/unsubscribe/:Id', (req,res)=>{
        res.redirect("/unsubscribed");    /// make view in client
    });

    app.post('/api/subscribtion/webhook', async (req,res)=>{

        try {
            
            const p = new Path('/api/unsubscribe/:Id');

            const result = _.chain(req.body)
                        .map(({ url})=>{
                            const pathname = new URL(url).pathname ;

                            const match = p.test(pathname);
                            if(match){
                                return{
                                    subscribtionID : match.Id 
                                };
                            }
                        })
                        .compact()
                        .uniqBy('Id')
                        .value();
                
                    _.map(result, async ({subscribtionID})=>{
                       await Subscribtion.deleteOne({_id : subscribtionID});
                    });
                        

            res.send({});

        } catch (error) {
            res.status(422).send(error);
        }


    });



}
