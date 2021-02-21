import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { emailLogin,setLoginState } from "../store/actions/actions";
import Footer from "../components/container/footer";

import {withRouter} from 'react-router';
import LoadingOverlay from 'react-loading-overlay';
import BeatLoader from 'react-spinners/BeatLoader';

import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet';

const Login = ({loginSuccess, login, setLoginState, history}) => {

    
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  
  useEffect(()=>{
    if(loginSuccess === true || loginSuccess === false){
     
      setLoading(false);
    }
  },[loginSuccess])

  
  const loginSubmit = (e) => {
    e.preventDefault();
    setLoginState(null);
    setLoading(true);
    login({ email: email.toLocaleLowerCase(), password: password, history: history });

  };


  return (
    <div className="login container-fluid pr-0 pl-0 h-100 ">
       <Helmet>
              <title> Login </title>
              <meta name='description' content='Login to mamovies app to discover the latest movies,
               long standing hits, find a personal favortie movie and subscribe to get the latest movies every week' />  
        </Helmet>
      <div className="container" style={{ marginBottom: "250px" }}>
        <div className="row d-flex justify-content-center align-items-center text-center">
          <div className=" login-heading ">
            <h2 className="headings">Login</h2>
          </div>
        </div>

        <div className="row login-data d-flex justify-content-center align-items-center">
          <div className="form-container">

            <form onSubmit={loginSubmit}>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  autoComplete='true'
                />
              </div>

              <div className="mb-1">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  autoComplete='true'
                />
              </div>
              <div className='row password-wrapper'>
                  <div className='col-12 password-col d-flex justify-content-end'>
                      <Link className='appText' to={{pathname:'/password/recover'}}>
                        forgot password?  
                      </Link>
                  </div>
              </div>

              <button type="submit" className="btn mamovie-button">
                Login
              </button>
             
             
            </form>
          </div>
        </div>

        <div className="row response-state  d-flex justify-content-center align-items-center text-center">

          { 
             loading  
                     ?( <div className="col overlay" key='2'>
                          <LoadingOverlay
                            className="loading-overlay"
                            active={loading}
                            spinner={<BeatLoader size={30} color={"#00dbdb"} />}
                          ></LoadingOverlay>
                        </div>
                      )
                      : null
          }

        
            {
               loginSuccess !== null?
               (
                  <div className='col text-center login-state-message-wrapper'>

                   {
                      loginSuccess === true 
                      ? <h4 className='login-success headings'> Login success </h4>
                      :null
                   }
                    
                  {
                        loginSuccess === false 
                        ?
                        ( <h4 className='login-failuer headings'> Login failed </h4>)
                        :null
                  }

                  </div>
                )
              :null

            }
                   

          
        </div>
   
   
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = ({loginState}) => {
  return {
    loginSuccess : loginState.login
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (payload) => dispatch(emailLogin(payload)),
    setLoginState : (payload) => dispatch(setLoginState(payload))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
