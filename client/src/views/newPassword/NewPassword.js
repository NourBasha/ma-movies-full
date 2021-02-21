
import {reduxForm, Field} from 'redux-form';

import _ from 'lodash';

import PasswordField from './passwordField';
import { useDispatch } from 'react-redux';

import {setNewPassword, setPasswordUpdated} from '../../store/actions/actions';

import {connect} from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {Helmet} from 'react-helmet';

const FIELDS = [
    {
        name : 'password',
        label : 'Enter new password'
    },
    {
        name : 'match_password',
        label : 'Re-enter new password'
    }
]
const RE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;


const NewPassword = (props) =>{

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(()=>{
        if(props.passwordUpdated === true){
           setTimeout(() => {
            history.push('/login');
           }, 2500);
        }
    },[props.passwordUpdated, history ])

    const handleSave = ( values )=> {
        dispatch(setPasswordUpdated(null)); // start loading
        dispatch(setNewPassword({password: values.password, userRecordID: props.match.params.userRecordID }));
    }
  
    const RenderFields = ()=>{

      return(
        _.map(FIELDS, ({name,label})=>{
          return  <div key={name} className='mb-3'>
                <Field component={PasswordField} type='password' name={name} label={label}/>
            </div>
        })
      )

    }

    return(
        <div className='new-password d-flex align-items-center'>
           
           <Helmet>
              <title>New Password</title>
              <meta name='description' content='set new password for your account on mamvoies app' />  
             </Helmet>

               <div className='container '>

                   <div className='row d-flex justify-content-center form-row'>

                        <div className='col form-col d-flex justify-content-center align-items-center'>

                            <form onSubmit= { props.handleSubmit( values => handleSave(values) ) }>
                                   {
                                       RenderFields()
                                   }
                                    {/* <div className='mb-3 d-flex flex-column'>
                                        <label>  Enter new password </label>
                                        <Field component='input' type='password' name='password' />
                                    </div>
                                    <div className='mb-3 d-flex flex-column'>
                                        <label>Re-enter new password</label>
                                        <Field component='input' type='password' name='match_password'  />
                                    </div> */}
                                    <button type='submit' className='btn mamovie-button'>
                                                Save 
                                    </button>
                            </form>



                        </div>

                   </div>

                 { 
                    props.passwordUpdated === true 
                    ? 
                        (<div className='row d-flex justify-content-center mt-2'>

                            <div className='col-8 text-center d-flex flex-column align-items-center headings ' 
                            >
                                <FontAwesomeIcon icon={['far', 'check-circle']} size='2x' color='#00dbdb' title='saved'></FontAwesomeIcon>
                                    <p style={{fontSize:'14px'}}>
                                        Password has been updated successfully, redirecting to login ...
                                    </p>

                                   
                            </div>
                            
                        </div>
                        )
                   :   
                        props.passwordUpdated === false 
                        ?  (
                            <div className='row d-flex justify-content-center mt-2'>

                                    <div className='col-8 text-center headings'>
                                                <p style={{fontSize:'14px'}}>
                                                    Failed to update password, try again later.
                                                </p>
                                    </div>
                        
                             </div>
                             )
                        : props.passwordUpdated === null 
                            ?
                                (
                                <div className='row d-flex justify-content-center'>
                                        <div
                                        className="spinner-border text-info m-5 "
                                        style={{ width: "3rem", height: "3rem"  }}
                                        role="status"
                                        ></div>
                                 </div>
                                )
                            : null 

                    
                   
                }

               </div>
        </div>
    )
}

const validate = values =>{
    const errors = {}

    if(values.match_password !== values.password){
        errors.match_password = 'Passwords don\'t match';
    }
    if(!RE.test(values.password)){
        errors.password = 'This password is not valid';
    }

    return errors;
}

const mapStateToProps = ({passwordRecover})=>{
    return{
        passwordUpdated : passwordRecover.passwordUpdated
    }
}

export default connect(mapStateToProps) (reduxForm(
    {
        form: 'newPassword',
        validate
    }
) (NewPassword)); 