
import Card from 'react-bootstrap/Card';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import {IMAGE_PATH}from '../utils/data';
import { Link } from 'react-router-dom';
import Rating from '../components/functional/rating';
import {connect} from 'react-redux';
import {saveMovie,deleteMovie} from '../store/actions/actions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import LoadingOverlay from 'react-loading-overlay';
import BeatLoader from 'react-spinners/BeatLoader';

import img from '../assets/imgs/alt.jpg'

let idList = [];
let movieList = [];

const Watchlist = ({deleteMovieFromAPI, saveMovietoAPI}) =>{ 

    const[moviesReady, setMoviesReady]= useState(false);
    const [dataUpdated, setDataUpdated] = useState(true);


    const getMoviesWithIDs = useCallback(()=>{
            console.log('getting movies');
        let urlList = [];

    idList.forEach(movie_id=>{
        urlList.push(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
    })
    
    let requestList = [];

    
    if(urlList.length>0){
        urlList.forEach(url=>{
            requestList.push(axios.get(url));
        })
    }

    if(requestList.length>0){

         axios.all(requestList)
             .then(
                 axios.spread((...responses) =>{
                    responses.forEach((response,index)=>{
                        movieList.unshift(response.data);
                    })  
                    console.log('movie list ', movieList);
                    setMoviesReady(true);
                     })
                     );

    }

      
    },[])

    const getSavedMoviesIDs = useCallback( async ()=>{
        console.log('getting ids');
        const moviesIDs = await axios.get('/api/movie/watchlist');

        if(Object.keys(moviesIDs.data).length!==0){
            console.log('ids came', moviesIDs);
            moviesIDs.data.forEach(data=>{
                idList.push(data.movie_id);
            });
            return getMoviesWithIDs();
        }
        setMoviesReady(true);
    },[getMoviesWithIDs])

    useEffect(()=>{
        console.log('use effect says hi');
        if(movieList.length>0){
            movieList = [];
            idList=[];
            setMoviesReady(false);
        }
        getSavedMoviesIDs();
    },[getSavedMoviesIDs])

    const handleSave= (id)=>{
        setDataUpdated(false);
        saveMovietoAPI({movie_id:id});
        idList.unshift(id);
        setTimeout(() => {
            setDataUpdated(true);
           }, .0009);
     }
     const handleDelete= (id)=>{

         setDataUpdated(false);
        deleteMovieFromAPI({movie_id: id});

        const index = idList.indexOf(id);
        idList.splice(index,1);

       setTimeout(() => {
        setDataUpdated(true);
       }, .0009);
     }

    const MovieCard = ()=>{
        console.log(idList);
        return(
           movieList.map(movie=>{

            console.log(idList.includes(movie.id));

               return(
                        <div className=' card-col col-12 col-md-4 col-lg-3 d-flex justify-content-center ' key={movie.id}>
                        <Card className='headings' style={{ width: '18rem' }}>
                        { 
                            dataUpdated
                            ? 
                                idList.includes(movie.id)?(
                                <div className='icon-saved-wrapper' onClick={ () => handleDelete(movie.id)}>
                                    <div className='saved' title='unsave'>
                                        <FontAwesomeIcon icon='bookmark' size='4x' title='unsave'>
                                        </FontAwesomeIcon>
                                    </div>
                                    <div className='check-saved'>
                                        <FontAwesomeIcon icon='check' size='2x' title='unsave' ></FontAwesomeIcon>
                                    </div>
                                </div> )
                                : (<div className='icon-unsaved-wrapper' onClick={()=>handleSave(movie.id)} >
                                        <FontAwesomeIcon icon={['far', 'bookmark']} size='4x' title='save'></FontAwesomeIcon>
                                    </div>)
                            :null    
                        }       
                            {
                                movie.poster_path
                                ? <Card.Img variant="top" src={IMAGE_PATH+movie.poster_path} />
                                : <Card.Img variant="top" src={img} />

                            }
                            <Card.Body>
                                <Card.Title className='title'>{movie.title}</Card.Title>
                                <Card.Title className='year'>{movie.release_date.slice(0,4)}</Card.Title>
                                <Card.Text> 
                                    <span className='d-flex justify-content-start align-items-center'>
                                        <span  className='rating'>{movie.vote_average} </span>
                                        <span className='ten mr-1'>/10</span>
                                      <span>
                                       <Rating rating={movie.vote_average} size={'sm'} />
                                      </span>
                                    </span>
                                </Card.Text>
                                <Card.Text className='overview'>
                                {movie.overview}
                                </Card.Text>   
                            </Card.Body>
                            <div className='card-link-wrapper d-flex justify-content-end'>
                                         <Link to={{pathname:'/movie/'+movie.id}} className="card-link p-2">More</Link>
                                </div>
                    </Card>
                    </div>  
               )
           })
        )
    }

    return(
        <div className='watchlist'>
            <div className='container-fluid'>
                <div className='row card-row d-flex justify-content-center'>
                   {
                       moviesReady
                       ?
                            movieList.length > 0 
                            ?    (  <MovieCard/>)
                            : (<div className=' col-10 headings empty-col'
                                style={{borderRadius:'10px',
                                marginTop:'50px',
                                 padding:'30px',
                                 display:'flex',
                                 flexDirection:'column',
                                 alignItems:'center'
                                 }}>
                                
                                 <h2 style={{
                                     fontFamily: 'Fugaz One',
                                     margin:'0',
                                     display:'inline-block',
                                    
                                 }}>
                                    Watchlist is empty
                                 </h2>
                                <p>
                                    start bookmarking movies now, go to&nbsp;
                                    <Link className='appText' to={{pathname:'/browse'}}>
                                    Browse 
                                 </Link>.
                                </p>
                              
                              </div>)
                       
                       :   (<div className=' col-12 loading-overlay-wrapper'>
                             <LoadingOverlay
                                className='loading-overlay'
                                active={!moviesReady}
                                spinner={<BeatLoader size={30} color={"#00dbdb"} />}
                                >
                             </LoadingOverlay>
                       </div>)
                   }
                </div>

            </div>
          
        </div>
    )
}

const mapDispatchToProps = (dispatch)=>{
    return{
        saveMovietoAPI : (payload) => dispatch(saveMovie(payload)),
        deleteMovieFromAPI : (payload) => dispatch(deleteMovie(payload))
    }
}

export default connect(null,mapDispatchToProps)(Watchlist);