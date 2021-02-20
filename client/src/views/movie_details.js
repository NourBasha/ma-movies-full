import { useCallback, useEffect, useState } from "react";
//import "./movie_details.scss";
import * as DATA from "../utils/data";
import axios from "axios";
import alt from "../assets/imgs/alt.jpg";
import Rating from '../components/functional/rating';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import {saveMovie,deleteMovie} from '../store/actions/actions';

let movie = [];
let movieVideos = [];
let movieCastCrew = [];


const MovieDetails = (props) => {
  const [loadingError, setLoadingState] = useState(true);
  const [loadingCrewError, setLoadingCrewState] = useState(true);
  const [movieSaved, setMovieSaved] = useState(false);


  const checkSavedMovie = useCallback( async ()=>{
      const existing = await axios.post('/api/movie/watchlist/issaved',{movie_id:props.data.match.params.id});
      if(Object.keys(existing.data).length!== 0){
       return setMovieSaved(true);
      }else {
        setMovieSaved(false);
      }
     
  },[props.data.match.params.id])

  useEffect(() => {
    async function getCrew() {
      var urlCrew =
        "https://api.themoviedb.org/3/movie/" +
        props.data.match.params.id +
        "/credits?api_key=" +
        process.env.REACT_APP_API_KEY;

      axios
        .get(urlCrew)
        .then((response) => {
          
          movieCastCrew = response.data;
          setLoadingCrewState(false);
        })
        .catch((error) => {
          alert(error);
        })
        .finally(() => {});
    }

    async function getmovieDetails() {
      var url =
        "https://api.themoviedb.org/3/movie/" +
        props.data.match.params.id +
        "?api_key=" +
        process.env.REACT_APP_API_KEY +
        "&language=en-US&append_to_response=videos";
      await axios
        .get(url)
        .then((response) => {
          movie = response.data;
          movieVideos = movie.videos.results;
          setLoadingState(false);
        })
        .catch((error) => {
          alert(error);
        })
        .finally(() => {});
    }


    getmovieDetails();
    checkSavedMovie()
    getCrew();
  }, [props.data.match.params.id,checkSavedMovie]);

  function Genres(props) {
    const genreList = props.genres.map((genre, index) => (
      <span key={genre.id}>
        {index + 1 < props.genres.length ? (
          <p> {genre.name},</p>
        ) : (
          <p> {genre.name} </p>
        )}
      </span>
    ));

    return genreList;
  }

 const handleSave= ()=>{
    props.saveMovietoAPI({movie_id:props.data.match.params.id});
    setMovieSaved(true);
 }
 const handleDelete= ()=>{
    props.deleteMovieFromAPI({movie_id:props.data.match.params.id});
    setMovieSaved(false);
 }

  function MovieTrailer(props) {
    const videoList = props.trailers.map((video, index) => (
    
        index < 2 ? ( // only two trailers to show
          video.key !== undefined && video.key !== null && video.key !== "" ? (
              <span className="video embed-responsive embed-responsive-16by9 mt-4"
                     key={video.id}>
                  <iframe
                    title="trailer"
                    className="embed-responsive-item trailer-video"
                    src={DATA.VIDEO_PATH + video.key}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; "
                    allowFullScreen
                  ></iframe>
                </span>
          ) : (
            <p key={video.id}> trailer unavailable</p>
          )
        ) : (
          <p   key={index-1} style={{display:'none'}}></p>
        )
     
    ));

    return videoList;
  }

  function Cast(props) {
    const crewList = props.cast.map((cast, index) => (
        props.cast.length !== 0 ? (
          index < 7 ? (
            cast.profile_path !== undefined &&
            cast.profile_path !== "" &&
            cast.profile_path !== null ? (
              <div className="cast-card text-center   col-10 col-sm-6 col-md-4 col-lg-3 mt-1 mb-1"
              key={cast.id}>
                <div className="card cast-card">
                  <img
                    className="myimage img-responsive"
                    src={DATA.CAST_IMAGE_PATH + cast.profile_path}
                    alt="loading"
                  />
                  <div
                    className="card-body headings-no-border pl-0 pr-0 pt-2 - pb-2"
                    
                  >
                    <h5 className="card-title" style={{ color: "white" }}>
                      {cast.name}
                    </h5>
                    <div style={{ color: "white" }}>
                      <span className="as">
                        as
                        <p className="card-text role-name">
                          {cast.character}
                        </p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="cast-card text-center col-10 col-sm-6 col-md-4 col-lg-3 mt-1 mb-1"
              key={cast.id}>
                <div className="card cast-card">
                  <img
                    className="myimage img-responsive"
                    src={alt}
                    alt="loading"
                  />
                  <div className="card-body headings-no-border pl-0 pr-0 pt-2 - pb-2" >
                    <h5 className="card-title" style={{ color: "white" }}> {cast.name} </h5>
                    <div style={{ color: "white" }}>
                      <span className="as">
                        as
                        <p className="card-text role-name">
                          {cast.character}
                        </p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          ) : (
            <p  key={cast.id} style={{display:'none'}}></p>
          )
        ) : (
          <p  key={index-1} style={{ color: "white", fontSize: 14 + "px" }}>
            Sorry, No Cast Available for This movie.
          </p>
        )
    ));

    return crewList;
  }
  return (
    <div   >
      {loadingError ? (
        <div className="text-center">
            <div className="spinner-border text-info m-5" role="status">
                  </div>
      </div>
      ) : (
        <div className="container-fluid movie bg-dark" style={{backgroundImage:"url("+DATA.IMAGE_BIG+movie.backdrop_path+")"}}>
      
          <div className="row "  > 
              <div className="col-12 data-video-container" >
                    {/* start of movie data row */}
                    <div className="row first-row ">
                      <div className="col-12 image-col  col-md-4 align-self-center">
                        {movie.poster_path ? (
                          <img
                            className="poster-image img-fluid "
                            src={DATA.IMAGE_PATH + movie.poster_path}
                            alt=""
                          />
                        ) : (
                          <img
                            className="poster-image img-fluid "
                            src={alt}
                            alt=""
                          />
                        )}
                        { props.user 
                              ?
                                ( <span className='icons-wrapper' >
                                        {   
                                          movieSaved?(
                                          <div className='icon-saved-wrapper' onClick={handleDelete}>
                                            <div className='saved' title='unsave'>
                                            <FontAwesomeIcon icon='bookmark' size='5x' title='unsave'>
                                            </FontAwesomeIcon>
                                            </div>
                                            <div className='check-saved'>
                                            <FontAwesomeIcon icon='check' size='2x' title='unsave' ></FontAwesomeIcon>
                                            </div>
                                          </div>
                                            )
                                          : (<div className='icon-unsaved-wrapper' onClick={handleSave} >
                                            <FontAwesomeIcon icon={['far', 'bookmark']} size='5x' title='save'></FontAwesomeIcon>
                                          </div>)
                                        }                          
                                  </span>
                                  )
                               :null
                            }
                      </div>
                        <div className="col-12 col-lg-8 headings movie-meta">
                          <div className="row  text-center d-flex  justify-content-center movie-name-row pl-1 pr-1">
                            <h1> {movie.title}</h1>
                           
                          </div>

                          <div className="row d-flex justify-content-center movie-year-row">
                            {movie.release_date ? (
                              <h3> {movie.release_date.slice(0, 4)}</h3>
                            ) : (
                              <p></p>
                            )}
                          </div>

                          <div className="row d-flex justify-content-center movie-genre-row">
                            {movie.genres ? <Genres genres={movie.genres} /> : <p></p>}
                          </div>

                          <div className="row d-flex justify-content-center rating-row">
                            <div className="rating-col">
                              <div className="rate-val">
                                <span className="val">{movie.vote_average}</span>
                                <span className="out-of">&frasl;10</span>
                              </div>
                            </div>

                            <div className="rate-star">
                              {movie.vote_average ? (
                                <Rating rating={movie.vote_average} size={'lg'} />
                              ) : (
                                <p></p>
                              )}
                            </div>
                          </div>

                          <div className="row d-flex justify-content-center text-center overview-row">
                            <div className="col justify-self-center">
                              <h6>Overview</h6>
                              <p>{movie.overview}</p>
                            </div>
                          </div>
                        </div>
                     </div>
                    {/* end of movie data row */}

                    {/* start of trailer video row */}
                    <div className="row video-row d-flex justify-content-center">
                      {movieVideos.length !== 0 ? (
                        [ <div key='trailer-head' className="col-12 video-heading-col headings justify-content-center d-flex">
                                  <h2 className='video-heading appText'>Trailer</h2>
                            </div>,

                          <div  key='trailer' className="col-12 col-md-10 " style={{ justifyself: "center" }}>
                            <MovieTrailer trailers={movieVideos} />
                          </div>
                          ]
                      ) : (
                        <p className=" col-12 text-center headings" 
                        style={{ color: "white",
                         fontSize: 16 + "px",
                         padding:'10px',
                         borderRadius:'10px' }}>
                          Sorry, No Trailer Available for This movie.
                        </p>
                      )}
                    </div>
                    {/* end of trailer video row */}
              </div>
          </div>
         
      
          
          <div className="row  cast-and-footer"
           style={{background:'linear-gradient(0deg, #343a40, transparent 70%)'}}>
                {/* start of cast*/}
                {loadingCrewError ? (
                <p>Error loading Cast</p>
              ) : (
                  movieCastCrew.cast?

                      
               <div className="col-12 cast-col">

                      {
                        movieCastCrew.cast.length>0
                        ?
                          (  <div className="row cast-row-heading headings justify-content-center"> 
                                  <h2 className='cast-heading appText'>Cast</h2>                                
                             </div>
                          )
                        :(
                          <p className="col-12 text-center headings" 
                          style={{color:'white', 
                          fontSize: 16 + "px",
                          padding:'10px',
                          borderRadius:'15px'}}>
                          Sorry, No Cast available for this movie</p>
                        )
                      }

                  

                    <div className="row  cast-row text-left justify-content-around" >
                      <Cast cast={movieCastCrew.cast} />   
                  </div>

               </div>


                  : <p className="col-12 text-center headings" 
                  style={{color:'white', 
                  fontSize: 16 + "px",
                  padding:'10px',
                  borderRadius:'15px'}}>
                  Sorry, No Cast available for this movie</p>

              
              )}
              {/* end of cast*/}

              {/*start of crew link*/}
              <div className="col-12 footer-col">
              <div className="row d-flex justify-content-center full-cast-row" >
              <div className="fullCast">
                <a href={DATA.FULL_CAST_LINK+props.data.match.params.id}> See Full Cast</a>
              </div>
        
              </div>
                </div>
          
              {/*end of crew link*/}

            </div>
          

         

        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({auth})=>{
  return{
    user : auth.user
  }
}

 const mapDispatchToProps = (dispatch)=>{
    return{
        saveMovietoAPI : (payload) => dispatch(saveMovie(payload)),
        deleteMovieFromAPI : (payload) => dispatch(deleteMovie(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);
