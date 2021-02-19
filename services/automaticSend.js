
const CronJob = require('cron').CronJob;

const axios = require('axios');

const weeklyMovieEmail = require('./weeklyMoviesEmail');

module.exports = (user) =>{
                        
const job = new CronJob('0 1-50 17-19 * * 4', function() { //  (* * 17-19 * * 4) 1-50 minute, 5pm to 7pm, every thursday of the month, every month 

    weeklyMovieEmail(user);
    
    }, null, true);
    
    job.start();
}