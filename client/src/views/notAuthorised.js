
import { Helmet } from 'react-helmet';
import {Link} from 'react-router-dom';


const NotAuthorised = (props) => {
  return (
    <div className="not-auth container" >
            <Helmet>
              <title>Not Authorised</title>
              <meta name='description' content='You are not authorised to view this page of mamovies app, you need to login or sign up to view it' />
            </Helmet>
      <div className="row d-flex justify-content-center text-center">
        <div className="col  align-content-center">
          
           <div className='message-container'>
           <h4 className="not-auth-message">
              You Are Not Authorised To Continue To This Page, Please
              &nbsp; 
              <Link to={{pathname:'/login'}}>
                    Login 
              </Link>
             &nbsp;  Or  &nbsp; 
               <Link to={{pathname:'/signup'}}>
                  Sign Up 
              </Link>
              &nbsp; 
              To Continue
            </h4>
           </div>
          
        </div>
      </div>
    </div>
  );
};
export default NotAuthorised;
