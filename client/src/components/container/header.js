import { NavLink} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import * as ACTIONS from '../../store/actions/actions';

const Header = ({user,  logout, history}) => {


  const handleLogout = () => {

   
    console.log('header, history: ',history);
     logout(history); // action creator

   
  }
  
 
  return (
    <div className="header ">

      <Navbar>
        
        <Navbar.Brand className="navbar-brand  ma" >
          <NavLink to='/' >
            Ma
            <span>Movies</span>
            </NavLink>
        </Navbar.Brand>
    
          
          <Nav className=" header-links ml-auto" >       
         
                {
                    user 
                    ?(
                        [
                            <NavLink to="/profile" exact
                                key='profile'
                                className="nav-link profile-item headerAppText" >
                                    {user.displayName} 
                                    {/* profile */}
                            </NavLink>,
                            <NavLink to="/browse" exact
                                key='watchlist'
                                className="nav-link watchlist-item headerAppText" >
                                    Watchlist
                            </NavLink>,
                            <a 
                            key='logout'
                            className="nav-link logout-item headerAppText " 
                            style={{cursor:'pointer'}}
                            onClick={handleLogout}
                            >
                              Logout
                           </a>
                        ]
                    ) 
                    :(
                      [  <NavLink to="/login" exact
                            key='login'
                            className="nav-link login-item headerAppText " >
                                Login
                        </NavLink>,
                        <NavLink to="/signup" exact
                            key='signup'
                            className="nav-link signup-item headerAppText" >
                                Sign-up
                        </NavLink>]
                    )
                }




          </Nav>

     
  
    
      </Navbar>
      
    {/* <button onClick={()=> {console.log(user)}}> user  </button> */}
       
    </div>

// theme , apply this to browse

// <Toggle
// theme={context.appTheme}
// toggleTheme={context.toggleAppTheme}
// className="theme-item"
// collapseLinks=  {() => setLinksExpanded(false)} 
// />

  );

}

function mapStateToProps ({ auth})  {
    return{
      user: auth.user
    }
}

function mapDispatchToProps  (dispatch){
      return {
     
        logout : (payload)=> dispatch(ACTIONS.logOut(payload))
      }
}
export default connect(mapStateToProps,mapDispatchToProps) (withRouter(Header));
