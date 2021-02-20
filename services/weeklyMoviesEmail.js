

const axios = require('axios');
const _ = require('lodash');
const keys = require('../config/keys');
const mongoose = require('mongoose');
const Subscribtion = mongoose.model('subscribtions');
const Mailer = require('../services/mailer');
const weeklyTemplate = require('../services/mailTemplates/weeklyEmailTemplate');

module.exports = async (user)=>{

    try {
            
        const movieList = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${keys.theMoviedbAPIKey}`);

        if(movieList){
         let emailMoviesList = [] ; 
                 
                _.map( movieList.data.results ,({id,title,vote_average,poster_path})=>{
                        emailMoviesList.push({id,title,vote_average,poster_path});                         
                   });
           
                emailMoviesList.splice(10);
            const emailSubject = 'Trending movies this week!';
            await Subscribtion.find({},(err,subs)=>{
               
                        if(subs){
                            _.map(subs, async (subscribtion) =>{

                                await new Mailer(
                                    {subject: emailSubject, subscribers: [{email: subscribtion.email}]},
                                    weeklyTemplate(user,subscribtion, emailMoviesList)
                                    ).send();
                            });
                        };
                            })
                        .select({
                            dateOfSub: false
                        });              
        }


        } catch (error) {
          
        }


}