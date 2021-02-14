 import Routes from "./router/routes";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faStar,
   faUserCog , 
   faBars,
   faCheckCircle,
    faTimesCircle,
    faBookmark
  } from "@fortawesome/free-solid-svg-icons";
  import {faBookmark as faBookmarkRegular} from '@fortawesome/free-regular-svg-icons';

import {ThemeProvider} from "styled-components";
import {GlobalStyles} from './utils/theme/globalStyles';
import {lightTheme,darkTheme} from './utils/theme/theme';

import Context from './utils/context';
import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";

import {getCurrentUser} from './store/actions/actions';


library.add(fab, faStar,faUserCog,faBars, faCheckCircle, faTimesCircle, faBookmark,faBookmarkRegular);

const App = () => {

  const context = useContext(Context);
  const dispatch = useDispatch();
  
  console.log('insdie App and dispatching action!');
 
  useEffect(()=>{

    dispatch(getCurrentUser());

    /// set default login credentials for app viewers

    let users = JSON.parse(window.localStorage.getItem('users'))
      
    if(users === null || users === undefined){
            window.localStorage.setItem('users',
            JSON.stringify([{username:'user',
            email:'user@email.com',
            password:'Abcd@1234'}]));        
    }

  },[dispatch])
  return (
      <ThemeProvider theme = { context.appTheme==='light' ? lightTheme :darkTheme}>
        <> 
               <GlobalStyles/>
          
                  <Routes />
            
        </>
      </ThemeProvider>

  );
};

export default App;
