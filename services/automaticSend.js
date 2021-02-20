
const CronJob = require('cron').CronJob;

const axios = require('axios');

const weeklyMovieEmail = require('./weeklyMoviesEmail');

module.exports = (user) =>{
                        
const job = new CronJob('0 0 17 * * 4', function() { //  (0 0 17 * * 4) 5pm , every thursday of the month, every month 

    weeklyMovieEmail(user);
    
    }, null, true);
    
    job.start();
}