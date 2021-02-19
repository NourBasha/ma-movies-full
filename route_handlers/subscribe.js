
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
            console.log('server, 2 req.body.email is : ',req.body.email);
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
                console.log('server, error is : ', error);
            }
           }
    });
             
    app.get('/api/unsubscribe/:Id', (req,res)=>{
        res.redirect("/unsubscribed");    /// make view in client
    });

    app.post('/api/subscribtion/webhook', async (req,res)=>{

        console.log('coming data is : ', req.body);
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
                
            console.log('webhook result is : ', result);

                    _.map(result, async ({subscribtionID})=>{
                       await Subscribtion.deleteOne({_id : subscribtionID});
                    });
                        
                    console.log('deleted');

            res.send({});

        } catch (error) {
            res.status(422).send(error);
        }


    });


    app.get('/api/movies/weekly', async (req,res)=>{

        console.log('req.user is : ', req.user);
        
        try {
            
        const movieList = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${keys.theMoviedbAPIKey}`);
        console.log('server, movie list is :', movieList);

        if(movieList){
            console.log('server, movie list is :', movieList.data);
         let emailMoviesList = [] ; 
                 
                _.map( movieList.data.results ,({id,title,vote_average,poster_path})=>{
                        emailMoviesList.push({id,title,vote_average,poster_path});                         
                   });
           
                emailMoviesList.splice(10);
            const emailSubject = 'Trending movies this week!';
            await Subscribtion.find({},(err,subs)=>{
               
                        if(subs){
                            console.log('results back, subs', subs);
                            _.map(subs, async (subscribtion) =>{
                                console.log('results back, sub1 ', subscribtion);

                                await new Mailer(
                                    {subject: emailSubject, subscribers: [{email: subscribtion.email}]},
                                    weeklyTemplate(req.user,subscribtion, emailMoviesList)
                                    ).send();
                            });
                        };
                            })
                        .select({
                            dateOfSub: false
                        });

                res.send({});
              
        }


        } catch (error) {
            console.log(error);
            res.send(error);
        }

    });

}
