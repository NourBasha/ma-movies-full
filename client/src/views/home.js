import React, { useEffect, useContext, useRef, useCallback,useState } from "react";
import axios from "axios";
import Context from "../utils/context";
import Footer from "../components/container/footer";

import MovieCard from "../components/functional/movieCard";

import Carousel from 'react-bootstrap/Carousel';

import * as DATA from '../utils/data';
import Rating from '../components/functional/rating';
import { Link } from "react-router-dom";

let moviesList = [];
let caroMovieList= [];
const Home = (props) => {
  const context = useContext(Context);
  const contextRef = useRef(useContext(Context));
  const [activeSlide, setActiveSlide] = useState(0);
  


const observeCarousel = () =>{
    
  let elemList = document.getElementsByClassName('carousel-item');
    console.log(elemList);

    [...elemList].forEach((element,index)=>{
      let observer = new MutationObserver(
        function(mutations) {
                          mutations.forEach(
                            function(mutation){
                              console.log('mutation is : ',mutation);
                              if(mutation.attributeName === "class"){
                                  let currentClassState = mutation.target.classList.contains('active');
                                  
                                  if(currentClassState){
                                    console.log('contains active ? ', currentClassState);
                                    console.log('contains active, index', index);
                                    setActiveSlide(index);
                                  }
                                
                              }
                          }
                          );
                      }
                      );
    
      observer.observe(element, {attributes: true});
    })

  
}


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


  useEffect(()=>{
        
    if(caroMovieList.length){
      observeCarousel();
    }
     
  
  })


  return (
    <div className=" home-container">

      {/* start of heed message */}
            <div className='container-fluid headings head-message'>
              <div className='row '>
                  <div className='col-12 head-col '>
                      <h1 className='appText'> Discover the latest movies</h1>
                      <h5 className='appText'>quickly &#38; easily</h5>
                  </div>
              </div>

            </div>
      {/* end of heed message */}


      {/* start of carousel */}
        <div className='container-fluid'>
          
           <div className='row caro-row pt-0 pl-4 pr-4 pb-4'>
       
       {
         caroMovieList.length
         ?([ <div key='carousel' className='col-12 col-md-7 caro-col'>
              <Carousel>
                    {
                        caroMovieList.map((movie,index)=>
                      
                            <Carousel.Item
                            key={movie.title}  
                             >
                                <img
                                  className="d-block w-100"
                                  src={DATA.IMAGE_BIG+movie.poster_path}
                                  alt="First slide"
                                />
                            
                          </Carousel.Item>                         
                          )
                    }
                
            </Carousel>
        </div>,
      
        <div  key='desc' className='col-12 col-md-5 p-0 caro-desc'>
           
                    <div className="card headings" >
                        <div className="card-body">
                           <div className='card-data'>
                              <h5 className="card-title appText ">{caroMovieList[activeSlide].title}</h5>
                                 <div className='rating-container'>
                                    <h6 className="card-subtitle appText">{caroMovieList[activeSlide].vote_average}</h6>
                                    <span>
                                       <Rating rating={caroMovieList[activeSlide].vote_average}  size={'lg'} />
                                    </span>
                                </div>
                              <p className="card-text appText">{caroMovieList[activeSlide].overview}</p>
                            </div>
                        
                         <div className='card-links '>
                           <Link to={{pathname:'/movie/'+caroMovieList[activeSlide].id}} className="card-link">More</Link>
                           </div>
                         </div>
                     </div>
                        
        </div>
        ])
         :null
       }
   </div>
    
        </div>
      {/* end of carousel */}

      {/* start of movies */}
      <div className=" home-movies container-fluid ">

           <div className='row movies-message'>
             
                  <div className='col-12 message-col headings'>
                      <h2 className='appText'> Long standing hits</h2>
                  </div>
             

            </div>

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
