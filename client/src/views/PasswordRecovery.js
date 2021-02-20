import { useEffect, useState } from "react";
import {connect} from 'react-redux';
import {setPasswordState, sendRecoveryEmail} from '../store/actions/actions';
import {validateEmail} from '../utils/validateEmail';


const PasswordRecovery = ({passwordRecovered , setPasswordRecoveryState, sendEmail})=>{

    const [email, setEmail] = useState('');
    const [emailVaild, setEmailValid] = useState('');
  //  const [passwordRecovered, setPasswordRecovered] = useState(''); // '' none , null lodaing , false , true

    useEffect(()=>{
        if(passwordRecovered === true || passwordRecovered === false){
            setEmail('');
        }
    },[passwordRecovered]);

    const handleSubmit = (e)=>{

        e.preventDefault();

        console.log('client, email is : ', email);
        if(validateEmail(email)){
            console.log('client, about to fire action');
            setPasswordRecoveryState(null);
            sendEmail({email: email.toLowerCase().trim()});
            setEmailValid(true);
        }else{
            setEmailValid(false)
        }

      
    }

    return (
        <div className='recover'>
            
        <div className='container'>
            
            <div className='row form-wrapper d-flex align-items-center justify-content-center '>

                <form onSubmit={handleSubmit}>
                    <label className='appText'> Enter your E-mail address</label>
                    <input type='text'
                     className='form-control mb-1'
                     onChange={(e)=> setEmail(e.target.value)}
                     value={email}      
                     />
                     {
                          emailVaild === false 
                         ?(
                             <p className=' text-danger' style={{fontSize:'12px'}}>
                                 This E-mail is not valid
                             </p>
                         )
                         :null
                     }
                     <button type='submit' className='btn mamovie-button mt-3'>
                        Recover
                     </button>

                </form>
            </div>
            <div className='row form-wrapper d-flex align-items-center justify-content-center '>
            {
                    
                    passwordRecovered === true 
                   ? (<div className='row d-flex justify-content-center align-items-center headings mt-3'>
                           <div className='col-12'>
                               <p className='m-0'>A recovery link has been sent to your E-mail address.</p>
                           </div>
                       </div>)
                   : passwordRecovered === false 
                           ? (<div className='row d-flex justify-content-center align-items-center headings mt-3'>
                           <div className='col-12'>
                               <p className='m-0'>There was a problem sending a recovery link to your E-mail address</p>
                           </div>
                       </div>)
                           :  passwordRecovered === null
                              ?  ( <div className='row d-flex justify-content-center align-items-center '>
                                     
                                           <div
                                           className="spinner-border text-info m-5 "
                                           style={{ width: "3rem", height: "3rem"  }}
                                           role="status"
                                           ></div>
                                    
                               </div>)
                               : null
                              
               }
            </div>
   
   
</div>

        </div>
    );
        
    
}



const mapStateToProps = ({passwordRecover})=>{
    return{
        passwordRecovered : passwordRecover.pass
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        setPasswordRecoveryState : (val) => dispatch(setPasswordState(val)),
        sendEmail : (em) => dispatch(sendRecoveryEmail(em))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordRecovery) ;