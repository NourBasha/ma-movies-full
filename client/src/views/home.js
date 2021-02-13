import React, { useEffect, useContext, useRef, useCallback } from "react";
import axios from "axios";
import Context from "../utils/context";
import Footer from "../components/container/footer";

import MovieCard from "../components/functional/movieCard";

import Carousel from 'react-bootstrap/Carousel';

import * as DATA from '../utils/data';

import img from '../assets/imgs/alt.jpg';
import img2 from '../assets/imgs/backgroundLight.jpg';


let moviesList = [];
let caroMovieList= [];

const Home = (props) => {
  const context = useContext(Context);
  const contextRef = useRef(useContext(Context));

  const getMovies = useCallback(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=" +
          process.env.REACT_APP_API_KEY +
          "&language=en-US&page=1"
      )
      .then((response) => {
        if (response.data) {
          moviesList = response.data.results;
          contextRef.current.dispatchRedLoadingFalse();

          moviesList.url = response.config.url;
          contextRef.current.setHomeResponseUrl(moviesList.url);
          contextRef.current.setHomeApiResponse(moviesList);
          contextRef.current.updateHomeResponseExpireTime(
            new Date().getTime() + 60 * 1000
          );
        }
      })
      .catch((error) => {})
      .finally(() => {});
  }, []);

  const getCaroMovies = useCallback( async ()=>{

    const movies = await axios.get('https://api.themoviedb.org/3/trending/movie/day?api_key=83a0145e56d35a45ba5ea0f752806cd2');
      
      if(movies){
        caroMovieList = movies.data.results;
        console.log(caroMovieList);
      }

  },[])


  useEffect(() => {

    getCaroMovies()

    if (
      contextRef.current.homeResponseExpireTime > new Date().getTime() &&
      contextRef.current.homeResponseUrl === moviesList.url
    ) {
      moviesList = contextRef.current.homeApiResponse;
    } else {
      getMovies();
    }
  }, [getMovies, getCaroMovies]);


  return (
    <div className=" home-container">
      {/* start of carousel */}

     <div className='row caro-row'>
          <div className='col-12 col-md-6 caro-col'>
                <Carousel>
                      {
                        caroMovieList.length
                        ? (
                          caroMovieList.map((movie,index)=>{
                            if(index<=9){
                            return(
                              <Carousel.Item key={movie.title}
                              className='img-fluid'
                              >
                                  <img
                                    className="d-block w-100"
                                    src={DATA.IMAGE_BIG+movie.poster_path}
                                    alt="First slide"
                                  />
                                  <Carousel.Caption>
                                      <div className='caption'>
                                      <h3>{movie.title}</h3>
                                      <p>{movie.overview}</p>
                                      </div>
                                  </Carousel.Caption>
                            </Carousel.Item>
                            ) 
                           }
                          }
                            )

                        )
                        :null
                      }
                  
              </Carousel>
          </div>
        
          <div className=' d-none d-md-block col-md-6 caro-col pl-1'>
                <Carousel>
                      {
                        caroMovieList.length
                        ? (
                          caroMovieList.map((movie,index)=>{
                            if(index>9){
                            return(
                              <Carousel.Item key={movie.title}
                              className='img-fluid'
                              >
                                  <img
                                    className="d-block w-100"
                                    src={DATA.IMAGE_BIG+movie.poster_path}
                                    alt="First slide"
                                  />
                                  <Carousel.Caption>
                                    <h3>{movie.title}</h3>
                                    <p>{movie.overview}</p>
                                  </Carousel.Caption>
                            </Carousel.Item>
                            ) 
                           }
                          }
                            )

                        )
                        :null
                      }
                  
              </Carousel>
          </div>
        
     </div>
      
      {/* end of carousel */}

      {/* start of movies */}
      <div className=" home-movies container-fluid ">
        <div className="head-movies row d-flex justify-content-center pl-4 pr-4">
          {context.redHomeLoading === false ? (
            <MovieCard movieList={moviesList} />
          ) : (
            <div className="text-center">
              <div
                className="spinner-border text-info m-5 "
                style={{ width: "4rem", height: "4rem" }}
                role="status"
              ></div>
            </div>
          )}
        </div>
      </div>
      {/* end of movies */}

      {/* start of sign up */}
      <div className="sign-up">
        <div className="heading">
          <h2 className="d-flex justify-content-center">Subscribe!</h2>
          <p className="d-flex justify-content-center">
            Get the latest updates on movies
          </p>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6 ml-auto   text-center text-md-right ">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    @
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="E-mail"
                  aria-label="E-mail"
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>
            <div className="col-12 col-md-4  text-center text-md-left">
              <button className="btn btn-light">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
      {/* end of sign up */}

      <Footer />
    </div>
  );
};

export default Home;
