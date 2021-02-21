import { Helmet } from "react-helmet";

const Unsubscribe = (props) =>{

    return(
        <div className='unsubscribe'>
             <Helmet>
              <title>Unsubscribe</title>
              <meta name='description' content='unsubscribe from mamovies app weekly list of movies to your e-mail' />
            </Helmet>
                <div className='container'>
                    <div className='row d-flex justify-content-center align-items-center' 
                            style={{marginTop:'25vh'}}>
                            <div className='col-10 text-center headings' 
                            style={{borderRadius:'10px'}} >
                                <p  className='appText' style={{margin:'0', padding:'20px'}}>
                                    You will no longer receive a weekly E-mail
                                </p>
                            </div>
                    </div>
                </div>
        </div>
    )
}

export default Unsubscribe;