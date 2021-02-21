import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { signUpSuccess } from "../store/actions/actions";
import Footer from "../components/container/footer";

import LoadingOverlay from 'react-loading-overlay'; 
import BeatLoader from 'react-spinners/BeatLoader';
import { withRouter } from "react-router";
import { Link } from "react-router-dom";


const Signup = ({signUpResponse,addUser,history}) => {
  const [username, setUsername] = useState("");
  const [usernameValid, setUsernameValid] = useState(true);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");

  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState('');

  const [passwordMatch, setPasswordMatch] = useState('');
  const [passwordMatchText, setPasswordMatchText] = useState("");

  const [formValid, setFormValid] = useState(true);

  const [loading, setLoading] = useState(false);

  const handlePassword = (e) => {
    setPasswordMatchText(e.target.value);
    if (e.target.value === password) {
      setPasswordMatch(true);
    }
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);

    if (e.target.value.length < 5) {
      setUsernameValid(false);
      setUsernameErrorMessage("Username too short");
    } else {
      setUsernameValid(true);
    }

    let users = JSON.parse(window.localStorage.getItem("users"));
    var BreakException = {};
    if (users) {
      try {
        users.forEach((user) => {
          if (user.username === e.target.value) {
            setUsernameValid(false);
            setUsernameErrorMessage("username already exists!");
            throw BreakException;
          }
        });
      } catch (e) {
        if (e !== BreakException) throw e;
      }
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);

    let users = JSON.parse(window.localStorage.getItem("users"));
    var BreakException = {};

    if (users) {
      try {
        users.forEach((user) => {
          if (user.email === email) {
            setEmailValid(false);
            setEmailErrorMessage("username already exists!");
            throw BreakException;
          }
        });
      } catch (e) {
        if (e !== BreakException) throw e;
      }
    }

    function validateEmail(email) {
      //eslint-disable-next-line
      const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      return re.test(email);
    }

    if (!validateEmail(e.target.value)) {
      setEmailValid(false);
      setEmailErrorMessage("Email is not correct");
    } else {
      setEmailValid(true);
    }
  };

  const handleSetPassword = (e)=>{
    setPassword(e.target.value);
    if(!passwordValid){
      function validatePassword(password) {
        //eslint-disable-next-line
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
        return re.test(password);
      }
  
      if (validatePassword(e.target.value)) {
        setPasswordValid(true);
      } else {
        setPasswordMatch('')
      }
    }
  }
  
  const handlePassword1 = (e) => {

    setPassword(e.target.value);

    function validatePassword(password) {
      //eslint-disable-next-line
      const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
      return re.test(password);
    }

    if (validatePassword(e.target.value)) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
      setPasswordMatch('');
    }
  };


  useEffect(()=>{
      if (signUpResponse=== true || signUpResponse === false){ // response came, stop loading
        setLoading(false);
      }

      
  },[signUpResponse])


  const signupSubmit = (e) => {
    e.preventDefault();
    let user = {};
    if (passwordMatch && usernameValid && emailValid && passwordValid) {
      //push to object
      user.username = username;
      user.email = email.toLocaleLowerCase();
      user.password = password;
      // empty fields
      setUsername("");
      setEmail("");
      setPassword("");
      setPasswordMatch("");
      setPasswordMatchText("");

      if(signUpResponse === null){ // start loading until a response comes back
        setLoading(true);
      }

      addUser({user, history});
    } else {
      setFormValid(false);
    }
  };

  return (
    <div className="signup container-fluid pl-0 pr-0 ">
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center text-center">
          <div className=" signup-heading ">
            <h2 className="headings">Register</h2>
          </div>
        </div>

        <div className=" row d-flex justify-content-center ">
          <div className="col-10 col-md-8 col-lg-6 signup-container ">  
          <div className='row  have-account d-flex justify-content-center mb-1'>

              <p className='appText' >already have an account? &nbsp;
                <Link className='appText' to={{pathname:'/login'}}>
                  Login
                </Link>
                 </p>

          </div>
          
          
          <div className="separator appText" style={{marginBottom:'10px'}}>
           
          </div>
             
          <div className='row d-flex justify-content-center mb-1'>
              <div className="google-btn " onClick={()=>{window.location.href='/auth/google'}}>
                <div className="google-icon-wrapper">
                  <img className="google-icon" alt=''
                      src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
                </div>
                <p className="btn-text">
                  <b>Login with Google</b>
                </p>
              </div>
          </div>
         

          <div className="separator appText">
             Sign up
          </div>
             
            <form onSubmit={signupSubmit} className="signup-form">
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control username"
                  id="username"
                  onChange={handleUsername}
                  value={username}
                  autoComplete='true'
                />
                {!usernameValid ? (
                  <div>
                    <FontAwesomeIcon
                      className="username-wrong mr-2"
                      icon="times-circle"
                      color="red"
                    ></FontAwesomeIcon>
                    <label
                      className="form-check-label"
                      style={{ fontSize: "12px", color: "red" }}
                    >
                      {usernameErrorMessage}
                    </label>
                  </div>
                ) : username.length > 5 ? (
                  <FontAwesomeIcon
                    className="username-correct mr-2"
                    icon="check-circle"
                    color="green"
                  ></FontAwesomeIcon>
                ) : null}
              </div>

              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="text"
                  className="form-control"
                  id="email-input"
                  value={email}
                  onChange={handleEmail}
                  autoComplete='true'
                />
                {
                
                  emailValid === true ? (
                    <FontAwesomeIcon
                      className="username-correct mr-2"
                      icon="check-circle"
                      color="green"
                    ></FontAwesomeIcon>
                  ) : emailValid === false 
                      ?  (
                        <div>
                          <FontAwesomeIcon
                            className="email-wrong mr-2"
                            icon="times-circle"
                            color="red"
                          ></FontAwesomeIcon>
                          <label
                            className="form-check-label"
                            style={{ fontSize: "12px", color: "red" }}
                          >
                            {emailErrorMessage}
                          </label>
                        </div>
                      )
                      :null
            
                }
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password-input"
                  value={password}
                  onChange={handleSetPassword}
                  onBlur={handlePassword1}
                  autoComplete='true'
                />
                  { 
                  passwordValid === '' || passwordValid === false 
                   ?  (  <p style={{fontSize:'10px', color:'#a3f1f1'}}
                   >must be more than 8 characters and contain at least one (Capital letter, Number, Special letter '? = . @'  
                   </p>)

                   :null
                   
                  }
                {
              
                  passwordValid === true 
                  ? (
                    <FontAwesomeIcon
                      className="username-correct mr-2"
                      icon="check-circle"
                      color="green"
                    ></FontAwesomeIcon>
                  ) 
                  : 
                    passwordValid ===false ? 
                      (
                        <FontAwesomeIcon
                          className="password-wrong mr-2"
                          icon="times-circle"
                          color="red"
                        ></FontAwesomeIcon>
                      )
                      :null
                  
                
                }
              </div>

              <div className="mb-3">
                <label className="form-label">Re-enter Password</label>
                <input
                  type="password"
                  className="form-control password-matching"
                  value={passwordMatchText}
                  id="password-input2"
                  onChange={handlePassword}
                  autoComplete='true'
                />
              </div>
              {
                passwordValid === true 
                ?  passwordMatch ? (
                  <div className="mb-4">
                    <FontAwesomeIcon
                      className="password-match mr-2"
                      id="password-match"
                      icon="check-circle"
                      color="green"
                    ></FontAwesomeIcon>
                    <label className="form-check-label">Password match</label>
                  </div>
                ) : null
                :null
              }
              <button type="submit" className="mamovie-button btn">
                Sign up
              </button>
            </form>

            {!formValid ? (
              <p style={{ margin: "5px" }}>Invalid entry</p>
            ) : null}
          </div>
        </div>

        <div className='row signup-response d-flex justify-content-center align-items-center'>
              <div className='col-8 text-center success-or-failure '>
                    {
                      
                         signUpResponse === true 
                        ?  <h4 className='signup-success headings'> Sign up success </h4>
                        : 
                          signUpResponse === false ?
                            ( <h4 className='signup-failure headings'> Sign up failed </h4>)
                            :null
                    }
              </div>
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
                :null
             }
        </div>

      </div>

      <Footer />
    </div>
  );
};

const mapStateToProps = ({auth, signupState}) => {
  return {
    user: auth.user,
    signUpResponse : signupState.signup
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (payload) => dispatch(signUpSuccess(payload))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)( withRouter(Signup));
