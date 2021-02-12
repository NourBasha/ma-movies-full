import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { emailLogin,setLoginState } from "../store/actions/actions";
import Footer from "../components/container/footer";

import {withRouter} from 'react-router';
import LoadingOverlay from 'react-loading-overlay';
import BeatLoader from 'react-spinners/BeatLoader';

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
      <div className="container" style={{ marginBottom: "250px" }}>
        <div className="row d-flex justify-content-center align-items-center text-center">
          <div className=" login-heading ">
            <h2 className="headings">Login</h2>
          </div>
        </div>

        <div className="row login-data d-flex justify-content-center align-items-center">
          <div className="form-container">

          <div className='row d-flex justify-content-center mb-1'>
              <div className="google-btn " onClick={()=>{window.location.href='/auth/google'}}>
                <div className="google-icon-wrapper">
                  <img className="google-icon" alt=''
                      src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
                </div>
                <p className="btn-text">
                  <b>Log-in with Google</b>
                </p>
              </div>
          </div>

          <div class="separator appText">
            or
          </div>

            <form onSubmit={loginSubmit}>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
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
