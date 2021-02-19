import React, { useEffect, useContext, useRef, useCallback,useState } from "react";
import axios from "axios";
import Context from "../utils/context";
import Footer from "../components/container/footer";

import MovieCard from "../components/functional/movieCard";

import Carousel from 'react-bootstrap/Carousel';

import * as DATA from '../utils/data';
import Rating from '../components/functional/rating';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {subscribe,setSubscribeState} from '../store/actions/actions';
import {validateEmail} from '../utils/validateEmail';

let moviesList = [];
let caroMovieList= [];
const Home = ({subscribeUser,subscribtionSuccess, setSubscribingState}) => {
  const context = useContext(Context);
  const contextRef = useRef(useContext(Context));
  const [activeSlide, setActiveSlide] = useState(0);
  const [caroLoaded, setCaroLoaded] = useState(false);
  const [emailSubscribtion,setEmailSubscribtion] = useState('');
  const [emailValid,setEmailValid] = useState(null);


  


const observeCarousel = () =>{
    
  let elemList = document.getElementsByClassName('carousel-item');

    [...elemList].forEach((element,index)=>{
      let observer = new MutationObserver(
        function(mutations) {
                          mutations.forEach(
                            function(mutation){
                              if(mutation.attributeName === "class"){
                                  let currentClassState = mutation.target.classList.contains('active');
                                  
                                  if(currentClassState){
                                  
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

    const movies = await axios.get('https://api.themoviedb.org/3/trending/movie/day?api_key='+process.env.REACT_APP_API_KEY);
      
      if(movies){
        caroMovieList = movies.data.results;
        setCaroLoaded(true);
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
    if(subscribtionSuccess === false || subscribtionSuccess === true ){
      document.getElementsByClassName('email-input')[0].value = '';
    }
  },[subscribtionSuccess])

  useEffect(()=>{
        
    if(caroMovieList.length){
      observeCarousel();
    }
     
  
  })


  const handleSubscribe = () =>{

    setSubscribingState('');

    if(validateEmail(emailSubscribtion)){
      console.log('client, before action, email : ', emailSubscribtion);
      setSubscribingState(null);
      subscribeUser({email:emailSubscribtion});
      setEmailValid(true);
    }else {
      setEmailValid(false);
    }
    
    
  }

  return (
    <div className="home-container">

      {/* start of heed message */}

        <button onClick={()=>{
          axios.get('/api/movies/weekly');
        }}>
            get server movies
        </button>

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
          
           <div className='row caro-row pt-0 pl-2 pr-2 pb-4'>
       
       {
         caroLoaded
         ?([ <div key='carousel' className='col-12 col-md-6 caro-col'>
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
      
        caroMovieList.length
        ?(<div  key='desc' className='col-12 col-md-6 p-0 caro-desc'>
           
            <div className="card headings" >
                <div className="card-body">
                  <div className='card-data'>
                      <div className='title'>
                      <h5 className="card-title appText ">{caroMovieList[activeSlide].title}</h5>
                        </div>
                        <div className='rating-container'>
                            <span className="card-subtitle appText">{caroMovieList[activeSlide].vote_average}</span>
                            <span className="card-subtitle-ten appText">/10</span>
                            <span>
                              {
                                window.innerWidth > 768
                                ? <Rating rating={caroMovieList[activeSlide].vote_average}  size="lg" />
                                : <Rating rating={caroMovieList[activeSlide].vote_average}  size="1x" />
                              }
                            </span>
                        </div>
                      <p className="card-text appText ">{
                      caroMovieList[activeSlide].overview.split(' ').length > 40 
                      ? caroMovieList[activeSlide].overview.split(' ').splice(0,40).join(' ') + ' ...'
                      : caroMovieList[activeSlide].overview
                      }</p>
                    </div>
                
                <div className='card-links  '>
                  <Link to={{pathname:'/movie/'+caroMovieList[activeSlide].id}} className="card-link appText ">More</Link>
                  </div>
                </div>
            </div>
                        
            </div>)
          :null
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
                  className="form-control email-input"
                  placeholder="E-mail"
                  aria-label="E-mail"
                  aria-describedby="basic-addon1"
                  onChange={(e)=>setEmailSubscribtion(e.target.value.toLowerCase().trim())}
                />
                 
              </div>
            </div>
           
            {
                    emailValid === false
                    ?
                        <div className='col-12 col-md-6 ml-auto   text-center text-md-right '>
                        
                             <p> this email is not correct  </p> 
                             
                    
                        </div>
                     :null
             }
            <div className="col-12 col-md-4  text-center text-md-left">
              <button className="btn btn-light" onClick={handleSubscribe} >Subscribe</button>
            </div>
          </div>
         {
           
           subscribtionSuccess === null 
           ? ( <div className='row'>
                  <div className='col d-flex justify-content-center'>
                        <div className="text-center">
                          <div
                            className="spinner-border text-info m-5 "
                            style={{ width: "2rem", height: "2rem" }}
                            role="status"
                          ></div>
                        </div>
                    </div>
               </div>
               )
           : subscribtionSuccess === false 
              ? (<div className='row mt-5'> 
                      <div className='col d-flex justify-content-center'>
                          <h6>failed to subscribe this E-mail</h6>
                      </div>
                 </div>) 
              : subscribtionSuccess === true 
                ? (<div className='row mt-5'> 
                      <div className='col d-flex justify-content-center'>
                          <h6>subscribed successfully</h6>
                      </div>
                   </div>) 
                : null
         }
        </div>
      </div>
      {/* end of sign up */}

      <Footer />
    </div>
  );
};

const mapStateToProps = ({subSuccess})=>{
    return{
      subscribtionSuccess : subSuccess.subSuccess 
    }
}
const mapDispatchToProps = (dispatch)=>{
  return{
    subscribeUser : (email) => dispatch(subscribe(email)),
    setSubscribingState : (val) =>  dispatch(setSubscribeState(val))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);
