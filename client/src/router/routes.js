import {Switch,Router, Route, Redirect} from 'react-router';
import Header from '../components/container/header';
import Home from '../views/home';
import history from '../utils/history';
import Browse from '../views/browse';
import MovieDetails from '../views/movie_details';
import NotAuthorised from '../views/notAuthorised';
import {connect} from 'react-redux';
import Signup from '../views/signup';
import Profile from '../views/profile';
import Login from '../views/login';
import PageNotFound from '../views/page-not-found';
import Watchlist from '../views/watchlist';
import PasswordRecovery from '../views/PasswordRecovery';


const Routes = ({user}) =>{


    
        return(
            <div>
               <Router history={history}>
                 <div>
                 <Header  />
                    <Switch>
                        <Route exact path='/' > 
                        {
                           user
                           ? <Redirect to='/browse' />
                           : <Home />
                        }
                        </Route>
                        <Route exact  path='/browse' component={Browse}/>
                        <Route exact path='/movie/:id' render={(data)=> <MovieDetails  data={data} /> } />   
                        <Route exact path='/watchlist' component={Watchlist} />
                        <Route exact path='/notAuthorised' component={NotAuthorised} />
                        <Route exact path='/signup' component={Signup} />
                        <Route exact path='/password-recovery' component={PasswordRecovery} />

                        <Route exact path='/profile' component={Profile} />
                        <Route exact path='/login' component={Login} />
                        <Route path='*' component={PageNotFound} />

                    </Switch>
                 </div>
               </Router>    
            </div>
        )
   
}
 
function mapStateToProps  ({auth})  {
return{
   user : auth.user
}
}
export default connect(mapStateToProps) (Routes);