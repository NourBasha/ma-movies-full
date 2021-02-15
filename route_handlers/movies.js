
const requireLogin = require('../middlewares/reaquire_login');
const mongoose = require('mongoose');

const Movie = mongoose.model('movies');


module.exports = (app) =>{ 
   
    // add movie
    app.post('/api/movie', requireLogin, async (req,res) =>{
        const movieID = req.body.movie_id;
            console.log('server, movie id is : ',movieID);
        if(movieID){
           const movie =  new Movie({
                             movie_id : movieID,
                            _user: req.user.id
                          });
                try {
                   await movie.save((err)=>{
                       if(err){
                           console.log(err);
                       }else{
                           res.status(200).send({message:'done'});
                       }
                   });
                   
                } catch (error) {
                    
             }
        }

    } );

    //get movies
    app.get('/api/movie/watchlist',requireLogin, async (req,res)=>{

        const moviesIDs = await Movie.find({_user : req.user.id})
                                  .select({_user: false});
            
        if(moviesIDs){
            console.log('server, movies ids : ', moviesIDs);
            res.send(moviesIDs);
        }

    });
    //check movie exists 
    app.post('/api/movie/watchlist/issaved',requireLogin, async (req,res)=>{

        const movieID = req.body.movie_id;
        console.log('server, ID : ',movieID);
        if(movieID){
            const existing = await Movie.findOne({
                _user : req.user.id,
                movie_id: movieID
            });

            if(existing){
                console.log('server, movies exists');
                res.send(existing);
            }else{
                console.log('server, movies does not exist');

                res.send({});
            }
       
        }
                                  

    });

    // delete movies
    app.delete('/api/movie', requireLogin, async (req,res)=>{
            console.log('server, deleting ID : ',req.body.movie_id);
            await Movie.deleteOne({_user: req.user.id, movie_id: req.body.movie_id});
            res.send({message:'done'});
    });

}