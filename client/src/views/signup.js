import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { signUpSuccess } from "../store/actions/actions";
import Footer from "../components/container/footer";

import LoadingOverlay from 'react-loading-overlay'; 
import BeatLoader from 'react-spinners/BeatLoader';
import { withRouter } from "react-router";


const Signup = ({signUpResponse,addUser,history}) => {
  const [username, setUsername] = useState("");
  const [usernameValid, setUsernameValid] = useState(true);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");

  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);

  const [passwordMatch, setPasswordMatch] = useState(false);
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

  const hanflePassword = (e) => {
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
            <h2 className="headings">Sign Up</h2>
          </div>
        </div>

        <div className=" row d-flex justify-content-center ">
          <div className=" signup-container">
            <form onSubmit={signupSubmit} className="signup-form">
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control username"
                  id="username"
                  onChange={handleUsername}
                  value={username}
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
                />
                {email.length > 4 ? (
                  emailValid ? (
                    <FontAwesomeIcon
                      className="username-correct mr-2"
                      icon="check-circle"
                      color="green"
                    ></FontAwesomeIcon>
                  ) : (
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
                ) : null}
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password-input"
                  value={password}
                  onChange={hanflePassword}
                />

                {password.length > 5 ? (
                  passwordValid ? (
                    <FontAwesomeIcon
                      className="username-correct mr-2"
                      icon="check-circle"
                      color="green"
                    ></FontAwesomeIcon>
                  ) : (
                    <FontAwesomeIcon
                      className="password-wrong mr-2"
                      icon="times-circle"
                      color="red"
                    ></FontAwesomeIcon>
                  )
                ) : null}
              </div>

              <div className="mb-3">
                <label className="form-label">Re-enter Password</label>
                <input
                  type="password"
                  className="form-control password-matching"
                  value={passwordMatchText}
                  id="password-input2"
                  onChange={handlePassword}
                />
              </div>
              {passwordMatch ? (
                <div className="mb-4">
                  <FontAwesomeIcon
                    className="password-match mr-2"
                    id="password-match"
                    icon="check-circle"
                    color="green"
                  ></FontAwesomeIcon>
                  <label className="form-check-label">Password match</label>
                </div>
              ) : null}
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

              <div className='col-4  success-or-failure '>
                    {
                        signUpResponse === true 
                        ?  <h4 className='signup-success headings'> Sign up success </h4>
                        : 
                          signUpResponse === false ?
                            ( <h4 className='signup-failuer headings'> Sign up failed </h4>)
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
